import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

// App.jsx stays intentionally tiny — all routing logic lives in
// src/routes/AppRoutes.jsx, and all UI lives in pages/components/layouts.
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
