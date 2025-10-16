# ITX Mobile Store - Aplicación de E-commerce con React

Aplicación web desarrollada en React para la compra de dispositivos móviles, construida como Single Page Application (SPA) que consume la API de ITX Frontend Test.

## Descripción del Proyecto

Mini-aplicación de e-commerce para comprar dispositivos móviles con funcionalidades completas de catálogo, búsqueda, detalles de productos y carrito de compras. Implementada con JavaScript ES6, React, y arquitectura de componentes reutilizables.

## Características Principales Implementadas

### Sistema de Caché Inteligente
- Implementación de caché en cliente con expiración de 1 hora
- Almacenamiento mediante localStorage
- Reducción significativa de llamadas al API
- Revalidación automática después de expiración

### Header Animado (CardNav Component)
- Header con gradiente animado usando GSAP
- Breadcrumbs dinámicos que muestran la navegación actual
- Contador de carrito con persistencia entre sesiones
- Animaciones suaves al añadir productos al carrito
- Diseño totalmente responsivo

### Product List Page (PLP)
- Búsqueda en tiempo real por marca y modelo
- Grid responsivo con máximo 4 elementos por fila
- Animaciones de aparición con FadeContent component
- Contador de resultados de búsqueda
- Estados de carga y error manejados elegantemente

### Product Details Page (PDP)
- Layout de dos columnas (imagen izquierda, info derecha)
- Especificaciones completas del producto:
  - Marca, Modelo, Precio
  - CPU, RAM, Sistema Operativo
  - Resolución de pantalla, Batería
  - Cámaras (principal y frontal)
  - Dimensiones y Peso
- Selectores de almacenamiento y color
- Botón de añadir al carrito funcional

### Funcionalidad de Carrito
- Integración completa con API POST /api/cart
- Persistencia del contador en localStorage
- Actualización en tiempo real del contador en header
- Feedback visual al añadir productos
- Validación de selecciones requeridas

## Arquitectura del Proyecto

### Componentes Principales

#### CardNav (Header)
- **Ubicación**: `src/components/CardNav/`
- **Funcionalidad**: Header principal de la aplicación
- Logo con navegación a home
- Breadcrumbs dinámicos
- Contador de carrito persistente
- Animaciones con GSAP

#### FadeContent
- **Ubicación**: `src/components/FadeContent/`
- **Funcionalidad**: Componente de animación reutilizable
- Efectos de fade-in suaves
- Animaciones staggered para listas

#### Actions
- **Ubicación**: `src/components/Actions/`
- **Funcionalidad**: Configuración y compra de productos
- Selectores de almacenamiento
- Selectores de color
- Botón de añadir al carrito

### Vistas (Microfrontends)

#### ListView
- **Ubicación**: `src/microfrontends/list-view/`
- Grid responsivo de productos
- Barra de búsqueda en tiempo real
- Animaciones de aparición
- Contador de resultados

#### DetailsView
- **Ubicación**: `src/microfrontends/details-view/`
- Layout de dos columnas
- Especificaciones completas
- Integración con Actions component
- Link de regreso a la lista

## Estructura de Archivos

```
src/
├── components/
│   ├── CardNav/
│   │   ├── CardNav.jsx
│   │   └── CardNav.css
│   ├── FadeContent/
│   │   ├── FadeContent.jsx
│   │   └── FadeContent.css
│   └── Actions/
│       ├── Actions.jsx
│       └── Actions.css
├── microfrontends/
│   ├── list-view/
│   │   ├── ListView.jsx
│   │   └── ListView.css
│   └── details-view/
│       ├── DetailsView.jsx
│       └── DetailsView.css
├── services/
│   ├── api.js
│   └── cache.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Servicios

### API Service (`src/services/api.js`)

**Base URL**: `https://itx-frontend-test.onrender.com/api`

#### productService
- `getAllProducts()`: Obtiene todos los productos con caché
- `getProductById(id)`: Obtiene un producto específico con caché

#### cartService
- `addToCart(id, colorCode, storageCode)`: Añade producto al carrito
- `getCartCount()`: Obtiene contador del carrito
- `setCartCount(count)`: Actualiza contador del carrito

### Cache Service (`src/services/cache.js`)

Sistema de caché inteligente con las siguientes funciones:
- `set(key, data)`: Almacena datos con timestamp
- `get(key)`: Recupera datos si no han expirado
- `clear(key)`: Elimina un item específico del caché
- `clearAll()`: Limpia todo el caché

