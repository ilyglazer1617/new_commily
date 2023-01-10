import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/comments ">
              <a class="nav-link active" aria-current="page" href="#">
                comments
              </a>
            </Link>

            <Link to="/signIn">
              <a class="nav-link" href="#">
                log In
              </a>
            </Link>
            <Link to="/register">
              <a class="nav-link" href="#">
                register
              </a>
            </Link>
            <a
              onClick={() => {
                localStorage.removeItem("x-auth-token");
              }}
              class="nav-link bg-Danger "
              href="#"
            >
              sign out{" "}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
