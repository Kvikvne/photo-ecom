import css from "./Styles/Footer.module.css";
import styles from "./Styles/Footer2.module.css";
import React, { useRef, useState } from "react";
import axios from "axios";
import Checkmark from "../Loaders/Checkmark";

const REQ_URL = import.meta.env.VITE_UTIL;

const CopyToClipboard = ({ text, children, icon }) => {
  const textRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    textRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // Show the notification and reset after a short delay
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div>
      <input
        ref={textRef}
        type="text"
        value={text}
        readOnly
        style={{ position: "absolute", left: "-9999px" }}
      />
      <a href="#!" onClick={handleCopy}>
        {children}
      </a>
      {isCopied && (
        <div className={css.copied}>
          <div className={css.copied2}>
            <span>Copied!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const [copiedIcon, setCopiedIcon] = useState("fa-solid fa-envelope");
  const [email, setEmail] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleCopy = () => {
    setCopiedIcon("fa-regular fa-check-circle");
    setTimeout(() => setCopiedIcon("fa-solid fa-envelope"), 2000);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = () => {
    // Data to be sent in the request body
    const data = {
      email: email,
    };

    // Making a POST request to the backend
    axios
      .post(`${REQ_URL}/sub/subscribe`, data)
      .then((response) => {
        setSubmitSuccess(true);
      })
      .catch((error) => {
        console.error("Error submitting email:", error);
        setSubmitError(true);
      });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftBox}>
            <div className={styles.logo}>
              <img src="/canvas-logo-2.svg" alt="" />
            </div>
            <div className={styles.socials}>
              <a target="blank" href="https://www.instagram.com/kvikvne/">
                <div className={styles.circleIcon}>
                  <i className="fa-brands fa-instagram"></i>
                </div>
              </a>
              <a target="blank" href="https://www.linkedin.com/in/kvikvne/">
                <div className={styles.circleIcon}>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </a>
              <a target="blank" href="https://github.com/Kvikvne">
                <div className={styles.circleIcon}>
                  <i className="fa-brands fa-github"></i>
                </div>
              </a>
              <CopyToClipboard
                text="kvikvne.prints@gmail.com"
                icon={copiedIcon}
                onClick={handleCopy}
              >
                <div className={styles.circleIcon}>
                  <i className={`fa-solid ${copiedIcon}`}></i>
                </div>
              </CopyToClipboard>
            </div>
            <div className={styles.links}>
              <ul>
                <h4>About</h4>

                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-of-service">Terms of Service</a>
                </li>
                <li>
                  <a href="/returns-refunds">Returns and Refunds</a>
                </li>
              </ul>
              <ul>
                <h4>The goods</h4>
                <li>
                  <a href="/products/Canvas">Wall art</a>
                </li>
                <li>
                  <a href="/products/Accessories">Accessories</a>
                </li>
                <li>
                  <a href="/about">My Story</a>
                </li>
              </ul>
              <ul>
                <h4>Help</h4>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/contact-support">Contact me</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.email}>
            <h4>Keep up with the latest releases</h4>
            <p>
              I will continue to design and add new items to my collection so
              you dont want to miss out!
            </p>
            <div className={styles.inputBox}>
              <input
                required
                onChange={handleEmailChange}
                name="email"
                value={email}
                type="text"
              />
              <button onClick={handleEmailSubmit} className={styles.subBtn}>
                {submitSuccess ? <Checkmark /> : "Subscribe"}
              </button>
              <p>{submitError && "You have already subscribed"}</p>
              <span>Email</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.copyright}>
          <p>&copy; 2024 KVIKVNE. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
