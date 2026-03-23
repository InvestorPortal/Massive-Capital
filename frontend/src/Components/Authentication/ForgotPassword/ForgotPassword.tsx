import { useState } from "react";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  CircleAlert,
  Loader2,
} from "lucide-react";
import "./forgotpassword.css";
import { Link } from "react-router-dom";
import poweredBy from "../../../assets/images/poweredby.svg";
import companyLogo from "../../../assets/images/massive-capital-logo.png";

const ForgotPassword = () => {
  document.title = "Investor Portal | Forgot Password";

  const BASE_URL = (import.meta.env.VITE_BASE_URL ?? "").toString().trim();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setMessage(
          data.message ||
            "If an account exists with this email, you will receive a password reset link shortly.",
        );
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to connect. Please try again later.");
    }
  };

  return (
    <>
      <div className="authPage forgotPasswordPage">
        <div className="authContent">
          <div className="loginData">
            <div className="loginCred">
              <div className="loginForm">
                {/* <p className="forgotPwdHeading">Forgot Password</p> */}
                <p className="companyLogo">
                  <img
                    src={companyLogo}
                    alt="company logo"
                    style={{ width: "15em" }}
                  />
                </p>
                <p className="loginCaption">Account recovery</p>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <p className="pwdCaption">
                    Enter your email and we'll send you a link to get back into
                    your account.
                  </p>
                  <div className="emailData">
                    <label htmlFor="forgotEmail">
                      <span>
                        <Mail width={20} strokeWidth={1.5} />
                      </span>{" "}
                      Email
                    </label>
                    <input
                      id="forgotEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="johndoe@domain.com"
                      disabled={status === "loading"}
                    />
                  </div>
                  {message && (
                    <div
                      className={
                        status === "success"
                          ? "authMessage authMessage--success"
                          : "authMessage authMessage--error"
                      }
                    >
                      {status === "success" ? (
                        <CheckCircle
                          className="authMessage__icon"
                          size={16}
                          aria-hidden
                        />
                      ) : (
                        <CircleAlert
                          className="authMessage__icon"
                          size={16}
                          aria-hidden
                        />
                      )}
                      <p
                        className={
                          status === "success" ? "forgotSuccess" : "forgotError"
                        }
                      >
                        {message}
                      </p>
                    </div>
                  )}
                  <div className="loginBtn">
                    <button
                      type="submit"
                      className={`login-btn ${!email.trim() || status === "loading" ? "disabled_css" : ""} ${status === "loading" ? "auth_btn_loading" : ""}`}
                      disabled={!email.trim() || status === "loading"}
                      aria-busy={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          Sending…
                          <Loader2
                            className="auth_spinner"
                            size={20}
                            aria-hidden
                          />
                        </>
                      ) : (
                        <>
                          Submit
                          <span>
                            <ArrowRight width={20} />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <p className="signinText">
                      Back to
                      <Link to="/signin">
                        <span>Sign in</span>
                      </Link>
                    </p>
                  </div>
                  <div className="companyContent">
                    <div className="contentOne">
                      <div className="poweredBy">
                        <p>
                          <img src={poweredBy} alt="qualesce" />
                        </p>
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

export default ForgotPassword;
