import React, { useState } from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const UserAuth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  if (currentUser !== null) {
    return children;
  } else {
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "You need to login first !",
    });
    return <Navigate to="/login" />;
  }
};


export default UserAuth;