# Brief de rediseño — "Ahorra con cabeza"

> Documento para Claude Code. Objetivo: rehacer **solo la capa visual / UI** del simulador, sin tocar el motor de cálculo ni el contenido. Trabajar en la rama `rediseno-v2`.

---

## 0. Contexto del proyecto

- **Proyecto:** Ahorra con cabeza — simulador educativo de ahorro/inversión para Chile.
- **Carpeta:** `~/simulador-ahorro-chile` · corre en `localhost:3002`.
- **Stack:** Next.js + React + TypeScript + Tailwind + Gemini API.
- **Público:** alguien sin conocimiento financiero que quiere ahorrar para un objetivo concreto (un "sueño": viaje, auto, pie de depto, etc.).
- **Idioma:** español chileno, trato de **tú** (puedes, tienes, quieres — nunca vos).

### Qué se MANTIENE (no rehacer)
- El motor de cálculo (simulación mes a mes). Reusar la lógica existente.
- El contenido de las fichas educativas por producto.
- Las fuentes de tasas por producto.
- Config: `eslint: { ignoreDuringBuilds: true }` en `next.config.ts`, Vercel Analytics incluido.

### Qué NO hacer
- No empezar de cero. No borrar el motor ni el contenido.
- No tasas en vivo en v1 (ver §5).

---

## 1. Concepto visual

**"Tu sueño que crece."** Cálido, claro, optimista. Anti-banco: nada de azul corporativo frío.
Cada color tiene un trabajo, el color no es decoración.

---

## 2. Paleta

| Rol | Nombre | Hex | Para qué |
|-----|--------|-----|----------|
| Primario | Verde brote | `#12B886` | Crecer: rendimiento, metas alcanzadas, "tu plata trabajando" |
| Primario oscuro | Verde oscuro | `#0B7A56` | Texto sobre tintes verdes, hovers |
| Acento | Mango | `#FF8A3D` | La meta y la acción: CTAs, objetivo |
| Acento oscuro | Mango oscuro | `#C25A12` / `#F46A1F` | Botón sólido + texto, hover |
| Apoyo | Cielo | `#4DABF7` | Lo educativo: fichas, tips |
| Texto | Tinta | `#16241D` | Casi-negro con tinte verde, más cálido que negro puro |
| Fondo | Crema | `#FBF5EC` | Fondo de página (clave: saca el aire de banco) |
| Superficie | Blanco | `#FFFFFF` | Tarjetas |
| Semántico alerta | Amarillo | `#F4A82C` | "Todavía no llegas" |
| Semántico riesgo | Rojo | `#E8554E` | Riesgo alto / error |

Tintes claros para fondos de chips/badges: verde `#E3F7EF`, mango `#FFF0E3`, cielo `#E7F2FD`, amarillo `#FDEBCF`.

---

## 3. Tipografía

- **Display / títulos:** Plus Jakarta Sans (700 / 500). Geométrica, redondeada, amigable. Alternativas si se quiere más carácter: Satoshi o General Sans.
- **Cuerpo:** Plus Jakarta Sans 400 (o Inter).
- **Números (tabla, montos):** `font-variant-numeric: tabular-nums` para que las columnas alineen.
- Sentence case. Dos pesos de cuerpo (400/500); 700 solo para los números grandes y el título.

---

## 4. Superficies, sombra, degradado, radios

- **Fondo de página:** crema `#FBF5EC`. **Tarjetas:** blanco.
- **Sombra suave en tarjetas** (despegarlas del fondo, que no quede plano): `box-shadow: 0 2px 10px rgba(22,36,29,0.06)`. Sutil, nunca dramática.
- **Degradados con criterio:**
  - Banner de meta alcanzada: verde brote → verde un poco más claro.
  - Botón mango: sólido en reposo, mango → mango oscuro en hover.
  - **Evitar** degradados multicolor / arcoíris (envejecen).
- **Radios generosos:** 12–16px en tarjetas, 10px en botones/chips/inputs. Bordes redondeados = más amigable.

---

## 5. Estrategia de assets (imágenes / animación)

- **Animación de verdad → Lottie** (lottiefiles.com): plata que crece, monedas, check de meta. Liviano, no video pesado.
- **Ilustración → Storyset, Humaaans, Open Peeps, unDraw** (gratis, editables al color de marca verde+mango). Una ilustración por categoría de objetivo y por producto. **No** foto de stock de gente con plata (se ve corporativo).
- **Foto solo si es muy puntual → Unsplash / Pexels.**
- **Íconos:** un set consistente (Lucide o Tabler), trazo, no rellenos.
- Regla: ilustración > foto. El producto tiene que sentirse "fintech joven", no informe bancario.

---

## 6. Motion (principios, no decoración)

