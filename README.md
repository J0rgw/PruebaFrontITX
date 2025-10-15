# Aplicacion Web con Microfrontends en React

Este proyecto es una aplicacion web desarrollada en React que utiliza una arquitectura de microfrontends para mostrar productos obtenidos de una API externa.

## Descripcion del Proyecto

Aplicacion de catalogo de productos que consume la API https://itx-frontend-test.onrender.com/ y muestra la informacion de manera estructurada mediante microfrontends independientes.

## Arquitectura

El proyecto esta organizado en 3 microfrontends principales:

### 1. Header
- Ubicacion: `src/microfrontends/header/Header.jsx`
- Funcionalidad: Barra de navegacion principal
- Proporciona enlaces de navegacion entre vistas

### 2. ListView
- Ubicacion: `src/microfrontends/list-view/ListView.jsx`
- Funcionalidad: Vista de lista de productos
- Muestra todos los productos en formato grid
- Cada producto muestra: imagen, marca, modelo y precio
- Navegacion a vista de detalles al hacer clic

### 3. DetailsView
- Ubicacion: `src/microfrontends/details-view/DetailsView.jsx`
- Funcionalidad: Vista detallada de un producto
- Muestra informacion completa del producto seleccionado
- Incluye boton de regreso a la lista

## Estructura de Archivos

```
src/
  microfrontends/
    header/
      Header.jsx
    list-view/
      ListView.jsx
    details-view/
      DetailsView.jsx
  services/
    api.js
  App.jsx
  App.css
  main.jsx
```

## Servicio API

- Ubicacion: `src/services/api.js`
- Endpoint utilizado: `GET /api/product`
- Funciones disponibles:
  - `getAllProducts()`: Obtiene todos los productos
  - `getProductById(id)`: Obtiene un producto especifico por ID

## Estructura de Datos de Productos

Cada producto contiene:
- `id`: Identificador unico
- `brand`: Marca del producto
- `model`: Modelo del dispositivo
- `price`: Precio (puede estar vacio)
- `imgUrl`: URL de la imagen del producto

## Tecnologias Utilizadas

- React 19.1.1
- React Router DOM 7.9.4
- Vite 7.1.7
- JavaScript (ES6+)

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm run dev
```

La aplicacion se ejecutara en `http://localhost:5174/` (o siguiente puerto disponible)

## Rutas

- `/` - Vista de lista de productos
- `/product/:id` - Vista de detalles de un producto especifico

## Caracteristicas

- Arquitectura de microfrontends independientes
- Consumo de API externa
- Navegacion mediante React Router
- Diseno responsivo basico
- Estados de carga y error manejados
- Sin dependencias de estilos complejos (diseno rudimentario para prueba funcional)

## Pendiente

### Funcionalidades por Implementar

#### Vista de Lista (ListView)
- Barra de busqueda en tiempo real para filtrar por marca y modelo
- Layout responsivo con maximo 4 elementos por fila adaptativo segun resolucion
- Animacion de aparicion de tarjetas usando FadeContent de reactbits

#### Header
- Implementar breadcrumbs mostrando pagina actual con links de navegacion
- Agregar contador de items en el carrito (parte derecha)
- Implementar componente CardNav de reactbits para el diseno del header
- Titulo/icono que actue como enlace a vista principal

#### Vista de Detalles (DetailsView)
- Usar endpoint individual GET /api/product/:id en lugar de filtrar del listado completo
- Agregar informacion detallada completa:
  - CPU
  - RAM
  - Sistema Operativo
  - Resolucion de pantalla
  - Bateria
  - Camaras
  - Dimensiones
  - Peso
- Layout en dos columnas (imagen a la izquierda, detalles y acciones a la derecha)
- Implementar selectores de almacenamiento (storageCode)
- Implementar selectores de colores (colorCode)
- Boton "Anadir al carrito" con funcionalidad completa

#### API y Servicios
- Implementar endpoint POST /api/cart para anadir productos al carrito
- Actualizar servicio getProductById para usar GET /api/product/:id directamente
- Sistema de cache con expiracion de 1 hora:
  - Almacenar informacion del API en cliente
  - Tiempo de expiracion: 1 hora desde ultima peticion
  - Revalidar informacion despues de 1 hora
  - Opciones: localStorage, sessionStorage, IndexedDB o memoria
- Persistencia del contador del carrito entre recargas de pagina

#### Scripts y Configuracion
- Actualizar package.json con script start para modo desarrollo
- Agregar script test para lanzamiento de tests
- Script lint ya configurado

#### Testing
- Implementar tests para componentes
- Tests para servicios de API
- Tests para funcionalidades de cache
- Tests para funcionalidad del carrito

#### Mejoras de UI/UX
- Implementar diseno visual detallado siguiendo estructura definida
- Mejorar estilos y presentacion de componentes
- Asegurar responsividad completa en todas las vistas

#### Documentacion y Repositorio
- Organizar commits evolutivos por hitos
- Documentar decisiones de arquitectura y diseno
- Agregar notas explicativas sobre implementaciones especificas
