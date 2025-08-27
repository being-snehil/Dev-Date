import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice.jsx";
import { BASE_URL } from "../utils/constants.jsx";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { 
          firstName, 
          lastName, 
          emailId, 
          password,
          age: age ? Number(age) : undefined 
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-base-100 rounded-lg shadow-xl">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  {isLoginForm ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-base-content/70">
                  {isLoginForm 
                    ? "Sign in to continue to your account" 
                    : "Register to get started"}
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {!isLoginForm && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          className="input input-bordered w-full"
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          className="input input-bordered w-full"
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Age
                        <span className="text-base-content/50 text-xs ml-1">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        value={age}
                        min="18"
                        max="100"
                        className="input input-bordered w-full"
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="25"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailId}
                    className="input input-bordered w-full"
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    className="input input-bordered w-full"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  {isLoginForm && (
                    <div className="text-right mt-2">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Please wait...</span>
                  </>
                ) : (
                  isLoginForm ? "Sign In" : "Create Account"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-base-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-base-100 text-base-content/60">OR</span>
                </div>
              </div>

              {/* Toggle Form */}
              <div className="text-center">
                <p className="text-sm text-base-content/70">
                  {isLoginForm ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    className="ml-1 text-primary font-medium hover:underline"
                    onClick={() => {
                      setIsLoginForm((value) => !value);
                      setError("");
                    }}
                  >
                    {isLoginForm ? "Sign up now" : "Sign in instead"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;