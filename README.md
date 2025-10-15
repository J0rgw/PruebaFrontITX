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

#### Tests
```bash
npm test
```
Ejecuta los tests del proyecto

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
- [ ] Implementar tests unitarios para componentes
- [ ] Tests de integración para servicios
- [ ] Tests E2E con Playwright o Cypress
- [ ] Cobertura de código mínima del 80%

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
- [ ] Mejoras de accesibilidad (a11y)

## Notas de Desarrollo

### Decisiones de Arquitectura

1. **Sistema de Caché**: Se eligió localStorage por su simplicidad y amplio soporte, adecuado para los requisitos del proyecto.

2. **Componentes Reutilizables**: Se crearon componentes genéricos (FadeContent, Actions) que pueden ser reutilizados en otros proyectos.

3. **CSS Modular**: Cada componente tiene su propio archivo CSS para mantener la separación de responsabilidades.

4. **Animaciones con GSAP**: Se eligió GSAP sobre CSS animations por su mayor control y capacidad de crear animaciones complejas.
