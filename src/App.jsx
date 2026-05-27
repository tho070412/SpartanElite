import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import AdminLayout from './layouts/AdminLayout'
import DashboardPage from './pages/admin/DashboardPage'
import SociosPage from './pages/admin/SociosPage'
import MembresiasPage from './pages/admin/MembresiasPage'
import PagosPage from './pages/admin/PagosPage'
import EntrenadoresPage from './pages/admin/EntrenadoresPage'
import ClasesPage from './pages/admin/ClasesPage'
import EquiposPage from './pages/admin/EquiposPage'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'socios', element: <SociosPage /> },
      { path: 'membresias', element: <MembresiasPage /> },
      { path: 'pagos', element: <PagosPage /> },
      { path: 'entrenadores', element: <EntrenadoresPage /> },
      { path: 'clases', element: <ClasesPage /> },
      { path: 'equipos', element: <EquiposPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
