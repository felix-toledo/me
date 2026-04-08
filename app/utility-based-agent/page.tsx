"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  BrainCircuit,
  Bus,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CloudRain,
  GraduationCap,
  Home,
  Sigma,
  Sun,
  ThermometerSun,
  Trophy,
  UserRound,
  Wallet,
} from "lucide-react";

type Clima = "Despejado" | "Lluvia torrencial" | "Calor extremo (+40C)";
type ActionKey = "A1" | "A2" | "A3" | "A4";

type AgentActionResult = {
  key: ActionKey;
  nombre: string;
  tiempoMin: number;
  costo: number;
  comodidad: number;
  utilidad: number;
  rapidoScore: number;
  baratoScore: number;
  comodidadScore: number;
  tardaScore: number;
  bloqueada?: string;
};

type BaseAction = {
  key: ActionKey;
  nombre: string;
  tiempoMin: number;
  costo: number;
  comodidad: number;
  bloqueada?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const formatMoney = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

const formatMinutes = (value: number) => `${Math.round(value)} min`;

function calcularUtilidades(input: {
  demoraPuente: number;
  clima: Clima;
  tarifaRemis: number;
  precioColectivo: number;
  costoAuto: number;
  saldoSube: number;
  saldoBilletera: number;
  importanciaClase: number;
  wTiempo: number;
  wDinero: number;
  wComodidad: number;
}): AgentActionResult[] {
  const {
    demoraPuente,
    clima,
    tarifaRemis,
    precioColectivo,
    costoAuto,
    saldoSube,
    saldoBilletera,
    importanciaClase,
    wTiempo,
    wDinero,
    wComodidad,
  } = input;

  const wMeta = clamp(importanciaClase, 1, 10);
  const scarcityBilletera = clamp((4500 - saldoBilletera) / 4500, 0, 1);
  const coverageSube = clamp(saldoSube / Math.max(precioColectivo, 1), 0, 2);
  const moneyFocus = clamp((wDinero - 4) / 6, 0, 1);
  const classLowBias = clamp((5 - importanciaClase) / 4, 0, 1);
  const classHighBias = clamp((importanciaClase - 6) / 4, 0, 1);
  const remisVsBusGap = clamp(
    (tarifaRemis - precioColectivo) / Math.max(tarifaRemis, 1),
    0,
    1,
  );

  const results: BaseAction[] = [
    {
      key: "A1",
      nombre: "Auto particular",
      tiempoMin: demoraPuente * 1.05 + 8,
      costo: costoAuto,
      comodidad: 90,
    },
    {
      key: "A2",
      nombre: "Colectivo Chaco-Corrientes (902/904)",
      tiempoMin: demoraPuente * 1.25 + 18,
      costo: precioColectivo,
      comodidad: 56,
    },
    {
      key: "A3",
      nombre: "Remis compartido / Uber / Cabify",
      tiempoMin: demoraPuente * 0.95 + 10,
      costo: tarifaRemis,
      comodidad: 76,
    },
    {
      key: "A4",
      nombre: "Abortar viaje (remoto)",
      tiempoMin: 5,
      costo: 0,
      comodidad: 72,
    },
  ];

  for (const action of results) {
    if (clima === "Lluvia torrencial") {
      if (action.key !== "A4") action.tiempoMin += 22;
      if (action.key === "A1") action.comodidad -= 8;
      if (action.key === "A2") action.comodidad -= 12;
      if (action.key === "A3") action.comodidad -= 6;
    }

    if (clima === "Calor extremo (+40C)") {
      if (action.key !== "A4") action.tiempoMin += 10;
      if (action.key === "A1") action.comodidad -= 4;
      if (action.key === "A2") action.comodidad -= 28;
      if (action.key === "A3") action.comodidad -= 5;
    }
  }

  const colectivo = results.find((r) => r.key === "A2");
  if (colectivo && saldoSube < precioColectivo) {
    colectivo.bloqueada = "Saldo SUBE insuficiente";
  }

  const auto = results.find((r) => r.key === "A1");
  if (auto && saldoBilletera < costoAuto) {
    auto.bloqueada = "No alcanza para combustible";
  }

  const remis = results.find((r) => r.key === "A3");
  if (remis && saldoBilletera < tarifaRemis) {
    remis.bloqueada = "Billetera insuficiente para remis";
  }

  const maxTiempo = 220;
  const maxCosto = 8000;

  const weighted: Array<{
    key: ActionKey;
    raw: number;
    rapidoScore: number;
    baratoScore: number;
    comodidadScore: number;
    tardaScore: number;
  }> = [];

  for (const action of results) {
    const comodidadScore = clamp(action.comodidad, 0, 100);
    const tiempoNorm = clamp((action.tiempoMin / maxTiempo) * 100, 0, 100);
    const rapidoScore = 100 - tiempoNorm;
    const tardaScore = 100 - rapidoScore;
    let baratoScore = 100 - clamp((action.costo / maxCosto) * 100, 0, 100);

    // Factor no lineal para que el colectivo gane cuando el dinero pesa y falta saldo.
    const multiplicadorColectivo =
      1 +
      scarcityBilletera *
        moneyFocus *
        (0.65 + remisVsBusGap * 1.2) *
        clamp(coverageSube, 0.2, 1.4);

    if (action.key === "A2") {
      baratoScore = clamp(baratoScore * multiplicadorColectivo, 0, 160);
    }
    if (action.key === "A3") {
      baratoScore = clamp(
        baratoScore *
          (1 - scarcityBilletera * moneyFocus * (0.35 + remisVsBusGap)),
        0,
        100,
      );
    }
    if (action.key === "A1") {
      baratoScore = clamp(
        baratoScore * (1 - scarcityBilletera * moneyFocus * 0.35),
        0,
        100,
      );
    }

    const metaScore =
      action.key === "A4"
        ? clamp(80 - importanciaClase * 8, 0, 100)
        : clamp(20 + importanciaClase * 8, 0, 100);

    let raw =
      rapidoScore * wTiempo +
      baratoScore * wDinero +
      comodidadScore * wComodidad +
      metaScore * wMeta;

    if (action.key === "A4") {
      raw += classLowBias * 140;
      raw -= classHighBias * 120;
    } else {
      raw += classHighBias * 80;
      raw -= classLowBias * 20;
    }

    if (action.bloqueada) {
      raw = Number.NEGATIVE_INFINITY;
    }

    weighted.push({
      key: action.key,
      raw,
      rapidoScore,
      baratoScore: clamp(baratoScore, 0, 100),
      comodidadScore,
      tardaScore,
    });
  }

  const validRaw = weighted.map((w) => w.raw).filter((v) => Number.isFinite(v));
  const minRaw = validRaw.length ? Math.min(...validRaw) : 0;
  const maxRaw = validRaw.length ? Math.max(...validRaw) : 1;

  return results.map((action) => {
    const info = weighted.find((w) => w.key === action.key);
    const raw = info?.raw ?? Number.NEGATIVE_INFINITY;

    let utilidad = 0;
    if (!action.bloqueada && Number.isFinite(raw)) {
      utilidad =
        maxRaw === minRaw
          ? 50
          : clamp(((raw - minRaw) / (maxRaw - minRaw)) * 100, 0, 100);
    }

    return {
      ...action,
      comodidad: clamp(action.comodidad, 0, 100),
      utilidad,
      rapidoScore: info?.rapidoScore ?? 0,
      baratoScore: info?.baratoScore ?? 0,
      comodidadScore: info?.comodidadScore ?? 0,
      tardaScore: info?.tardaScore ?? 100,
    };
  });
}

function AgenteUtilidadPuente() {
  const [demoraPuente, setDemoraPuente] = useState(65);
  const [clima, setClima] = useState<Clima>("Despejado");
  const [tarifaRemis, setTarifaRemis] = useState(4200);
  const [precioColectivo, setPrecioColectivo] = useState(1100);
  const [costoAuto, setCostoAuto] = useState(2600);
  const [saldoSube, setSaldoSube] = useState(1500);
  const [saldoBilletera, setSaldoBilletera] = useState(2500);
  const [importanciaClase, setImportanciaClase] = useState(8);

  const [wTiempo, setWTiempo] = useState(6);
  const [wDinero, setWDinero] = useState(8);
  const [wComodidad, setWComodidad] = useState(5);

  const resultados = useMemo(
    () =>
      calcularUtilidades({
        demoraPuente,
        clima,
        tarifaRemis,
        precioColectivo,
        costoAuto,
        saldoSube,
        saldoBilletera,
        importanciaClase,
        wTiempo,
        wDinero,
        wComodidad,
      }),
    [
      demoraPuente,
      clima,
      tarifaRemis,
      precioColectivo,
      costoAuto,
      saldoSube,
      saldoBilletera,
      importanciaClase,
      wTiempo,
      wDinero,
      wComodidad,
    ],
  );

  const mejor = resultados.reduce((acc, cur) =>
    cur.utilidad > acc.utilidad ? cur : acc,
  );

  const climaIcon =
    clima === "Despejado" ? (
      <Sun className="h-4 w-4" />
    ) : clima === "Lluvia torrencial" ? (
      <CloudRain className="h-4 w-4" />
    ) : (
      <ThermometerSun className="h-4 w-4" />
    );

  const iconoAccion = (key: ActionKey) => {
    if (key === "A1") return <Car className="h-4 w-4" />;
    if (key === "A2") return <Bus className="h-4 w-4" />;
    if (key === "A3") return <UserRound className="h-4 w-4" />;
    return <Home className="h-4 w-4" />;
  };

  const sliderClass =
    "h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary";

  return (
    <main className="min-h-screen bg-background px-3 py-4 text-on-surface sm:px-4">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
        <header className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-4 shadow-lg shadow-primary/10 sm:px-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
            Agente Basado en Utilidad
          </p>
          <h1 className="mt-1 text-xl font-black tracking-[-0.02em] text-on-surface sm:text-2xl xl:text-3xl">
            Elegir transporte para cruzar el Puente General Belgrano
          </h1>
          <p className="mt-2 text-xs text-on-surface-variant sm:text-sm">
            La utilidad permite decisiones racionales incluso cuando hay
            objetivos en conflicto (velocidad vs costo vs comodidad).
          </p>
        </header>

        <section className="grid min-h-[calc(100vh-10rem)] gap-4 xl:grid-cols-[340px_340px_minmax(0,1fr)]">
          <article className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-md xl:overflow-auto">
            <h2 className="border-l-4 border-secondary pl-3 text-sm font-black uppercase tracking-wider text-on-surface">
              Sensores
            </h2>
            <p className="mt-3 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-xs text-on-surface-variant">
              Percepciones del entorno. El agente es parcialmente observable:
              conoce el estado actual, pero no el futuro exacto del trafico.
            </p>

            <div className="mt-4 space-y-4">
              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    Demora en el puente
                  </span>
                  <span>{Math.round(demoraPuente)} min</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={180}
                  value={demoraPuente}
                  onChange={(e) => setDemoraPuente(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  {climaIcon}
                  Clima local
                </span>
                <select
                  value={clima}
                  onChange={(e) => setClima(e.target.value as Clima)}
                  className="w-full rounded-lg border border-outline bg-surface-container-high px-3 py-2 text-sm shadow-sm outline-none ring-primary transition focus:ring-2"
                >
                  <option>Despejado</option>
                  <option>Lluvia torrencial</option>
                  <option>Calor extremo (+40C)</option>
                </select>
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <CircleDollarSign className="h-3.5 w-3.5" />
                    Tarifa de remis
                  </span>
                  <span>{formatMoney(tarifaRemis)}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={8000}
                  step={100}
                  value={tarifaRemis}
                  onChange={(e) => setTarifaRemis(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Bus className="h-3.5 w-3.5" />
                    Precio del colectivo
                  </span>
                  <span>{formatMoney(precioColectivo)}</span>
                </div>
                <input
                  type="range"
                  min={900}
                  max={1500}
                  step={50}
                  value={precioColectivo}
                  onChange={(e) => setPrecioColectivo(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Car className="h-3.5 w-3.5" />
                    Costo combustible auto
                  </span>
                  <span>{formatMoney(costoAuto)}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={5000}
                  step={100}
                  value={costoAuto}
                  onChange={(e) => setCostoAuto(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Wallet className="h-3.5 w-3.5" />
                    Saldo SUBE
                  </span>
                  <span>{formatMoney(saldoSube)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={saldoSube}
                  onChange={(e) => setSaldoSube(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <CircleDollarSign className="h-3.5 w-3.5" />
                    Saldo billetera
                  </span>
                  <span>{formatMoney(saldoBilletera)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={saldoBilletera}
                  onChange={(e) => setSaldoBilletera(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Importancia de la clase
                  </span>
                  <span>{importanciaClase}/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={importanciaClase}
                  onChange={(e) => setImportanciaClase(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>
            </div>
          </article>

          <article className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-md xl:overflow-auto">
            <h2 className="border-l-4 border-primary pl-3 text-sm font-black uppercase tracking-wider text-on-surface">
              Pesos del agente
            </h2>
            <p className="mt-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-on-surface-variant">
              Funcion de utilidad: el agente no busca solo llegar, sino
              maximizar su satisfaccion por trade-off entre tiempo, dinero y
              comodidad.
            </p>

            <div className="mt-4 space-y-4">
              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    W_Tiempo
                  </span>
                  <span>{wTiempo}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={wTiempo}
                  onChange={(e) => setWTiempo(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <CircleDollarSign className="h-3.5 w-3.5" />
                    W_Dinero
                  </span>
                  <span>{wDinero}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={wDinero}
                  onChange={(e) => setWDinero(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  <span>W_Comodidad</span>
                  <span>{wComodidad}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={wComodidad}
                  onChange={(e) => setWComodidad(Number(e.target.value))}
                  className={sliderClass}
                />
              </label>
            </div>

            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-primary sm:text-xs">
                Decision actual
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-on-surface">
                <Trophy className="h-4 w-4 text-primary" />
                {mejor.nombre}
              </p>
              <p className="text-xs text-on-surface-variant">
                Utilidad: {mejor.utilidad.toFixed(1)}% | Tiempo:{" "}
                {formatMinutes(mejor.tiempoMin)} | Costo:{" "}
                {formatMoney(mejor.costo)}
              </p>
            </div>

            <div className="mt-3 rounded-md border border-tertiary/30 bg-tertiary/10 px-3 py-2 text-xs text-on-surface-variant">
              U(s, a) = SUM(w_i * f_i(s, a)). El agente elige la accion a que
              maximiza la utilidad esperada.
            </div>
            <div className="mt-3 rounded-md border border-outline-variant bg-surface px-3 py-2 text-xs text-on-surface-variant">
              Si la probabilidad de corte del puente sube, cae la utilidad
              esperada de viajar en vehiculo y el agente ajusta su conducta.
            </div>
          </article>

          <section className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-md xl:overflow-auto">
            <h2 className="mb-3 border-l-4 border-tertiary pl-3 text-sm font-black uppercase tracking-wider text-on-surface">
              Actuadores
            </h2>
            <p className="mb-3 rounded-md border border-tertiary/30 bg-tertiary/10 px-3 py-2 text-xs text-on-surface-variant">
              Actuadores: medios por los que el agente ejerce efecto en el
              entorno para pasar de Chaco a Corrientes.
            </p>

            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {resultados.map((item) => {
                const isBest = item.key === mejor.key;
                return (
                  <article
                    key={item.key}
                    className={`rounded-xl border p-4 shadow-sm transition ${
                      isBest
                        ? "border-primary bg-primary/12 ring-2 ring-primary/40 shadow-lg shadow-primary/20"
                        : "border-outline-variant bg-surface"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="flex items-center gap-1.5 text-sm font-black leading-tight text-on-surface">
                        {iconoAccion(item.key)}
                        {item.nombre}
                      </h3>
                      {isBest && (
                        <span className="rounded-md bg-primary px-2 py-1 text-[10px] font-black tracking-wide text-on-primary">
                          OPTIMA :)
                        </span>
                      )}
                    </div>

                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-md bg-surface-container p-2">
                        <dt className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                          Tiempo
                        </dt>
                        <dd className="text-sm font-bold text-on-surface">
                          {formatMinutes(item.tiempoMin)}
                        </dd>
                      </div>
                      <div className="rounded-md bg-surface-container p-2">
                        <dt className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                          Costo
                        </dt>
                        <dd className="text-sm font-bold text-on-surface">
                          {formatMoney(item.costo)}
                        </dd>
                      </div>
                    </dl>

                    {item.bloqueada && (
                      <p className="mt-2 rounded-md border border-error/30 bg-error/10 px-2 py-1 text-[11px] font-semibold text-error">
                        {item.bloqueada}
                      </p>
                    )}

                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                        <span>Puntaje de utilidad</span>
                        <span className="text-on-surface">
                          {item.utilidad.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isBest
                              ? "bg-linear-to-r from-primary to-primary-container"
                              : "bg-linear-to-r from-secondary to-secondary-container"
                          }`}
                          style={{ width: `${item.utilidad}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                          <span>Barato</span>
                          <span>{Math.round(item.baratoScore)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${item.baratoScore}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                          <span>Tarda mucho</span>
                          <span>{Math.round(item.tardaScore)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                          <div
                            className="h-full rounded-full bg-rose-500"
                            style={{ width: `${item.tardaScore}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                          <span>Comodidad</span>
                          <span>{Math.round(item.comodidadScore)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                          <div
                            className="h-full rounded-full bg-sky-500"
                            style={{ width: `${item.comodidadScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-on-surface">
              <BrainCircuit className="h-4 w-4 text-primary" />
              Ecuacion de la racionalidad
            </h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              V(S) asigna un valor numerico a cada estado S. Un agente basado en
              objetivos responde si llego o no; un agente de utilidad mide grado
              de satisfaccion y elige el mejor equilibrio.
            </p>
          </article>

          <article className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-on-surface">
              <Sigma className="h-4 w-4 text-secondary" />
              Utilidad esperada e incertidumbre
            </h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              En un entorno estocastico y parcialmente observable, el agente
              maximiza utilidad esperada, no utilidad instantanea perfecta.
            </p>
            <p className="mt-2 text-xs text-on-surface-variant">
              Ejemplo: con 50% de probabilidad de corte, la accion auto pierde
              valor esperado y puede ser superada por colectivo o remoto.
            </p>
          </article>

          <article className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-on-surface">
              <BookOpen className="h-4 w-4 text-tertiary" />
              PEAS / PAMA del caso
            </h3>
            <div className="mt-2 space-y-2 text-xs text-on-surface-variant">
              <p>
                <span className="font-black text-on-surface">P:</span> minimizar
                tiempo y costo, maximizar comodidad, llegar a horario.
              </p>
              <p>
                <span className="font-black text-on-surface">E:</span> Puente
                Gral. Belgrano, trafico, clima, peajes, sistema de transporte.
              </p>
              <p>
                <span className="font-black text-on-surface">A:</span> auto,
                colectivo, remis y decision de cursar remoto.
              </p>
              <p>
                <span className="font-black text-on-surface">S:</span> demora
                actual, clima, tarifas y saldos disponibles.
              </p>
            </div>
          </article>

          <article className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-on-surface">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Propiedades del entorno
            </h3>
            <div className="mt-2 space-y-1 text-xs text-on-surface-variant">
              <p>Observable: parcialmente observable.</p>
              <p>Agentes: multiagente (trafico compartido).</p>
              <p>Determinismo: estocastico.</p>
              <p>Estructura: secuencial.</p>
              <p>Dinamica: dinamico en tiempo real.</p>
            </div>
            <p className="mt-3 rounded-md border border-outline-variant bg-surface px-2 py-1 text-xs text-on-surface-variant">
              Basado en Diallo et al. (2025): el cambio hacia transporte publico
              aparece cuando el costo vial supera umbrales criticos.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default AgenteUtilidadPuente;
