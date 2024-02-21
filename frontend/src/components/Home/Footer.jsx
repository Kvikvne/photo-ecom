import css from "./Styles/Footer.module.css";
import React, { useRef, useState } from "react";

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

  const handleCopy = () => {
    setCopiedIcon("fa-regular fa-check-circle"); // Change the icon to a checkmark when copied
    setTimeout(() => setCopiedIcon("fa-solid fa-envelope"), 2000); // Reset the icon after a short delay
  };

  return (
    <div className={css.container}>
      <div className={css.title}>
        <img className={css.logo} src="./PORTFOLIO_LOGO_1.svg" alt="" />
        <p>
          If you are interested in my work please feel free to reach out via the
          links below
        </p>
      </div>
      <div className={css.bottom}>
        <a target="blank" href="https://www.instagram.com/kvikvne/">
          <div className={css.circleIcon}>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </a>
        <div className={css.spacer}></div>
        <a target="blank" href="https://www.linkedin.com/in/kvikvne/">
          <div className={css.circleIcon}>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </a>
        <div className={css.spacer}></div>
        <a target="blank" href="https://github.com/Kvikvne">
          <div className={css.circleIcon}>
            <i className="fa-brands fa-github"></i>
          </div>
        </a>
        <div className={css.spacer}></div>
        <CopyToClipboard
          text="kaianderson9@gmail.com"
          icon={copiedIcon}
          onClick={handleCopy}
        >
          <div onClick={handleCopy} className={css.circleIcon}>
            <i className={`fa-solid ${copiedIcon}`}></i>
          </div>
        </CopyToClipboard>
      </div>
      <div className={css.copyright}>
        <p>&copy; 2023 Photography By Kai. All rights reserved.</p>
      </div>
    </div>
  );
}
