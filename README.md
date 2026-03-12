<h1 align="center">👗 Re-Wear Swap - Frontend</h1>

## 📖 Sobre el Proyecto

**Re-Wear Swap** es una aplicación web de intercambio de ropa de segunda mano basada en un sistema de puntos. Los usuarios pueden publicar prendas que ya no usan, explorar el catálogo de otros usuarios y reservar artículos para intercambiar.

El proyecto fue desarrollado como parte del bootcamp **FemCoders P8 Barcelona 2025**, siguiendo un flujo de trabajo profesional con **Atomic Design**, **React Context** para gestión de estado y **integración con API REST**.

La aplicación se comunica con un backend en Spring Boot ([ver repositorio Backend](https://github.com/Re-Wear-Swap/Backend)) que gestiona usuarios, artículos y reservas.

### 🎯 Objetivos del Proyecto

- Construir una SPA completa con React y React Router
- Consumir una API REST con Axios y manejo de errores
- Implementar autenticación de usuarios con persistencia en localStorage
- Diseñar la interfaz siguiendo la metodología Atomic Design
- Gestionar estado global con React Context
- Aplicar Gitflow y metodologías Agile

---

## ✨ Funcionalidades Principales

- 👤 **Registro e inicio de sesión** con subida de avatar personalizado
- 📦 **Catálogo de artículos** con filtros por categoría, estado y fecha
- 📸 **Publicar artículos** con subida de imagen y formulario completo
- 🔄 **Sistema de reservas e intercambios** con puntos
- ⭐ **Sistema de puntos** — cada usuario empieza con 3 puntos, reservar cuesta 1, confirmar intercambio otorga 1
- 👤 **Perfil de usuario** con pestañas para artículos propios, reservas y actividad
- 🌗 **Tema claro / oscuro** con ThemeContext
- 🔒 **Rutas protegidas** — acceso restringido a usuarios autenticados
- ✏️ **Edición y eliminación** de artículos propios
- ⏰ **Expiración automática** de reservas a las 24 horas

---

## 🛠️ Tecnologías Utilizadas

| Tecnología               | Uso                                            |
| ------------------------ | ---------------------------------------------- |
| React 19                 | Librería UI, componentes funcionales y hooks   |
| React Router DOM 7       | Enrutamiento SPA con rutas públicas y privadas |
| Axios                    | Cliente HTTP para comunicación con la API      |
| Vite 7                   | Bundler y servidor de desarrollo               |
| Vitest + Testing Library | Tests unitarios y de componentes               |
| CSS3                     | Estilos personalizados (sin frameworks CSS)    |
| ESLint                   | Calidad y consistencia del código              |
| Git & GitHub             | Control de versiones con Gitflow               |

---

## 📁 Estructura del Proyecto

```
src/
│
├── assets/                  # Imágenes y archivos estáticos
│   └── IMG/
│
├── components/
│   ├── atoms/               # Button, Avatar, Badge, Icon, InputField,
│   │                          SelectField, FilterChip, StatusDot, TabItem...
│   ├── molecules/           # CatalogCard, ImageUploader, AvatarUploader,
│   │                          ProfileHeader, ClothingCard...
│   ├── organisms/           # ArticleForm, CatalogFilters, CatalogGrid,
│   │                          ProfileTabs, BottomNav, BottomFooter...
│   ├── pages/               # HomePage, LoginPage, RegisterPage, CatalogPage,
│   │                          UploadPage, ArticleDetailPage, EditArticlePage,
│   │                          ProfilePage
│   └── templates/           # Layouts reutilizables
│
├── context/                 # Gestión de estado global
│   ├── UserContext.jsx        → Autenticación y datos de usuario
│   ├── ArticlesContext.jsx    → Artículos, filtros y reservas
│   ├── ThemeContext.jsx       → Tema claro/oscuro
│   ├── useArticles.js         → Hook personalizado
│   └── useTheme.js            → Hook personalizado
│
├── services/                # Comunicación con la API
│   ├── api.js                 → Instancia de Axios configurada
│   ├── articlesService.js     → CRUD de artículos
│   ├── reservationsService.js → Gestión de reservas e intercambios
│   └── imageService.js        → Subida de imágenes
│
├── App.jsx                  # Definición de rutas
├── main.jsx                 # Punto de entrada (providers)
└── index.css                # Estilos globales
```

> La arquitectura de componentes sigue el patrón **Atomic Design** (atoms → molecules → organisms → templates → pages).

---

## 🚀 Instalación y Uso

### Requisitos previos

- **Node.js 18** o superior
- **npm 9** o superior
- El **Backend** corriendo en `http://localhost:8080` ([ver repositorio Backend](https://github.com/Re-Wear-Swap/Backend))

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Re-Wear-Swap/Frontend.git
cd Frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Arrancar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 📜 Scripts Disponibles

| Comando           | Descripción                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con hot reload   |
| `npm run build`   | Compilar para producción                |
| `npm run preview` | Previsualizar build de producción       |
| `npm run lint`    | Verificar calidad del código con ESLint |

---

## 🗺️ Rutas de la Aplicación

| Ruta           | Página                | Acceso     |
| -------------- | --------------------- | ---------- |
| `/`            | Home                  | 🌐 Pública |
| `/login`       | Inicio de sesión      | 🌐 Pública |
| `/register`    | Registro              | 🌐 Pública |
| `/catalog`     | Catálogo de artículos | 🔒 Privada |
| `/upload`      | Publicar artículo     | 🔒 Privada |
| `/article/:id` | Detalle de artículo   | 🔒 Privada |
| `/edit/:id`    | Editar artículo       | 🔒 Privada |
| `/profile`     | Perfil de usuario     | 🔒 Privada |

---

## 🔗 Conexión con el Backend

El frontend se comunica con la API REST a través de **Axios**. La URL base es `http://localhost:8080/api`.

| Servicio                 | Descripción                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `articlesService.js`     | CRUD de artículos (crear, listar, editar, eliminar, cambiar estado) |
| `reservationsService.js` | Crear reserva, cancelar reserva, confirmar intercambio              |
| `imageService.js`        | Subida de imágenes para artículos y avatares                        |

---

## 🎨 Diseño y Arquitectura

La interfaz sigue la metodología **Atomic Design**:

### Atoms

- Button, Avatar, Badge, Icon
- InputField, SelectField, TextAreaField
- FilterChip, StatusDot, TabItem

### Molecules

- CatalogCard, ClothingCard
- ImageUploader, AvatarUploader
- ProfileHeader

### Organisms

- ArticleForm, CatalogFilters, CatalogGrid
- ProfileTabs, BottomNav, BottomFooter

### Templates

- Layouts reutilizables con navegación

### Pages

- HomePage, LoginPage, RegisterPage
- CatalogPage, UploadPage, ArticleDetailPage
- EditArticlePage, ProfilePage

---

## 👩‍💻 Equipo

| Desarrolladora              | GitHub                                                   | LinkedIn                                                         |
| --------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| **Marie-Charlotte Doulcet** | [@Charlottedoulcet](https://github.com/Charlottedoulcet) | [LinkedIn](https://www.linkedin.com/in/marie-charlotte-doulcet/) |
| **Maria Eva Martin**        | [@Eva-87](https://github.com/Eva-87)                     | [LinkedIn](https://www.linkedin.com/in/maria-eva-martin/)        |
| **Anna Costa**              | [@annahico](https://github.com/annahico)                 | [LinkedIn](https://www.linkedin.com/in/annahico/)                |
| **Jen Ceballos**            | [@jenCeballos](https://github.com/JenCeballos)           | [LinkedIn](https://www.linkedin.com/in/jen-ceballos/)            |

> 💜 Proyecto desarrollado durante el **FemCoders P8 Barcelona Bootcamp 2025**

---

## 🌱 Posibles Mejoras Futuras

- 📱 Diseño responsive completo para móvil y tablet
- 🔔 Sistema de notificaciones en tiempo real
- 💬 Chat entre usuarios para coordinar intercambios
- 🗺️ Geolocalización para filtrar artículos cercanos
- 🔍 Buscador de artículos por texto
- 📊 Dashboard de estadísticas de intercambios
- 🧪 Ampliar cobertura de tests

---
