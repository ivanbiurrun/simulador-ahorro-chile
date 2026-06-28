# INSTRUCTIVO — Estilo y layout final

> El build no refleja el mockup aprobado: quedó el estilo neutro (tarjetas blancas, bordes grises, chip activo con borde **negro**) que ya se descartó. Esta corrección baja el mockup a **valores exactos por componente**. Aplicar TODO en una pasada. No omitir ningún punto. Al terminar, dejar corriendo en localhost:3002 y avisar.

---

## 1. Duplicaciones — eliminar

1. **"Ahorra con cabeza" aparece dos veces** (TopBar + headline del Hero). La marca queda SOLO en la TopBar. El **headline del Hero cambia** a la propuesta de valor, no repite la marca:
   - Nuevo headline del Hero: **"Aprende a hacer crecer tu plata"** (grande). Debajo, el párrafo de intro y los chips.
2. **Los 3 beneficios aparecen dos veces** (chips del Hero + estado vacío de la derecha). Dejarlos SOLO en el Hero. Quitarlos del panel derecho (ver punto 4).
3. **Atribución**: quitar el "by". En la TopBar, a la derecha: "Simulador educativo · por Iván Biurrun" (sutil, gris terciario), nunca "by".

## 2. Layout a ANCHO COMPLETO (insistido varias veces)

4. La herramienta usa **todo el ancho útil de la pantalla**. Contenedor `max-w-[1440px]` centrado con padding lateral generoso (`px-10` a `px-12`). **Eliminar los márgenes vacíos enormes** a los costados: hoy el contenido está apretado al medio, eso está mal.
5. Grid de dos columnas que ocupa ese ancho: **formulario en la mitad izquierda**, **resultado en la mitad derecha** (~`grid-cols-[1fr_1.1fr]`, casi 50/50). El form llega hasta el centro; el resultado va del centro a la derecha.
6. La sección **"Conoce los productos" (flip cards) también a ancho completo**, mismo contenedor, grilla de 4 columnas en desktop.

## 3. Tipografía MÁS GRANDE (subir un escalón todo)

7. Escala nueva:
   - Hero headline: **44px / 700**. Párrafo intro: **18px / 400**, interlineado 1.6.
   - Títulos de sección ("Define tu objetivo", "Conoce los productos"): **24px / 700**.
   - Labels de campos: **15px / 500**. Inputs y valores: **16px**.
   - Chips de categoría: texto **14px**.
   - Números de metric cards: **30px / 700**. Rótulo: **13px**.
   - Flip cards: nombre **18px / 600**, descripción **15px**.
8. En general: lo que hoy se ve chico, subir un nivel. Que respire.

## 4. Estado del resultado EN CERO (no un vacío genérico)

9. Reemplazar "Tu proyección aparecerá aquí" + los 3 pasos por el **layout real del resultado, en cero**, para que se vea dónde va a aparecer:
   - ResultHeader neutro: texto tenue "Completa tu objetivo y toca 'Ver mi proyección'".
   - Las **4 metric cards mostrando $0** (atenuadas, opacidad ~0.6).
   - La tabla con su encabezado y una fila placeholder (guiones).
   - Sin el trío de 3 pasos (ya vive en el Hero).
   - Al simular, transición suave de este estado-cero al resultado real (count-up).

## 5. ESTILO VISUAL — bajar el mockup a valores EXACTOS (lo central)

Aplicar estos colores **elemento por elemento**. Si después queda algo gris/negro, es que no se aplicó.

**Fondos y texto base**
- Fondo de página: **crema `#FBF5EC`** — tiene que verse, no blanco ni gris.
- Texto: base **tinta `#16241D`**, secundario `#5C635A`, terciario `#7A8077`.

**TopBar**
- Fondo **`#0B7A56`**, texto blanco. Marca a la izquierda (ícono + "Ahorra con cabeza"), atribución a la derecha.

**Hero**
- Fondo gradiente suave **`#E3F7EF` → `#FBF5EC`**. Headline tinta. Chips de beneficio: pill **blanco** con sombra suave, ícono a color, texto tinta.

**Tarjetas (form, resultado, productos)**
- Fondo **blanco `#FFFFFF`**, **sombra `0 2px 10px rgba(22,36,29,.06)`**, borde `1px #F0E9DC` (cálido, casi invisible) o sin borde. **Prohibido**: `border-gray-*`, bordes negros, sombras duras.

**Chips de categoría** (acá está el bug visible)
- Activo: **borde 2px `#12B886`**, fondo **`#E3F7EF`**, texto e ícono **`#0B7A56`**.
- Inactivo: fondo blanco, borde `1px #ECE4D6`, texto `#5C635A`, ícono `#7A8077`. Hover: borde `#12B886` suave.
- **Nunca borde negro.**

**Inputs y selects**
- Fondo blanco, borde `1px #ECE4D6`, radio 10px. Foco: borde **`#12B886`**. Prefijo `$` en `#7A8077`.
- Bloque **Plazo** (número+unidad) unificado, mismo borde, foco verde.
- **Tasa anual**: borde `#F4A82C`, fondo `#FDF6E8`, símbolo `%` en `#C2841A`.

**CTA**
- "Ver mi proyección →": fondo **mango `#F46A1F`**, texto blanco, hover `#C25A12`. (ya está OK)

**Resultado (cuando hay simulación)**
- ResultHeader: pill verde (`#E3F7EF` / `#0B7A56`, "✓ Meta alcanzada") o alerta (`#FDEBCF` / `#8A5A0C`, "Te falta"). Barra de progreso fina: relleno `#12B886` sobre track `#E3F7EF`. **Sin slab sólido.**
- Metric cards: blancas con sombra; la de **Rendimiento** con fondo `#E3F7EF` y número `#0B7A56`.
- Tabla: rótulos `#7A8077`; columna Interés en `#0B7A56`; Saldo final en negrita tinta; filas separadas por `#F2ECE0`.
- Tip: fondo **`#E7F2FD`**, texto **`#1565A8`**, ícono cielo. Texto accionable (sobra/justo/falta), nunca felicitación.

**Flip cards de productos**
- Frente: blanco, **borde izquierdo 3px de color por producto** (cuenta `#378ADD`, depósito `#1D9E75`, fondo mutuo `#7F77DD`, APV `#D85A30`), ícono del mismo color, insignia de riesgo con tinte (`#E3F7EF`/`#0B7A56` o `#FDEBCF`/`#8A5A0C`). Dorso: fondo tinte, top 3 instituciones + fuente.

## 6. Verificación final (que Claude Code la corra)

10. Buscar en TODOS los componentes y eliminar cualquier clase neutra heredada: `gray-*`, `slate-*`, `zinc-*`, `text-black`, `border-black`, `bg-white` sin sombra. Reemplazar por la paleta de arriba. **Criterio de aprobado**: ningún borde negro, el fondo crema visible, los chips activos en verde, y la página se parece al mockup aprobado.

## Intocables
`lib/calculations.ts` · `lib/products.ts` · `app/api/tips/route.ts` · `lib/formatters.ts`.

## Ejecución
Todo en una sola pasada. No pedir aprobación intermedia. Dejar corriendo en localhost:3002 y reportar qué quedó. (Ilustraciones + Lottie siguen siendo Pase 2, NO ahora.)
