export const returnsPolicyItems = [
    {
        title: "1. No Returns or Exchanges",
        body: [
            "1.1. Because each item is made to order, we do not accept returns or exchanges. Please double-check your order details before completing your purchase.",
        ],
    },
    {
        title: "2. Order Cancellations",
        body: [
            "2.1. If you need to cancel your order, please contact us as soon as possible.",
            "2.2. Cancellations are only accepted if the item has not yet entered production. Once production has started, the order cannot be canceled or refunded.",
        ],
    },
    {
        title: "3. Damaged or Defective Items",
        body: [
            "3.1. If your item arrives damaged or there is a printing issue, please contact us within 7 days of delivery with clear photos of the item and packaging.",
            "3.2. We will work with you to replace the item or offer a suitable solution on a case-by-case basis.",
        ],
    },
    {
        title: "4. Contact",
        body: [
            "4.1. If you have any questions about your order or need assistance, please reach out to: support@kvikvne.com",
        ],
    },
];

export default function ReturnsPolicy() {
    return (
        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Returns & Refunds
            </h1>
            <div className="space-y-8 text-muted-foreground">
                <div>
                    <p className="font-bold text-sm uppercase tracking-wide mb-2">
                        Last Updated: 06/25
                    </p>
                    <p>
                        Because each item is made to order, we don’t offer
                        returns or exchanges. We do accept cancellations if your
                        item hasn’t entered production yet. If something arrives
                        damaged, we’ll make it right—just get in touch. Thanks
                        for understanding.
                    </p>
                </div>
                {returnsPolicyItems.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                        <h2 className="font-bold text-2xl text-primary">
                            {section.title}
                        </h2>
                        {section.body.map((paragraph, i) => (
                            <p className="ml-4" key={i}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