**Tiempo de expiración**: 1 hora desde la última petición

## Estructura de Datos de Productos

Cada producto contiene:
- `id`: Identificador unico
- `brand`: Marca del producto
- `model`: Modelo del dispositivo
- `price`: Precio (puede estar vacio)
- `imgUrl`: URL de la imagen del producto

## Tecnologías Utilizadas

### Core
- **React** 19.1.1 - Biblioteca de UI
- **React Router DOM** 7.9.4 - Enrutamiento SPA
- **Vite** 7.1.7 - Build tool y dev server
- **JavaScript ES6+** - Lenguaje de programación

### Animaciones
- **GSAP** 3.13.0 - Animaciones suaves y profesionales

### Iconos
- **React Icons** 5.5.0 - Librería de iconos

### Desarrollo
- **ESLint** 9.36.0 - Linter de código
- **@vitejs/plugin-react-swc** - Compilación rápida con SWC

## Instalación y Ejecución

### Instalación de Dependencias

```bash
npm install
```

### Scripts Disponibles

#### Modo Desarrollo
```bash
npm start
# o
npm run dev
```
La aplicación se ejecutará en `http://localhost:5173/`

#### Build para Producción
```bash
npm run build
```
Genera una build optimizada en la carpeta `dist/`

#### Linting
```bash
npm run lint
```
Ejecuta ESLint para verificar la calidad del código

#### Preview de Build
```bash
npm run preview
```
Previsualiza la build de producción localmente

## Rutas

- `/` - Vista de lista de productos
- `/product/:id` - Vista de detalles de un producto especifico

## Características Técnicas Destacadas

### Sistema de Caché
- Implementación con localStorage
- Expiración automática de 1 hora
- Reducción de llamadas al API
- Mejora de rendimiento y experiencia de usuario

### Animaciones
- Animaciones suaves con GSAP
- FadeContent component reutilizable
- Animaciones staggered en listas de productos
- Feedback visual en interacciones

### Persistencia de Datos
- Contador de carrito persistente entre sesiones
- Sistema de caché robusto
- Manejo de eventos custom para sincronización

### Diseño Responsivo
- Grid adaptativo (máximo 4 columnas)
- Breakpoints para tablets y móviles
- Diseño mobile-first
- Componentes optimizados para todas las resoluciones

### Manejo de Estados
- Estados de carga elegantes
- Manejo de errores
- Feedback visual inmediato
- Validaciones de formularios

## API Endpoints

### POST /api/cart
Añade un producto al carrito

**Request Body:**
```json
{
  "id": "0001",
  "colorCode": 1,
  "storageCode": 1
}
```

**Response:**
```json
{
  "count": 1
}
```
Siempre responde con un 1 se agregue el producto que se agregue, no se pide pero he agregado que el contador se obtiene de localStorage y se incrementa segun el numero de productos que se tienen agregados en el carrito, para borrar usar en consola
```
localStorage.removeItem('cart_count')
```
## Próximas Mejoras

### Testing
- [X] Implementar tests unitarios para componentes
- [X] Tests de integración para servicios
- [X] Tests E2E con Playwright
- [X] Cobertura de código del 85% (supera el mínimo del 80%)

**Detalles**: Ver [TESTING.md](./TESTING.md) para documentación completa del sistema de testing.

### Funcionalidades Adicionales
- [ ] Página de carrito completa con gestión de productos
- [ ] Ordenamiento de productos
- [X] Limitar carga a 16 cards primero y agregar paginacion
- [ ] Implementar reactbits? cardnav al menos
- [ ] Mejor estilo que gradiante morado
- [X] Numero carrito no sube????

### Mejoras Técnicas
- [ ] Size de las imagenes y render
- [ ] Internacionalización (i18n)
- [ ] Dark mode
- [X] Mejoras de accesibilidad (a11y)

## Accesibilidad (WCAG 2.2)

La aplicación ha sido desarrollada siguiendo los estándares WCAG 2.2 (niveles A, AA, y algunas características AAA) para garantizar que sea usable por personas con diversas capacidades.

### Implementaciones de Accesibilidad

