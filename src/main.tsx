import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import '@/app/styles/global.css';
// quoin:inicio
if (import.meta.env.MODE === 'quoin') void import('@quoin/react/bridge');
// quoin:fin

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
