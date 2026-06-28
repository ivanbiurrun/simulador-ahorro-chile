# BRIEF v2 — "Ahorra con cabeza" · rediseño íntegro

> Reemplaza al brief anterior. Documento de diseño de producto. **Ejecutar el rediseño COMPLETO en una sola pasada** (todos los componentes integrados) y dejar la app corriendo para revisión. No por pasos con aprobaciones intermedias.

---

## 0. Norte del proyecto (leer antes de codear)

Este simulador tiene **dos públicos al mismo tiempo**:
1. Un chileno **sin conocimiento financiero** que quiere ahorrar para algo concreto (un sueño) y necesita entender, no marearse.
2. Un **reclutador de fintech** que lo ve como portfolio. **La calidad de UX/UI es la value prop.** Tiene que leerse como hecho por alguien con criterio de producto: jerarquía clara, estados pensados, microcopy cuidado, movimiento con sentido.

Principio rector: **claridad sobre densidad.** Cada zona responde a una pregunta del usuario: *¿qué es esto? · ¿qué hago? · ¿qué significa el resultado?*

Regla de oro de calidad: si un detalle (un estado vacío, un hover, un texto de error, un espacio) se ve "por default", está mal. Todo es intencional.

---

## 1. Primera impresión / intro (esto FALTABA — es prioridad)

Quien entra tiene que entender el producto en segundos. Va un **hero compacto** (NO de pantalla completa, NO solo una franja de navegación):

- **Barra superior delgada** (~56px): a la izquierda ícono + "Ahorra con cabeza 🇨🇱"; a la derecha "Simulador educativo · Iván Biurrun".
- **Hero de intro** justo debajo (~200–240px, fondo gradiente verde brote suave → verde claro):
  - Headline (Plus Jakarta 700, grande): **Ahorra con cabeza**
  - Value prop en una línea (copy exacto, no inventar otro):
    > Más que un simulador: aprende a hacer crecer tu plata. Define una meta, compara los productos de ahorro e inversión que existen en Chile y entiende cómo funciona cada uno — para decidir con información, no a ciegas.
  - Tres beneficios en chips horizontales: **🎯 Define tu meta · 📈 Proyecta cómo crece · 💡 Aprende al hacerlo**
- Inmediatamente debajo, la herramienta. El usuario llega a los inputs casi sin scrollear.

El hero explica, pero **no ocupa un viewport entero**. Esa es la diferencia con lo anterior.

---

## 2. Arquitectura de información y layout

- **Contenedor ancho** centrado, `max-w-screen-xl` (~1280px) con padding lateral cómodo. En pantallas anchas **usa el ancho**: nada de contenido apretado al medio con márgenes enormes.
- **Dos columnas** alineadas arriba:
  - **Izquierda — "Define tu objetivo"** (~38%): el formulario.
  - **Derecha — Resultado** (~62%): empty state al inicio; proyección tras simular. Hacerla `sticky` en desktop si la izquierda es más alta.
- **Formulario compacto** para acortar la columna y reducir scroll:
  - Categoría: chips en una grilla compacta.
  - Montos (objetivo / inicial / aporte): **una fila de 3**, no apilados.
  - Plazo (bloque único número+unidad) y Tasa (%) en **una fila de 2**.
  - Producto: select.
  - CTA mango full-width: "Ver mi proyección →".
- **Sección de productos** (flip cards) full-width debajo de las dos columnas.
- **Footer**: disclaimer.
- **Responsive**: en tablet/mobile las columnas se apilan (form arriba, resultado abajo); flip cards pasan a 1 columna; el hero reduce su alto.

---

## 3. Estados (lo que separa "pro" de "demo")

- **Vacío** (sin simular): panel derecho con ícono verde, "Tu proyección aparecerá aquí" y los 3 pasos (Define tu meta · Ve la proyección · Aprende al hacerlo). Mantener, pero **con color de paleta**, no gris.
- **Cargando**: transición suave (fade/slide o skeleton breve). Nunca un spinner crudo.
- **Resultado**: encabezado de estado en una línea + 4 metric cards + tabla de evolución + tip. **Sin gráfico. Sin slab verde.**
- **Transición vacío → resultado**: suave; los números entran con count-up; las filas de la tabla en cascada.
- **Bordes**: si meta=0 o aporte=0, mensaje claro y amable, no NaN ni "$0" mudo.

---

## 4. Sistema visual

**Paleta** (cada color tiene una función):

| Rol | Hex | Uso |
|-----|-----|-----|
| Verde brote | `#12B886` / oscuro `#0B7A56` | crecer: rendimiento, metas, acentos positivos |
| Mango | `#FF8A3D` / CTA `#F46A1F` | acción y meta: botones |
| Cielo | `#4DABF7` / texto `#1565A8` | educativo: tips, fichas |
| Tinta | `#16241D` | texto base |
| Crema | `#FBF5EC` | fondo de página (¡que se vea!) |
| Blanco | `#FFFFFF` | tarjetas |
| Alerta | `#F4A82C` | "te falta" |
| Tintes | verde `#E3F7EF` · cielo `#E7F2FD` · mango `#FFF0E3` | fondos de chips/cards |

