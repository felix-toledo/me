---
title: "De cero a Playwright MCP: instalar, configurar y arrancar tests E2E"
date: "2026-03-26"
description: "Guia completa para instalar Antigravity, Node, pnpm y Playwright MCP, y arrancar tus primeros tests end-to-end sin pelearte con la terminal."
---

# De cero a Playwright MCP

Esta guia junta en un solo lugar lo que hace falta para empezar con Playwright MCP: instalar la IDE de Google Antigravity, dejar Node y pnpm listos, configurar el servidor MCP de Playwright y crear un proyecto base para pruebas end-to-end.

## 1. Antes de empezar

- **Node.js:** permite ejecutar JavaScript fuera del navegador y es la base para usar Playwright.
- **npm:** viene incluido con Node y sirve para instalar paquetes.
- **pnpm:** alternativa a npm, mas rapida y eficiente con el disco en muchos proyectos.
- **Playwright:** framework para automatizar navegadores y escribir tests E2E.
- **MCP:** puente para que un agente pueda usar herramientas locales de forma controlada.

Si queres seguir esta guia tal cual, conviene empezar desde una terminal limpia y con permisos normales de usuario. En Windows, si algo falla por permisos, mas abajo tenes la solucion tipica.

## 2. Instalar Antigravity

Antigravity es la IDE de Google para trabajar con agentes y MCP. Se descarga desde su sitio oficial:

[https://antigravity.google/](https://antigravity.google/)

No hace falta configurar nada en este paso: descargalo, instalalo y abri la aplicacion antes de seguir con el resto.

## 3. Instalar Node.js

La recomendacion es usar la version LTS. Eso te evita problemas innecesarios con compatibilidad y te deja un entorno mas estable para aprender.

### Instalar Node (incluye npm)

Windows (winget):

```bash
winget install OpenJS.NodeJS
```

Mac (Homebrew):

```bash
brew install node
```

Linux: usá el gestor de paquetes de tu distribucion o el instalador oficial de Node.

Verificacion:

```bash
node -v
npm -v
```

Si esos comandos devuelven versiones, Node quedo instalado correctamente.

### Si ya tenias Node instalado

Si `winget` te responde que ya esta instalado, actualizalo:

```powershell
winget upgrade OpenJS.NodeJS
```

En Mac:

```bash
brew upgrade node
```

## 4. Instalar pnpm

Con Node ya listo, instalas pnpm de forma global:

```bash
npm install -g pnpm
```

Verificacion:

```bash
pnpm -v
```

Si ese comando no se reconoce, probablemente falte reiniciar la terminal o agregar pnpm al PATH. Mas abajo dejo la solucion tipica.

## 5. Preparar Windows para scripts y comandos globales

En Windows es comun ver errores tipo "la ejecucion de scripts esta deshabilitada" cuando PowerShell bloquea el uso de herramientas instaladas globalmente.

Abrí PowerShell como administrador y ejecutá:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Confirmá con `Y` y reiniciá la terminal.

## 6. Crear un proyecto Playwright

Si ya tenes Node y pnpm, el siguiente paso es crear un proyecto real para pruebas E2E.

```bash
mkdir mi-proyecto-playwright
cd mi-proyecto-playwright
pnpm create playwright
```

Durante el asistente, las opciones recomendadas son:

- TypeScript: si, para tener autocompletado y tipos.
- Carpeta de tests: `tests`.
- GitHub Actions: opcional, activalo si queres CI desde el inicio.
- Browsers de Playwright: si, instalalos.

Si preferis el comando oficial equivalente, tambien podes usar:

```bash
npm init playwright@latest
```

## 7. Configurar Playwright MCP en Antigravity

Ahora viene la parte clave: registrar el servidor MCP de Playwright dentro de Antigravity.

1. Abrí el panel del agente.
2. Entrá a las opciones de la esquina y buscá la administracion de MCP.
3. Abrí la vista de configuracion cruda o raw config.
4. Pegá esta configuracion:

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

5. Guardá los cambios.
6. Volvé a la lista de servidores MCP y refrescá.
7. Verificá que `playwright` aparezca activo y con herramientas disponibles.

Si queres usar una ruta distinta de configuracion, lo importante es que el servidor quede registrado con `npx -y @playwright/mcp@latest`.

## 8. Crear el primer test E2E

Con el proyecto creado, escribi un test simple para validar que todo funcione de punta a punta.

```ts
import { test, expect } from "@playwright/test";

test("la pagina principal carga", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

Ejecutalo con:

```bash
pnpm exec playwright test
```

Si queres correr el test en modo interactivo:

```bash
pnpm exec playwright test --ui
```

## 9. Probar el MCP con un prompt real

Una vez que el servidor aparece activo, ya podes pedirle al agente que use el navegador.

Por ejemplo:

```text
Navegá a https://example.com, verificá que cargue el titulo principal y decime si la pagina responde como esperabamos.
```

Eso te sirve para confirmar dos cosas a la vez: que Playwright funciona como herramienta y que el agente puede usarlo desde MCP.

## 10. Problemas comunes

- **`pnpm` no se reconoce como comando.**
  Cerrá y volvé a abrir la terminal. Si sigue igual, revisá el PATH o ejecutá `npm install -g pnpm` de nuevo.
- **Playwright no descarga los navegadores.**
  Probá con `pnpm exec playwright install`.
- **PowerShell bloquea scripts.**
  Ejecutá `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` desde PowerShell como administrador.
- **Antigravity no muestra el servidor MCP.**
  Revisá que el JSON no tenga comas faltantes, que el comando sea `npx` y que el paquete sea `@playwright/mcp@latest`.
- **El test abre pero falla al buscar elementos.**
  Usá selectores mas estables, preferentemente roles accesibles, textos visibles o `data-testid`.

---

## Resumen rapido

1. Instalá Antigravity desde [antigravity.google](https://antigravity.google/).
2. Instalá Node.js y pnpm.
3. Si usas Windows, habilitá la ejecucion de scripts para tu usuario.
4. Creá un proyecto con Playwright.
5. Registrá el servidor MCP con `npx -y @playwright/mcp@latest`.
6. Corré un test simple y despues probalo desde el agente.

Con eso ya tenes la base para empezar a escribir y automatizar tests E2E sin perder tiempo en la configuracion inicial.
