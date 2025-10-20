import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import TeachersList from './pages/Teachers/Teachers';
import FavoritesPage from './pages/Favorites/Favorites';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teachers" element={<TeachersList />} />
      <Route path="/favorites" element={
        <PrivateRoute>
          <FavoritesPage />
        </PrivateRoute>
      } />
    </Routes>
  )
}
export default App;





