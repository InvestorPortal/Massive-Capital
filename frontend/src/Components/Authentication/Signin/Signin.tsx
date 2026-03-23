import {
  ArrowRight,
  CheckCircle,
  CircleAlert,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signin.css";
import poweredBy from "../../../assets/images/poweredby.svg"

const Signin = () => {
  document.title = "Investor Portal | Signin";

  const BASE_URL =
    import.meta.env.VITE_BASE_URL ?? "http://localhost:5003/api/v1";
  const navigate = useNavigate();
  const location = useLocation();
  const resetSuccess = (location.state as { resetSuccess?: boolean } | null)
    ?.resetSuccess;
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  //   const [isUser, setIsUser] = useState({});
  const [isError, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const passwordVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const getUser = () => {
    console.log("user");
    setIsLoading(true);
    setLoginSuccess(true);
  };

  const isDisabledBtn =
    !emailOrUsername.trim() || !password.trim() || isLoading || loginSuccess;

  return (
    <>
      <div className="authPage">
        <div className="authContent">
          <div className="loginData">
            <div className="loginCred">
              <div className="loginForm">
                <p className="loginHeading">Welcome</p>
                <p className="loginCaption">Sign in to your account</p>
                <form action="" autoComplete="off" onSubmit={getUser}>
                  <div className="emailData">
                    <label htmlFor="loginEmail">
                      <span>
                        <Mail width={20} strokeWidth={1.5} />
                      </span>{" "}
                      Email or username
                    </label>
                    <input
                      type="text"
                      id="loginEmail"
                      autoComplete="username"
                      value={emailOrUsername}
                      onChange={(e) => {
                        setEmailOrUsername(e.target.value);
                        if (isError) setError("");
                      }}
                      placeholder="Email or username"
                      aria-invalid={!!isError}
                    />
                  </div>
                  <div className="passwordData">
                    <label htmlFor="loginPassword">
                      <span>
                        <LockKeyhole width={20} strokeWidth={1.5} />
                      </span>
                      Password
                    </label>
                    <input
                      type={isVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (isError) setError("");
                      }}
                      placeholder="......."
                      aria-invalid={!!isError}
                    />
                    <span onClick={passwordVisible} className="passwordVisible">
                      {isVisible ? (
                        <Eye size={20} strokeWidth={1.5} />
                      ) : (
                        <EyeOff size={20} strokeWidth={1.5} />
                      )}
                    </span>
                  </div>
                  {resetSuccess && (
                    <div className="authMessage authMessage--success">
                      <CheckCircle
                        className="authMessage__icon"
                        size={16}
                        aria-hidden
                      />
                      <p className="loginSuccess">
                        Password reset successfully. You can sign in with your
                        new password.
                      </p>
                    </div>
                  )}
                  {isError && (
                    <div
                      className="authMessage authMessage--error"
                      style={{ marginTop: "0.5em", marginBottom: 0 }}
                    >
                      <CircleAlert
                        className="authMessage__icon"
                        size={16}
                        aria-hidden
                      />
                      <p className="orgError">{isError}</p>
                    </div>
                  )}
                  <div className="loginBtn">
                    <button
                      type="submit"
                      className={`login-btn ${isDisabledBtn ? "disabled_css" : ""} ${isLoading || loginSuccess ? "auth_btn_loading" : ""}`}
                      disabled={isDisabledBtn}
                      aria-busy={isLoading || loginSuccess}
                    >
                      {loginSuccess ? (
                        <>
                          Signing in…
                          <Loader2
                            className="auth_spinner"
                            size={20}
                            aria-hidden
                          />
                        </>
                      ) : isLoading ? (
                        <>
                          <Loader2
                            className="auth_spinner"
                            size={20}
                            aria-hidden
                          />
                        </>
                      ) : (
                        <>
                          Sign in
                          <span>
                            <ArrowRight width={20} />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <p className="forgotPassword">
                      <Link to="/forgotPassword">
                        <span>Forgot Password?</span>
                      </Link>
                    </p>
                  </div>
                  <div className="companyContent">
                    <div className="contentOne">
                      <p>
                        Welcome to the Massive Capital Investor Portal where you
                        can access a wide range of investor information and
                        documentation.
                      </p>

                      <p className="contentTwo">
                        Please log in to the Investor Portal using your email
                        address and password. If you have trouble logging in,
                        you can reset your password using the{" "}
                        <Link to="/forgotPassword">
                          <span>Forgot Password?</span>
                        </Link>
                        link.
                      </p>
                      <div className="poweredBy">
                        <p><img src={poweredBy} alt="qualesce" /></p>
                      </div>
                      <div className="copyright">
                        <p>© 2026 Massive Capital</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
