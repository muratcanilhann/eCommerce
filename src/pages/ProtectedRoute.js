import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ element,admin }) {
	const { loggedIn} = useAuth();
	return (
	
	

		loggedIn ? <Outlet /> : <Navigate to="/signin" />
		);
}

export default ProtectedRoute;