- **Tipografía**: Plus Jakarta Sans. Escala: display 28–32/700, sección 18/600, body 14/400, caption 12. Cifras con `tabular-nums`.
- **Espaciado**: escala 4 / 8 / 12 / 16 / 24 / 32. Ritmo consistente, mucho aire.
- **Elevación**: una sola sombra de card `0 2px 10px rgba(22,36,29,.06)`. Nada de bordes grises duros.
- **Radios**: 12–16 en cards, 10 en inputs/botones/chips.
- **Gradiente**: solo en el hero y en el hover del CTA mango. Nunca multicolor.
- **Iconografía**: un solo set (Lucide), trazo, tamaños consistentes.

---

## 5. Componentes (specs)

- **TopBar** — barra delgada con marca + autor.
- **Hero** — intro compacta (§1). CON value prop. NO viewport completo.
- **ObjetivoForm** + **PlazoInput** + **CLPInput** (reusar CLPInput/InfoTooltip/RatesGuideModal) — compacto, color aplicado, chips activos en **verde** (no negro), CTA **mango**.
- **ResultPanel**:
  - **ResultHeader** — una línea: pill de estado ("✓ Meta alcanzada" verde / "Te falta" alerta) + texto ("Llegas a '[objetivo]' en X · te sobran $Y") + **barra de progreso fina**. **Sin slab.**
  - **MetricCards** — 4: Monto final · Tu objetivo (✓/falta) · Total aportado (tu capital) · Rendimiento (verde, count-up).
  - **EvolucionTabla** — columnas Periodo · Saldo inicio · Interés · Aporte · Saldo final; toggle **Mensual / Trimestral / Anual**; filas en cascada.
  - **TipReactivo** — card cielo, **consejo accionable** (ver §6).
- **EmptyState** — panel derecho cuando no hay simulación (§3).
- **ProductFlipCards** — grilla full-width; frente: ícono + nombre + qué es en 1 línea + insignia de riesgo; dorso: top 3 instituciones (curado, referencial, con fecha) + fuente.
- **Footer / Disclaimer**.

---

## 6. Contenido y copy (español de Chile, tú)

- **Intro**: el copy del §1, textual.
- **Tip reactivo** (NO felicita — de eso se encarga el ResultHeader; el tip aconseja):
  - Sobra: "Te sobran $X. Si no los necesitas para [objetivo], en un fondo mutuo podrían seguir creciendo en vez de quedarse quietos en la cuenta."
  - Justo: "Justo llegas. Para tener un colchón, suma un par de meses de aporte."
  - Falta: "Te faltan $X. Sube el aporte a ~$Y o estira a Z meses para llegar."
  - (Si viene de `/api/tips`/Gemini: pasarle estado + monto y pedir UNA recomendación accionable, nunca una felicitación.)
- **Disclaimers**: "tasa ilustrativa · editable · no refleja tasas reales vigentes" · "montos en CLP" · "esto no es asesoría financiera" · top 3 "referencial · verifica en la web oficial".

---

## 7. Movimiento (con `prefers-reduced-motion` respetado)

count-up en cifras · cascada en filas de tabla · flip en product cards · barra de meta que se llena · **confetti** al alcanzar la meta. Todo se desactiva si el usuario tiene movimiento reducido (detalle que un buen front cuida).

---

## 8. Accesibilidad / pulido

- Contraste suficiente (texto tinta sobre crema/blanco; verde oscuro sobre tinte verde; CTA mango con texto blanco legible).
- Estados de foco visibles en inputs y botones.
- Navegable por teclado; labels asociados; `aria` en toggles y tabs.

---

## 9. QUITAR explícitamente (causaron la deriva anterior)

- El **hero de pantalla completa** → reemplazar por el hero compacto CON intro (§1).
- El **gráfico** "Tu ahorro en el tiempo".
- El **slab verde sólido** del resultado.
- **Todas** las clases grises/negras heredadas (`bg-gray-*`, `text-gray-*`, `border-gray-*`, negro) → paleta. Si algo sigue gris, quedó un componente sin migrar.

## 10. Intocables

`lib/calculations.ts` · `lib/products.ts` · `app/api/tips/route.ts` · `lib/formatters.ts`.

## 11. Ejecución

1. Implementar **todo el brief en una sola pasada**, integrado.
2. Al terminar, dejar la app corriendo en `localhost:3002` y avisar — sin pausas de aprobación intermedias.
3. **Pase 2** (commit aparte, después de revisar este): ilustraciones (Storyset / Humaaans / unDraw) + animaciones Lottie por categoría y por producto. No incluir ahora.
