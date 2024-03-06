import css from "./Styles/TOS.module.css";

export default function TOS() {
  return (
    <div>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Terms of Service</h1>
        </div>
        <div className={css.bodyText}>
          <div className={css.section}>
            <h2>1. Use of Website</h2>
            <p>
              1.1. You must be at least 18 years old to use this website. By
              using this website and agreeing to these terms, you warrant and
              represent that you are at least 18 years of age.
            </p>
            <p>
              1.2. You agree to use this website only for lawful purposes and in
              a manner that does not infringe the rights of, restrict or inhibit
              the use and enjoyment of this website by any third party.
            </p>
          </div>
          <div className={css.section}>
            <h2>2. Products and Services</h2>
            <p>
              2.1. We reserve the right to modify or discontinue any product or
              service at any time without prior notice.
            </p>
            <p>
              2.2. All descriptions of products or product pricing are subject
              to change at any time without notice, at our sole discretion.
            </p>
          </div>
          <div className={css.section}>
            <h2>3. User Accounts</h2>
            <p>
              3.1. If you create an account on this website, you are responsible
              for maintaining the confidentiality of your account and password
              and for restricting access to your computer. You agree to accept
              responsibility for all activities that occur under your account or
              password.
            </p>
            <p>
              3.2. We reserve the right to refuse service, terminate accounts,
              remove or edit content, or cancel orders at our sole discretion.
            </p>
          </div>
          <div className={css.section}>
            <h2>4. Intellectual Property</h2>
            <p>
              4.1. All content included on this website, such as text, graphics,
              logos, button icons, images, audio clips, digital downloads, data
              compilations, and software, is the property of KVIKVNE or its content suppliers and is protected by
              international copyright laws.
            </p>
            <p>
              4.2. You may not use, reproduce, duplicate, copy, sell, resell, or
              exploit any portion of the website without express written
              permission from us.
            </p>
          </div>
          <div className={css.section}>
            <h2>5. Limitation of Liability</h2>
            <p>
              5.1. In no event shall KVIKVNE, its directors,
              officers, employees, affiliates, agents, contractors, interns,
              suppliers, service providers, or licensors be liable for any
              injury, loss, claim, or any direct, indirect, incidental,
              punitive, special, or consequential damages of any kind,
              including, without limitation lost profits, lost revenue, lost
              savings, loss of data, replacement costs, or any similar damages,
              whether based in contract, tort (including negligence), strict
              liability, or otherwise, arising from your use of any of the
              service or any products procured using the service, or for any
              other claim related in any way to your use of the service or any
              product, including, but not limited to, any errors or omissions in
              any content, or any loss or damage of any kind incurred as a
              result of the use of the service or any content (or product)
              posted, transmitted, or otherwise made available via the service,
              even if advised of their possibility.
            </p>
          </div>
          <div className={css.section}>
            <h2>6. Governing Law</h2>
            <p>
              6.1. These terms and conditions shall be governed by and construed
              in accordance with the laws of California, and you submit to
              the non-exclusive jurisdiction of the courts in that state or
              location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
