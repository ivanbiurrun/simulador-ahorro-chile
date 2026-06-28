# INSTRUCTIVO v3 — Ajustes, contenido nuevo y capa visual

> La base está bien (paleta, layout ancho, result panel). Esto refina y sube el nivel. Aplicar los 6 puntos. Intocables: `lib/calculations.ts`, `lib/products.ts`, `lib/formatters.ts`. Al terminar, dejar corriendo en localhost:3002 y reportar.

---

## 1. Comprimir el encabezado (que el simulador entre sin scroll)

El TopBar + Hero ocupan demasiado alto. Rehacer así:
- **TopBar → franja delgada**: una barra de verde oscuro `#0B7A56` de ~12px de alto, **sin texto** (solo acento de marca).
- **Hero compacto** (~180–200px, gradiente `#E3F7EF` → `#FBF5EC`, padding vertical reducido):
  - Título: **"Ahorra con cabeza 🇨🇱"** (32px/700, tinta `#16241D`). ← la marca vuelve acá (ya no en el TopBar, así no se duplica).
  - Intro en 1–2 líneas (16px): "Aprende a hacer crecer tu plata: compara los productos de ahorro e inversión de Chile y entiende cómo funciona cada uno."
  - "por Iván Biurrun" (13px, `#7A8077`) debajo del intro.
  - Los 3 chips de beneficio, compactos.
- **Objetivo medible:** en una pantalla de notebook típica, el formulario y el inicio del resultado tienen que verse **sin scrollear**.

## 2. Consejo (Gemini) — que aconseje de verdad

Hoy el consejo felicita o repite el número, y el texto se corta a mitad ("…para alcanzar la"). Arreglar:
- **Bug de truncado**: el consejo nunca debe cortarse a mitad de frase, ni romper el número (vi "$32.687" cuando era "$32.687.388"). Formatear el monto completo con `lib/formatters.ts`.
- **Fallback local fuerte y accionable** (que funcione aunque Gemini falle/sature):
  - Sobra: "Te sobran $X. Si no los necesitas para [objetivo], moverlos a un fondo mutuo los deja seguir creciendo en vez de quedarse quietos en la cuenta."
  - Justo: "Justo llegas. Para tener un colchón, sube el aporte o suma un par de meses."
  - Falta: "Te faltan $X para tu meta. Subiendo el aporte a ~$Y, o estirando a Z meses, llegas. El interés rinde más mientras más tiempo le des."
- **Prompt a Gemini**: pasarle estado (sobra/justo/falta) + montos + producto, y pedir **una recomendación accionable y concreta en español de Chile (tú)**, máximo 2 frases, **prohibido felicitar o solo repetir el número**. Si Gemini no responde o tarda, usar el fallback local sin mostrar error.
- Revisar en consola por qué Gemini no está respondiendo (API key / saturación de free tier); si satura seguido, que el fallback local sea el comportamiento por defecto y Gemini un "plus".

## 3. Animación también cuando NO llega a la meta

Hoy solo hay animación (confetti) si alcanza. Cuando no llega, el resultado se siente muerto.
- **Count-up de las cifras** y **llenado animado de la barra de progreso** deben correr en **los dos casos** (alcanza y no alcanza).
- Confetti: solo al alcanzar.
- No alcanza: una micro-animación de aliento, no de fracaso — la barra llega a su % con easing y una flecha ↑ sutil junto a "Te falta". Nada rojo agresivo.
- Respetar `prefers-reduced-motion` (desactiva todo lo anterior).

## 4. Tarjetas de producto — texto cortado

Las fichas del frente se cortan a mitad ("Es el…", "La…").
- Darle al cuerpo de la tarjeta un **área con scroll vertical** (`overflow-y:auto`, altura fija) para que se pueda **bajar y seguir leyendo** la ficha completa sin cortar.
- Que nunca quede texto truncado con "…" a mitad de palabra. Si se prefiere, "Leer más" que expande la tarjeta.
- Mantener el flip (dorso = dónde encontrarlo / top 3).

## 5. Dos bloques educativos nuevos (abajo, ancho completo)

### Bloque A — "Conceptos en 1 minuto"
4 tarjetas (mismo estilo que las de producto, con scroll si hace falta). Copy exacto (español de Chile, no inventar otro):
- **Interés compuesto** — "Tus intereses generan más intereses. Por eso el tiempo pesa más que el monto: empezar antes rinde más que poner mucho después."
- **Riesgo y rentabilidad** — "Van juntos. Lo que puede rendir más también puede bajar. No existe 'mucho y seguro' al mismo tiempo."
- **Liquidez** — "Qué tan rápido puedes sacar tu plata. Una cuenta es líquida; un depósito a plazo te la deja fija un tiempo."
- **Diversificar** — "No pongas todo en un solo lugar. Repartir entre productos baja el riesgo de que un mal momento te pegue de lleno."

### Bloque B — "Novedades para seguir aprendiendo"
Tarjetas con: titular (propio, corto) · fuente · fecha · link a la nota original.
- **v1 curado**: dejar 3–4 tarjetas con estructura lista y placeholders para que Iván cargue titular + link real. No scrapear en vivo todavía.
- **Reglas**: nunca reproducir el texto del artículo (solo titular propio + link a la fuente). Mostrar fecha. Dejar el componente preparado para enchufar un feed/RSS más adelante.

## 6. Capa visual "menos formal" — Thiings 3D + Lottie

Esto es lo que saca el aire formal.
- **Íconos 3D estilo Thiings** (thiings.co, gratis): reemplazar los íconos planos de Lucide en zonas de **contenido** por objetos 3D:
  - Categorías: casa, auto, avión, notebook, birrete, escudo, estrella.
  - Productos: billetera, candado, gráfico, paraguas (o los que correspondan).
  - Hero y estado vacío del resultado.
  - **Mantener Lucide solo en controles de UI** (flechas, chevrons, info "i").
- **Lottie** (`lottie-react` + lottiefiles, animaciones gratis):
  - Estado vacío del resultado: una animación de "plata que crece" / moneda, en loop suave.
  - Un toque sutil en el bloque de Consejo.
  - Mantener el confetti existente.
- Respetar `prefers-reduced-motion`.
- Licencias: usar solo recursos gratuitos de Thiings y lottiefiles.

---

## Ejecución
Aplicar los 6 puntos. Commit por bloque (1-header, 2-consejo, 3-animación, 4-cards, 5-educativo, 6-visual) para no perder trabajo. Dejar corriendo y reportar qué quedó y qué no.
