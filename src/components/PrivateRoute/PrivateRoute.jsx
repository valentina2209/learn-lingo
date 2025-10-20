import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const { user, loadingAuth } = useAuth();
    if (loadingAuth) return null; // або loader
    return user ? children : <Navigate to="/" replace />;
}