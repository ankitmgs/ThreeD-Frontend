import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/userAuthContext";

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // React.useEffect(() => {
  //   if (sessionStorage.getItem("user")) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const handleLogin = () => {
  //   // sessionStorage.setItem("user", true);
  //   // setIsLoggedIn(true);
  //   if (sessionStorage.getItem("user")) {
  //     setIsLoggedIn(true);
  //   }
  // };

  // const handleLogout = () => {
  //   sessionStorage.removeItem("user");
  //   setIsLoggedIn(false);
  // };

  const { isAuthenticated, handleLogin, handleLogout } =
    useContext(AuthContext);

  console.log(isAuthenticated);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink to="/">
            <i
              className="fa-brands fa-unity fa-2x mx-3"
              style={{ color: "black" }}
            ></i>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {isAuthenticated ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"></li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/addmodal">
                    Publish
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/listmodal">
                    Modals
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manage">
                    Manage
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"></li>
           
                <li className="nav-item">
                  <NavLink className="nav-link" to="/listmodal">
                    Modals
                  </NavLink>
                </li>
                
              </ul>
            )}

            {/* <div>
              {isLoggedIn ? (
                <>
                  <span>Welcome, you are logged in!</span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <span>Please log in to continue.</span>
                  <button onClick={handleLogin}>Login</button>
                </>
              )}
            </div> */}

            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger px-3 me-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <button
                      onClick={handleLogin}
                      type="button"
                      className="btn btn-link px-3 me-2"
                    >
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup" style={{ color: "white" }}>
                    <button type="button" className="btn btn-primary me-3">
                      Signup
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
