import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { UserPage } from './pages/UserPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
