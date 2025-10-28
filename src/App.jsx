import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import Home from './pages/Home/Home';
import TeachersList from './pages/Teachers/Teachers';
import FavoritesPage from './pages/Favorites/Favorites';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<TeachersList />} />
        <Route
          path="/favorites"
          element={<PrivateRoute component={FavoritesPage} redirectTo="/" />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
    </>
  )
}






