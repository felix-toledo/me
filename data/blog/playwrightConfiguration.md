---
title: "Preparacion de clase: Playwright MCP"
date: "2026-03-26"
description: "Guia rapida para dejar Node, pnpm y el servidor MCP de Playwright listos antes de clase."
---

# Preparacion clase Playwright MCP

Buenas. Para no perder tiempo renegando con el instalaciones durante la clase, dejo esta guia corta para instalar todo desde terminal y llegar listos.

## 1. Conceptos basicos

- **Node:** permite ejecutar JavaScript fuera del navegador.
- **npm:** viene con Node y sirve para instalar herramientas.
- **pnpm:** hace lo mismo que npm, pero suele ser mas rapido y liviano en disco.

## 2. Instalacion por terminal

### Instalar Node (incluye npm)

Windows (winget):

```bash
winget install OpenJS.NodeJS
```

Mac (Homebrew):

```bash
brew install node
```

### Instalar pnpm

```bash
npm install -g pnpm
```

### Si ya tenias algo instalado

Si aparece un mensaje tipo "already installed", actualiza:

```powershell
winget upgrade OpenJS.NodeJS
```

```bash
brew upgrade node
npm install -g pnpm@latest npm@latest
```

## 3. Antigravity y MCP

- **MCP:** es el puente para que la IA use herramientas locales (por ejemplo, abrir un navegador) de forma controlada.
- **Editor Antigravity:** descargar desde [antigravity.google](https://antigravity.google).

## 4. Configurar MCP de Playwright en Antigravity

No inicialices proyectos ni crees carpetas. Solo deja esto configurado:

1. Abri el panel del agente (_Agent Manager_).
2. Hace clic en los tres puntos (`...`).
3. Elegi **Manage MCP Servers** y despues **View raw config**.

![Ubicacion de Manage MCP Servers en Antigravity](/images/blog/playwright/findMCPMenuInAG.png)
![Vista para abrir la configuracion en crudo](/images/blog/playwright/findViewRawConfig.png)

4. Borra lo que haya y pega este JSON:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

5. Guarda, volve a **Manage MCP Servers** y refresca.
6. Verifica que `playwright` quede activo.

![JSON configurado y herramientas detectadas](/images/blog/playwright/mcpJsonConfigAndToolsView.png)

## 5. Prueba rapida

Pega este prompt al agente para validar que el MCP esta funcionando:

```text
Navega a https://google.com y busca noticias de tecnologia de hoy.
```

## Preguntas frecuentes

- **Me da error de permisos al instalar pnpm.**
  Abrir la terminal como Administrador (Windows) o usar `sudo` en Mac/Linux.
- **Me trabo con un error.**
  Pedile ayuda a la IA, pero primero lee el error de consola y entende que esta diciendo.

---

**Mini resumen:** instalar Node, instalar `pnpm`, bajar Antigravity, configurar el JSON de MCP y validar con un prompt de prueba.
