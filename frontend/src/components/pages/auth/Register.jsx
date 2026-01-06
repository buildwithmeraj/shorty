import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";
import Error from "../../utilities/Error";
import registerImage from "../../../assets/images/register.png";
import googleIcon from "../../../assets/images/google.png";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Loading from "../../utilities/Loading";

const Register = () => {
  const {
    registerUsingEmail,
    signInUsingGoogle,
    setUser,
    user,
    firebaseErrors,
    updateUserProfile,
    authLoading,
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  if (user && user?.email) {
    navigate("/dashboard", { replace: true });
  }

  useEffect(() => {
    if (user && user.email) {
      navigate(location.state ? location.state : "/");
    }
  }, [user, location.state, navigate]);

  const [registerError, setRegisterError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const NameRegex = /([a-z\s]+)/i;

  const handleForm = (e) => {
    e.preventDefault();
    setRegisterError(null);
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirm_password = e.target.confirm_password.value;
    let displayName = e.target.name.value;
    if (!emailRegex.test(email)) {
      return setRegisterError("Please enter a valid email address");
    }
    if (!passRegex.test(password)) {
      return setRegisterError(
        "Password Must have at least one uppercase letter, one lowercase letter and at least 6 characters long"
      );
    }

    if (password !== confirm_password) {
      return setRegisterError("Passwords do not match");
    }

    if (!NameRegex.test(displayName)) {
      return setRegisterError("Please enter a valid name");
    }

    registerUsingEmail(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        updateUserProfile({ displayName });
        toast.success("Registration Successful");
        setInterval(() => {
          window.location.href = "/dashboard";
        }, 2000);
      })
      .catch((error) => {
        const errMsg = firebaseErrors.find(
          (err) => err.code === error.code
        ).message;
        setRegisterError(errMsg);
      });
  };
  const handleGoogleSignUp = () => {
    signInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Conneccted with Google, Redirecting to Homepage...");
        setInterval(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        const match = firebaseErrors.find((err) => err.code === error.code);
        const errMsg = match
          ? match.message
          : "Login failed. Please try again.";
        setRegisterError(errMsg);
      });
  };
  if (authLoading) return <Loading />;
  return (
    <div className="h-screen">
      <div className="card lg:card-side bg-base-200 shadow-sm min-w-75 max-w-4xl flex items-center justify-center mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <figure className="hidden lg:flex lg:w-1/2">
          <img src={registerImage} alt="Register" className="max-h-150" />
        </figure>
        <div className="card-body lg:w-1/2">
          <div className="flex justify-center">
            <h2 className="card-title">Register</h2>
          </div>
          {registerError && <Error message={registerError} />}
          <form onSubmit={handleForm}>
            <fieldset className="fieldset">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your Name"
                  name="name"
                />
              </div>
              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  name="password"
                />
                <span
                  className="absolute right-2 top-6 cursor-pointer text-2xl text-gray-600"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <TbEye size={28} /> : <TbEyeOff size={28} />}
                </span>
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  name="confirm_password"
                />
              </div>
              <button
                className="btn btn-info hover:btn-success mt-4"
                type="submit"
              >
                <FaUserPlus size={16} />
                Register
              </button>
              <div className="divider">OR</div>
              <div className="flex flex-col xl:flex-row items-center justify-between gap-2">
                <button
                  className="btn btn-block btn-outline xl:flex-1 "
                  type="button"
                  onClick={handleGoogleSignUp}
                >
                  <img src={googleIcon} alt="Google" className="h-3.5" />
                  Google Connect
                </button>
                <Link
                  to="/login"
                  className="btn btn-outline flex btn-block xl:flex-1 items-center gap-2"
                >
                  <FaSignInAlt size={16} />
                  Login
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
