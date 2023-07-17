import { Navigate } from "react-router-dom";

  
  export const ProtectedRoute = ({ children }) => {
    const { token } =  false;
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };