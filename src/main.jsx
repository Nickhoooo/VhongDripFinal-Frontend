import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './Context/CartContext.jsx';

//dto yung main pinaka root ng system(frontend)

const root = createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
      <StrictMode>
          <App />
      </StrictMode>
  </CartProvider>
 
);
