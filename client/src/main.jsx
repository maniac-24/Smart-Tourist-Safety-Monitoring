import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OfficerTouristRegistration from "./components/OffisirRgister.jsx"
import { ProtectRoute, AuthenticatedUserRoute } from "./utils/userAuthenticated.jsx"
import DashboardPage from './pages/DashboardPage.jsx'
import IssuesDashboard from './pages/IssuesDashboard.jsx'
import FeedBack from './components/FeedBack.jsx'
import KashmirDetailPage from './components/GiveFeedBack.jsx'
import TourGuideForm from './pages/TourGuideForm.jsx'
import Conversion from './pages/Conversion.jsx'
import UserNameContextProvider from './contexts/usenamcontext.jsx'
import PoliceDashboard from './pages/PoliceDashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthenticatedUserRoute>
            <LoginPage />
          </AuthenticatedUserRoute>
        )
      },
      {
        path: "/admin",
        element: <OfficerTouristRegistration />
      },
      {
        path: "/dashboard",
        element: (
          <ProtectRoute>
            <DashboardPage />
          </ProtectRoute>
        )
      },
      {
        path: "/allturist",
        element: <IssuesDashboard />
      },
      {
        path: "/feedback",
        element: <FeedBack />
      },
      {
        path: "/feedback/:id",
        element: <KashmirDetailPage />
      },
      {
        path: "/tourguide",
        element: <TourGuideForm />
      },
      {
        path: "/conversion",
        element: <Conversion />
      },
      {
        path: "/police",
        element: <PoliceDashboard />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserNameContextProvider>
      <RouterProvider router={router} />
    </UserNameContextProvider>
  </StrictMode>
)