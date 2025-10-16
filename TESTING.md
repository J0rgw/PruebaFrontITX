# Testing Setup - Frontend ITX

## Resumen

Sistema de testing completo implementado con enfoque pragmático en calidad de código y prevención de duplicación.

## Stack de Testing

### Tests Unitarios y de Integración
- **Vitest** - Test runner rápido y moderno
- **@testing-library/react** - Testing de componentes siguiendo buenas prácticas
- **@testing-library/user-event** - Simulación de interacciones de usuario
- **@testing-library/jest-dom** - Matchers adicionales para DOM
- **happy-dom** - Entorno DOM ligero para tests
- **MSW (Mock Service Worker)** - Mocking realista de APIs

### Tests E2E
- **Playwright** - Tests end-to-end del flujo completo de usuario

## Estructura de Tests

```
src/
├── services/
│   ├── api.js
│   ├── api.test.js           ← Tests de servicios de API
│   ├── cache.js
│   └── cache.test.js          ← Tests de sistema de caché
├── components/
│   ├── Actions/
│   │   ├── Actions.jsx
│   │   └── Actions.test.jsx   ← Tests de lógica de selección y carrito
│   └── Pagination/
│       ├── Pagination.jsx
│       └── Pagination.test.jsx ← Tests de lógica de paginación
├── test/
│   ├── setup.js              ← Configuración global de tests
│   └── mocks/
│       ├── handlers.js       ← Handlers de MSW para API
│       └── server.js         ← Servidor de MSW
e2e/
└── product-flow.spec.js      ← Tests E2E de flujos principales
```

## Scripts Disponibles

```bash
# Ejecutar tests en modo watch
npm test

# Ejecutar tests con UI interactiva
npm run test:ui

# Ejecutar tests una vez
npm run test:run

# Ejecutar tests con reporte de cobertura
npm run test:coverage

# Ejecutar tests E2E
npm run test:e2e

# Ejecutar tests E2E con UI
npm run test:e2e:ui
```

## Cobertura de Código

**Cobertura Actual: 85%**

- **Actions.jsx**: 90.69%
- **Pagination.jsx**: 100%
- **api.js (services)**: 89.36%
- **cache.js (services)**: 89.28%

### Umbrales Configurados
- Statements: 75%
- Functions: 75%
- Branches: 70%
- Lines: 75%

## Tests Implementados

### 1. Tests de Servicios (18 tests)

#### cacheService (7 tests)
- Almacenamiento de datos con timestamp
- Recuperación de datos no expirados
- Retorno de null para caché inexistente
- Eliminación de caché expirada (>1 hora)
- Manejo de JSON inválido
- Limpieza de caché específica
- Limpieza de toda la caché con prefijo

#### productService (4 tests)
- Obtención de productos desde API
- Uso de caché en segunda llamada
- Obtención de producto por ID
- Caché de producto individual

#### cartService (7 tests)
- Añadir producto al carrito
- Incremento de contador de carrito
- Inicio de contador en 1
- Manejo de errores de API
- Obtención de contador del carrito
- Actualización de contador
- Limpieza del carrito

### 2. Tests de Componentes (24 tests)

#### Actions Component (9 tests)
- Renderizado de opciones de almacenamiento y color
- Deshabilitación de botón sin selección
- Selección de opciones
- Llamada a API con parámetros correctos
- Dispatch de evento cartUpdated
- Mensaje de éxito
- Manejo de errores
- Mensaje sin opciones disponibles
- Habilitación de botón con selecciones

#### Pagination Component (15 tests)
- No renderizar con 1 página o menos
- Mostrar rango de items correctamente
- Cálculo correcto del último item
- Deshabilitación de botones en límites
- Callbacks de cambio de página
- Scroll al inicio al cambiar página
- Mostrar todas las páginas si son 5 o menos
- Mostrar elipsis con muchas páginas
- Mostrar primera y última página
- Destacar página actual
- No llamar onChange en elipsis
- No llamar onChange en página actual

### 3. Tests E2E (5 tests)

- Navegación de lista a detalles de producto
- Añadir producto al carrito con selecciones
- Visualización correcta de información de producto
- Manejo de paginación
- Carga de header y carrito

## Principios SOLID en Testing

### S - Single Responsibility Principle
Cada test tiene una única responsabilidad y verifica un comportamiento específico.

### O - Open/Closed Principle
Tests extensibles mediante factories y helpers reutilizables sin modificar existentes.

### L - Liskov Substitution Principle
Mocks (MSW) sustituyen dependencias reales sin romper contratos.

### I - Interface Segregation Principle
Tests solo importan y dependen de lo que necesitan.

### D - Dependency Inversion Principle
Componentes dependen de abstracciones (props, services inyectables).

## Configuración

### vitest.config.js
Configuración de Vitest con:
- Entorno happy-dom
- Setup automático
- Cobertura con v8
- Exclusión de archivos sin lógica de negocio

### playwright.config.js
Configuración de Playwright con:
- Browser Chromium
- Web server automático
- Screenshots en fallos
- Traces en reintentos

## MSW (Mock Service Worker)

Los tests utilizan MSW para interceptar y mockear llamadas a la API de forma realista:

- **GET /api/product** - Lista de productos
- **GET /api/product/:id** - Detalle de producto
- **POST /api/cart** - Añadir al carrito

## Notas

- Los tests se enfocan en **lógica de negocio** crítica
- Se evita testear detalles de implementación
- Los componentes de UI pura (sin lógica) no están testeados para evitar duplicación
- MSW permite tests de integración realistas sin servidor real
