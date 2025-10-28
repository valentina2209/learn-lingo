import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

export default function PrivateRoute({ component: Component, redirectTo = "/" }) {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />
    }

    const shouldRedirect = !isLoggedIn;

    return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;

}