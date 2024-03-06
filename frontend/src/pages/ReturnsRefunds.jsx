import css from "./Styles/TOS.module.css";

export default function ReturnsRefunds() {
  return (
    <div>
      <div className={css.container}>
        <div className={css.header}>
          <h1>Returns and Refunds Policy</h1>
        </div>
        <div className={css.bodyText}>
          <p>
            At KVIKVNE, we strive to ensure that every product meets our quality
            standards. However, if you receive a damaged product or there is a
            manufacturing error, we offer free replacements or refunds within 30
            days of product delivery.
          </p>
          <br />
          <p>
            To initiate a replacement or refund, please contact our team through
            our support form and provide a clear photo showing the issue.
          </p>
          <br />
          <p>
            Please note that since all our products are unique and produced only
            once ordered, we do not support returns or exchanges for situations
            such as ordering the wrong size or color, or simply changing your
            mind.
          </p>
          <br />
          <p>
            Refunds for eligible returns are issued directly to the original
            payment source.
          </p>
          <br />
          <p>
            If there is an issue affecting multiple products with the same
            design, additional photo evidence of all affected items visible in
            one frame will be required for confirmation purposes.
          </p>
          <br />
          <p>
            Please also note that we will not be held responsible and will not
            offer replacements or refunds for situations where the customer
            ordered the wrong size or color. In the case of an unsuccessful
            delivery, you can opt for either a replacement with an extra charge
            or a partial refund.
          </p>
          <br />
          <p>
            There is a tolerance of 0.5" for print placement, meaning that minor
            variations in the placement of the print will not be considered as
            defects.
          </p>
        </div>
      </div>
    </div>
  );
}
