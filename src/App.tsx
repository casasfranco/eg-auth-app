import React from 'react';
import { Route, Routes } from 'react-router';

import './App.css';
import { Auth } from './pages';
import ProtectedRoute from './lib/helpers/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <p>Welcome to the application.</p>
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <ProtectedRoute inverse>
            <Auth />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <div>
            <p>404 not found</p>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
