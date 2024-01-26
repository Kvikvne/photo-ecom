import css from "./Styles/Footer.module.css";
import React, { useRef, useState } from "react";

const CopyToClipboard = ({ text, children }) => {
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
            {" "}
            <span>Copied!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  return (
    <div className={css.container}>
      <div className={css.title}>
        <span class="material-symbols-outlined">handshake</span>
        <p>
          If you are interested in my work please feel free to reach out via the
          links below
        </p>
        <div className={css.btn}>Let's connect</div>
      </div>
      <div className={css.middle}>
        <div className={css.card}>
          <h1>Write</h1>
          <CopyToClipboard text="kaianderson9@gmail.com">
            <p>kaianderson9@gmail.com (Click to Copy)</p>
          </CopyToClipboard>
        </div>
        <div className={css.card}>
          <h1>Tech Portfolio</h1>
          <p>
            <a target="blank" href="https://kvikvne.github.io/portfolio/">
              Click Me!
            </a>
          </p>
        </div>
      </div>
      <div className={css.bottom}>
        <a target="blank" href="https://www.instagram.com/kvikvne/">
          <div className={css.circleIcon}>
            <i class="fa-brands fa-instagram"></i>
          </div>
        </a>
        <div className={css.spacer}></div>
        <a target="blank" href="https://www.linkedin.com/in/kvikvne/">
          <div className={css.circleIcon}>
            <i class="fa-brands fa-linkedin"></i>
          </div>
        </a>
        <div className={css.spacer}></div>
        <a target="blank" href="https://github.com/Kvikvne">
          <div className={css.circleIcon}>
            <i class="fa-brands fa-github"></i>
          </div>
        </a>
      </div>
      <div className={css.copyright}>
        <p>&copy; 2023 Photography By Kai. All rights reserved.</p>
      </div>
    </div>
  );
}