- Números que **cuentan hacia arriba** al actualizarse (count-up con easing, ~1s). Sobre todo el rendimiento y el monto final.
- Filas de la tabla que **entran en cascada** al recalcular.
- **Tarjetas de producto que giran** (flip) al tocarlas.
- Barra/anillo de meta que **se llena**.
- **Confetti sutil** al alcanzar la meta.
- Librerías: Framer Motion para transiciones de UI, Lottie para lo ilustrado.

---

## 7. Estructura de la pantalla

Layout de dos columnas en desktop (aprovechar el ancho), apilado en mobile.

**Columna izquierda — definir el objetivo:**
1. Categoría del objetivo (chips con ícono + color: Vivienda, Vehículo, Viaje, Tecnología, Educación, Emergencia, Otro).
2. Nombre del objetivo (texto libre).
3. Monto objetivo (CLP), Monto inicial (CLP), Aporte mensual (CLP) — todos con prefijo `$` y rótulo "CLP".
4. **Plazo: un solo bloque blanco** que contiene el número + el selector de unidad (días / meses / años) pegados, para que se lea como un control único.
5. Tipo de producto (select).
6. Tasa anual **editable**, con sufijo `%` y nota "ilustrativa · editable · no refleja tasas reales vigentes".

**Columna derecha — el resultado:**
1. **Banner que reacciona**: verde si llega ("¡Llegas a [nombre] en X!"), alerta si no ("Te faltan $Y"). Con ícono de la categoría.
2. **4 metric cards:** Monto final proyectado · Tu objetivo (+ "✓ Alcanzado" / "Te falta $") · Total aportado ("Tu capital") · Rendimiento generado ("Lo que trabajó tu plata", en verde, con count-up).
3. **Tabla de evolución** ("Empiezas con $X · así crece"): columnas Periodo · Saldo inicio · Interés · Aporte · Saldo final. Toggle de vista **Mensual / Trimestral / Anual** (no diario ni semanal: ruido para un público principiante).
4. **Tip reactivo (card cielo):** UN solo tip que reacciona al resultado.
   - Si sobra: "Esos $X de más podrías moverlos a un fondo mutuo y dejarlos crecer."
   - Si falta: "Subí el aporte a ~$Y o estirá el plazo; el interés rinde más con tiempo."

**Abajo (full width) — conocé los productos:**
- **Tarjetas de producto que giran.** Frente: ícono, nombre, qué es en una línea, insignia de riesgo. Dorso: top 3 instituciones que lo ofrecen + tasa.

---

## 8. Plan de componentes

| Componente | Responsabilidad |
|-----------|-----------------|
| `ObjetivoForm` | Todos los inputs de la izquierda (categoría, nombre, montos, plazo-bloque, producto, tasa). Emite el estado al simulador. |
| `PlazoInput` | El bloque único número + unidad (días/meses/años). |
| `ResultPanel` | Contenedor de la derecha; orquesta banner + cards + tabla + tip. |
| `MetaBanner` | Banner reactivo (verde/alerta) con ícono de categoría. |
| `MetricCards` | Las 4 tarjetas de resumen; el rendimiento usa count-up. |
| `EvolucionTabla` | Tabla con toggle Mensual/Trimestral/Anual; cascada al recalcular. |
| `TipReactivo` | Card cielo con el único tip que reacciona al resultado (puede alimentarse de Gemini o reglas locales). |
| `ProductFlipCards` | Grilla de 4 tarjetas que giran (frente qué es + riesgo / dorso top 3). |
| `useSimulador` (hook) | Motor de cálculo existente: (inicial, aporte, meses, tasaAnual) → filas mensuales + totales (final, aportado, rendimiento). **Reusar, no reescribir.** |

Fórmula base (mantener la actual): tasa mensual = tasaAnual/12; cada mes interés = saldo × tasaMensual; saldoFinal = saldo + interés + aporte.

---

## 9. Reglas de contenido y disclaimers (mantener)

- Trato de **tú** chileno en todos los textos.
- Tasas **ilustrativas y editables**; rótulo visible "no refleja tasas reales vigentes".
- Disclaimer en pie: "esto no es asesoría financiera".
- Fichas educativas por producto (qué es, ventajas, consideraciones, para qué objetivo encaja, cómo se llama la tasa, "¿dónde encuentro las tasas?").
- **Top 3 del dorso de las tarjetas:** v1 **curado** por el dueño del proyecto (no scraping en vivo). Mostrar fecha y la leyenda "referencial · no es ranking ni recomendación · verificá en la web oficial".
- Una fuente por producto en "¿dónde encuentro las tasas?":
  - Depósito a plazo → depositoaplazo.cl
  - Fondo mutuo → buscafondos.cl
  - APV → CMF
  - Cuenta remunerada → sitio/app del banco
- Tasas en vivo (scraping con fecha) quedan para v2.