#### Estructura Semántica HTML5
- Uso de elementos semánticos: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<figure>`, `<fieldset>`, `<legend>`, `<output>`
- Jerarquía de encabezados lógica (h1 → h2)
- Listas de definición (`<dl>`, `<dt>`, `<dd>`) para especificaciones de productos
- Navegación breadcrumb con `<ol>` y `<li>`

#### ARIA (Accessible Rich Internet Applications)
- **Landmarks**: `role="banner"`, `role="navigation"`, `role="search"`, `role="status"`
- **Estados dinámicos**: `aria-current="page"`, `aria-pressed`, `aria-atomic="true"`
- **Etiquetas descriptivas**: `aria-label`, `aria-labelledby`, `aria-describedby`
- **Regiones en vivo**: `aria-live="polite"` para actualizaciones dinámicas (carrito, búsqueda)
- **Iconos decorativos**: `aria-hidden="true"` en iconos que no aportan información adicional

#### Texto Alternativo
- Todas las imágenes de productos con atributos `alt` descriptivos
- Formato: "Marca Modelo" para imágenes de productos
- Iconos decorativos marcados con `aria-hidden="true"`

#### Contraste de Color (WCAG AA)
Todos los colores cumplen con los requisitos mínimos de contraste:
- Texto normal: 4.5:1 mínimo
- Texto grande: 3.1 mínimo
- Elementos de interfaz: 3:1 mínimo

| Color | Contraste en blanco | Nivel WCAG | Uso |
|-------|---------------------|------------|-----|
| #333 | 12.63:1 | AAA | Títulos principales |
| #555 | 8.59:1 | AAA | Texto secundario |
| #666 | 5.74:1 | AA | Texto terciario |
| #757575 | 4.61:1 | AA | Texto auxiliar |
| #667eea | 4.63:1 | AA | Enlaces, precios |

#### Navegación por Teclado
- Todos los elementos interactivos accesibles con Tab
- Indicadores de foco visibles con `:focus-visible`
- Estilo de foco consistente: `outline: 3px solid #667eea; outline-offset: 2px`
- Sin trampas de teclado
- Orden de tabulación lógico

#### Formularios Accesibles
- `<fieldset>` y `<legend>` para grupos de opciones
- Estados de botones comunicados con `aria-pressed`
- Etiquetas descriptivas en selectores de almacenamiento y color
- Validación con mensajes claros en español
- Feedback inmediato con `aria-live`

#### Lectores de Pantalla
- Contenido "solo para lectores de pantalla" con clase `.sr-only`
- Anuncios de estado para:
  - Actualizaciones del carrito
  - Resultados de búsqueda
  - Cambios de página en paginación
  - Feedback de acciones (producto añadido)
- Etiquetas descriptivas en todos los enlaces y botones

#### Componentes Accesibles

**Header:**
- `role="banner"` en header principal
- Breadcrumbs con navegación semántica
- `<output>` para contador del carrito
- `aria-current="page"` en breadcrumb actual

**ListView:**
- `<main>` con `id="main-content"`
- `role="search"` en contenedor de búsqueda
- Anuncio de resultados con `aria-live`
- Grid de productos como `<section>` con `aria-label`
- Tarjetas de producto como `<article>`

**DetailsView:**
- Especificaciones con `<dl>`, `<dt>`, `<dd>`
- `<figure>` para imagen del producto
- Navegación clara de regreso

**Actions:**
- Selectores con `<fieldset>` y `<legend>`
- Estados dinámicos en botones
- Feedback de éxito/error

**Pagination:**
- `<nav>` con `aria-label`
- `aria-current="page"` en página actual
- Estados deshabilitados claros

### Pruebas de Accesibilidad

Se recomienda probar con:
- **NVDA** (Windows) / **VoiceOver** (macOS)
- **Navegación por teclado** (Tab, Shift+Tab, Enter, Space)
- **axe DevTools** / **WAVE** para auditorías automáticas
- **Lighthouse** (Chrome DevTools)

### Recursos
Para más detalles sobre la implementación de accesibilidad, consulta la documentación interna del equipo.

## Notas de Desarrollo

### Decisiones de Arquitectura

1. **Sistema de Caché**: Se eligió localStorage por su simplicidad y amplio soporte, adecuado para los requisitos del proyecto.

2. **Componentes Reutilizables**: Se crearon componentes genéricos (FadeContent, Actions) que pueden ser reutilizados en otros proyectos.

3. **CSS Modular**: Cada componente tiene su propio archivo CSS para mantener la separación de responsabilidades.

4. **Animaciones con GSAP**: Se eligió GSAP sobre CSS animations por su mayor control y capacidad de crear animaciones complejas.
