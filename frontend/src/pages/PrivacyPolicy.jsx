import css from "./Styles/TOS.module.css";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Privacy Policy</h1>
        </div>
        <div className={css.bodyText}>
          <p>
            This Privacy Policy describes how KVIKVNE.com collects,
            uses, and protects the information you provide when using our
            website.
          </p>
          <br/>
          <h2>Information Collection and Use</h2>
          <p>
            We may collect personal information such as your name, email
            address, shipping address, and payment information when you place
            an order on our website. This information is used solely for the
            purpose of fulfilling your order and communicating with you about
            your purchase.
          </p>
          <br/>
          <h2>Use of Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience and to track
            website usage. We use first-party cookies to track user orders,
            sessions, and cart items. These cookies are essential for the
            functioning of our website and do not collect any personal
            information.
          </p>
          <br/>
          <h2>Google Analytics</h2>
          <p>
            We use Google Analytics to analyze website traffic and improve our
            website. Google Analytics collects anonymous information such as
            your IP address, browser type, and pages visited. This information
            is used to optimize our website and provide a better user
            experience.
          </p>
          <br/>
          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties. This does not include trusted third
            parties who assist us in operating our website, conducting our
            business, or servicing you, as long as those parties agree to keep
            this information confidential.
          </p>
          <br/>
          <h2>Security</h2>
          <p>
            We take reasonable precautions to protect your personal information
            from unauthorized access, use, or disclosure. However, no method
            of transmission over the internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
          <br/>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update or change our Privacy Policy at any
            time. Any changes will be posted on this page, and the effective
            date will be updated accordingly.
          </p>
          
        </div>
      </div>
    </div>
  );
}
