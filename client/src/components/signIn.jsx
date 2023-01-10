import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const resulte = await axios.post("http://localhost:3050/api/auth", data);

    localStorage.setItem("x-auth-token", resulte.headers["x-auth-token"]);
    navigate("/comments");
  };

  return (
    <form
      onSubmit={(e) => {
        handelSubmit(e);
      }}
    >
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SignIn;
