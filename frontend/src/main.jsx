import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';
import './styles/global.css';
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
