import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Shell from './pages/Shell';
import Login from './pages/Login';
import { ChartsPage, DashboardsPage, HomePage, OrganizationPage, ProfilePage, SourcesPage } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Shell />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="charts" element={<ChartsPage />} />
            <Route path="dashboards" element={<DashboardsPage />} />
            <Route path="sources" element={<SourcesPage />} />
            <Route path="organization" element={<OrganizationPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


