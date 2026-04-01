"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function GameLoginPlaywright() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState<{
    text: string;
    color: string;
  } | null>(null);

  const [secreto, setSecreto] = useState("");
  const [msgSecreto, setMsgSecreto] = useState<{
    text: string;
    color: string;
  } | null>(null);

  const iniciarSesion = () => {
    if (usuario === "hola123" && password === "1234") {
      setMensaje({ text: "BIEN!", color: "#22c55e" });
    } else if (usuario === "hola123" && password !== "1234") {
      setMensaje({ text: "MAL!", color: "#f97316" });
    } else if (usuario !== "hola123") {
      setMensaje({ text: "MAL!", color: "#ef4444" });
    }
  };

  const verificarSecreto = (val: string) => {
    setSecreto(val);
    if (val === "felixCapo") {
      setMsgSecreto({ text: "¡PERFECTO!", color: "#3b82f6" });
    } else {
      setMsgSecreto({ text: "Mmm... no.", color: "#9ca3af" });
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 pb-24 md:pb-0 bg-[#fcf9f8]">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          {/* Contenedor principal */}
          <div className="w-full max-w-7xl">
            {/* Título y descripción */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-black text-on-surface mb-4 tracking-tight">
                Playwright <span className="text-primary">Login</span> Game
              </h1>
              <p className="text-on-surface/60 text-lg md:text-xl max-w-2xl mx-auto">
                Hagan bien es facil
              </p>
            </div>

            {/* Grid de juegos */}
            <div className="grid grid-cols-1 gap-8 lg:gap-12 justify-items-center">
              {/* Game 1: Login básico */}
              <div className="w-full max-w-sm">
                <div className="bg-white rounded-xl shadow-lg border border-outline-variant/20 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      login
                    </span>
                    <h2 className="text-2xl font-bold text-on-surface">
                      Nivel 1
                    </h2>
                  </div>
                  <p className="text-on-surface/60 text-sm mb-6">
                    Ingresa las credenciales correctas para pasar el primer
                    nivel
                  </p>

                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      id="usuario"
                      placeholder="Usuario/Correo"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      className="w-full px-4 py-3 border border-outline-variant/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface transition-all duration-200 text-on-surface placeholder:text-on-surface/40"
                    />
                    <input
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-outline-variant/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface transition-all duration-200 text-on-surface placeholder:text-on-surface/40"
                    />
                  </div>

                  <button
                    id="login-btn"
                    onClick={iniciarSesion}
                    className="w-full px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                    Entrar
                  </button>

                  <div
                    id="mensaje"
                    className="mt-6 min-h-6 text-center font-bold text-lg transition-all duration-300"
                    style={{
                      color: mensaje?.color,
                    }}
                  >
                    {mensaje?.text}
                  </div>

                  <div className="mt-6 pt-6 border-t border-outline-variant/20">
                    <p className="text-xs font-bold text-on-surface/40 uppercase tracking-widest mb-2">
                      Pista
                    </p>
                    <div className="space-y-1 text-sm text-on-surface/50">
                      <p>
                        <strong>Usuario:</strong> hola123
                      </p>
                      <p>
                        <strong>Contraseña:</strong> 1234
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game 2: Nivel secreto */}
              <div className="w-full max-w-sm hidden">
                <div className="bg-white rounded-xl shadow-lg border border-outline-variant/20 p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-3xl">
                      shield
                    </span>
                    <h2 className="text-2xl font-bold text-on-surface">
                      Nivel Secreto
                    </h2>
                  </div>
                  <p className="text-on-surface/60 text-sm mb-6">
                    Encuentra y escribe la contraseña correcta para ganar
                  </p>

                  <input
                    type="password"
                    id="hiddenInput"
                    placeholder="Escribe aquí el secreto..."
                    value={secreto}
                    onChange={(e) => verificarSecreto(e.target.value)}
                    className="w-full px-4 py-3 border border-outline-variant/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-fixed-dim focus:border-transparent bg-surface transition-all duration-200 text-on-surface placeholder:text-on-surface/40 mb-6"
                  />

                  <div
                    id="perfecto"
                    className="min-h-8 text-center font-bold text-lg transition-all duration-300"
                    style={{
                      color: msgSecreto?.color,
                    }}
                  >
                    {msgSecreto?.text}
                  </div>

                  <div className="mt-6 pt-6 border-t border-outline-variant/20">
                    <p className="text-xs font-bold text-on-surface/40 uppercase tracking-widest mb-2">
                      Pista
                    </p>
                    <p className="text-sm text-on-surface/50">
                      Piensa en el nombre de una persona... 🤔
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
