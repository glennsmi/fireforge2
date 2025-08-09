import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Shell from './pages/Shell';
import Login from './pages/Login';
import { ChartsPage, DashboardsPage, HomePage, OrganizationPage, ProfilePage, SourcesPage } from './pages';

export default function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Shell />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: 'charts', element: <ChartsPage /> },
        { path: 'dashboards', element: <DashboardsPage /> },
        { path: 'sources', element: <SourcesPage /> },
        { path: 'organization', element: <OrganizationPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}


