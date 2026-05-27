# Spartan Elite GYM — Sistema de Gestión

Aplicación web completa para la gestión de un gimnasio. Incluye landing page pública y panel administrativo con CRUD de todos los módulos.

## 🚀 Demo en producción

> [Reemplaza con tu URL de Vercel/Netlify]

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| react-router-dom v6 | Enrutamiento con createBrowserRouter |
| Tailwind CSS v3 | Estilos |
| SweetAlert2 | Alertas y confirmaciones |
| Axios | Peticiones HTTP |
| JSON Server | API REST simulada |
| LocalStorage | Persistencia de sesión |

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── CrudPage.jsx        ← componente genérico reutilizable
│   ├── Modal.jsx
│   ├── ProtectedRoute.jsx
│   └── Spinner.jsx
├── hooks/
│   └── useCrud.js          ← hook genérico con lógica CRUD
├── layouts/
│   └── AdminLayout.jsx     ← sidebar + navbar admin
├── pages/
│   ├── public/
│   │   ├── LandingPage.jsx
│   │   └── LoginPage.jsx
│   └── admin/
│       ├── DashboardPage.jsx
│       ├── SociosPage.jsx
│       ├── MembresiasPage.jsx
│       ├── PagosPage.jsx
│       ├── EntrenadoresPage.jsx
│       ├── ClasesPage.jsx
│       └── EquiposPage.jsx
├── services/
│   ├── api.js              ← configuración centralizada axios
│   └── services.js         ← servicios por módulo
└── utils/
    ├── auth.js
    └── helpers.js
```

## ⚙️ Instalación local

### 1. Clonar e instalar
```bash
git clone https://github.com/TU_USUARIO/spartan-elite.git
cd spartan-elite
npm install
```

### 2. Instalar JSON Server
```bash
npm install -g json-server
```

### 3. Correr la API (Terminal 1)
```bash
json-server --watch db.json --port 3005
```

### 4. Correr la app (Terminal 2)
```bash
npm run dev
```

## 🔐 Acceso al panel

- URL: `http://localhost:5173/login`
- Usuario: cualquier nombre
- Contraseña: cualquier valor (es simulación)

## 📋 Módulos del panel admin

| Módulo | Ruta |
|---|---|
| Dashboard | /admin/dashboard |
| Socios | /admin/socios |
| Membresías | /admin/membresias |
| Pagos | /admin/pagos |
| Entrenadores | /admin/entrenadores |
| Clases | /admin/clases |
| Equipos | /admin/equipos |

## 🌿 GitFlow

```
main → develop → feature/landing-page
                → feature/auth-system
                → feature/socios-crud
                → feature/membresias-crud
                → feature/pagos-crud
                → feature/entrenadores-crud
                → feature/clases-crud
                → feature/equipos-crud
                → feature/dashboard-stats
```

## 👤 Autores
Thomas Rodriguez Londoño
Julian Molina
Juan Jose Molina
