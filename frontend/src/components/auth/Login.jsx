import React from "react";
import loginImage from "../../assets/images/login.png";
import googleIcon from "../../assets/images/google.png";
const Login = () => {
  return (
    <div className="h-screen">
      <div className="card lg:card-side bg-base-100 shadow-sm max-w-4xl flex items-center justify-center mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <figure className="w-1/2">
          <img src={loginImage} alt="Login" className="max-h-150" />
        </figure>
        <div className="card-body w-1/2">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
            <div className="divider">OR</div>
            <button className="btn btn-outline">
              <img src={googleIcon} alt="Google" className="h-5" />
              Google Login
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
