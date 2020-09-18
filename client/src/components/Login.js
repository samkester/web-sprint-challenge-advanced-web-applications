import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const defaultLogin = {
  username: "",
  password: "",
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(defaultLogin);
  const history = useHistory();

  const updateHandler = event => {
    setLogin({...login, [event.target.name]: event.target.value});
  }

  const submitHandler = event => {
    event.preventDefault();
    axiosWithAuth().post("login", login)
    .then(response => {
      console.log(response);
      localStorage.setItem("token", response.data.payload);
      history.push("/bubble")
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitHandler}>
        <label>
          Username
          <input name="username" value={login.username} onChange={updateHandler} />
        </label>
        <label>
          Password
          <input name="password" value={login.password} onChange={updateHandler} />
        </label>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
