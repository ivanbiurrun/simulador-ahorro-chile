# Correcciones v1 — aplicar sobre `rediseno-v2`

> Leer junto con `BRIEF.md`. Estas instrucciones son **explícitas**: hay que QUITAR y REEMPLAZAR, no solo agregar. El refactor conservó estructura y estilos del build viejo porque el brief no pedía sacarlos. Esto lo corrige.

## Antes de tocar nada
Mostrame el plan: (1) qué archivos tocás, (2) confirmá que NO tocás `lib/calculations.ts`, `lib/products.ts`, `app/api/tips/route.ts`. Empezá por el layout (header + grilla) y mostrámelo antes de los componentes internos.

---

## P0 · Layout y scroll (lo más roto)
1. **ELIMINAR el hero gigante** (el banner verde de pantalla completa con el título centrado). Reemplazar por un **header compacto** tipo franja (~64–72px de alto): ícono + "Ahorra con cabeza 🇨🇱" a la izquierda, subtítulo corto a la derecha. Nada de gradiente que ocupe un viewport entero.
2. **Contenedor ancho de verdad:** usar el ancho útil (ej. `max-w-screen-xl` ~1280px con padding lateral). En pantallas anchas NO dejar el contenido apretado al centro con márgenes enormes a los costados.
3. **Dos columnas balanceadas:** formulario ~40% / resultado ~60%, alineadas arriba. La herramienta tiene que verse apenas carga, sin scrollear.
4. **Compactar el formulario** para acortar la columna izquierda: categoría en una fila, y los 3 montos (objetivo / inicial / aporte) en **una fila de 3**, no apilados. Plazo + tasa pueden ir en una fila también.

## P0 · Color (esto es un BUG, no "viene después")
5. Auditar **todos** los componentes y reemplazar las clases grises/negras heredadas (`bg-white` plano, `bg-gray-50`, `text-gray-*`, `border-gray-*`, negro) por los tokens de la paleta del BRIEF:
   - Fondo de página: **crema `#FBF5EC`** (tiene que verse, no gris).
   - Chips de categoría activos: **verde brote** (borde `#12B886` + fondo `#E3F7EF` + texto `#0B7A56`), NO negro.
   - CTA "Ver mi proyección": **mango sólido `#F46A1F`**, texto blanco, hover mango oscuro.
   - Tarjetas: blancas con **sombra suave** `0 2px 10px rgba(22,36,29,.06)` y borde sutil.
   - Tip: tinte **cielo `#E7F2FD`** / texto `#1565A8`.
   - Rendimiento: tinte/numeral **verde** `#0B7A56`.
   - Texto base: **tinta `#16241D`**.
6. Si después de esto algo sigue gris, es que quedó un componente sin migrar: revisalos uno por uno.

## P0 · Quitar el gráfico
7. **ELIMINAR** el bloque "Tu ahorro en el tiempo" (gráfico de línea). Ya se decidió que no va. Borrar el componente del render y su uso.

## P0 · Encabezado de resultado (el "bloque verde")
8. **ELIMINAR el slab verde sólido** de arriba del resultado. Reemplazar por un **encabezado en una línea**: un pill chico ("✓ Meta alcanzada" en verde / "Te falta" en alerta) + el texto de estado ("Llegas a '[objetivo]' en X · te sobran $Y") + una **barra de progreso fina**. Sin slab pesado ni layout descentrado. Las 4 metric cards de abajo ya muestran el detalle.

## P1 · Tip reactivo (NO una felicitación)
9. El tip **no felicita** — de eso ya se encarga el encabezado. El tip da una **acción concreta**:
   - **Sobra:** "Te sobran $X. Si no los necesitas para [objetivo], en un fondo mutuo podrían seguir creciendo en vez de quedarse quietos en la cuenta."
   - **Justo:** "Justo llegas. Para tener un colchón, sumá un par de meses de aporte."
   - **Falta:** "Te faltan $X. Subí el aporte a ~$Y o estirá a Z meses para llegar."
   - Si el tip viene de `/api/tips` (Gemini), pasale en el prompt el estado (sobra/justo/falta) y el monto, y pedile una sola recomendación accionable, nunca una felicitación.

---

## Pase 2 (NO ahora — no olvidar)
Ilustraciones (Storyset / Humaaans / unDraw) + animaciones Lottie por categoría y por producto. Esto sí es "viene después": primero esta corrección de **layout + color + UX**, después la capa ilustrada, en su propio commit.

## Orden de ejecución
P0 layout → P0 color (auditoría de componentes) → quitar gráfico → rehacer encabezado de resultado → P1 tip. Commit después de cada bloque.
