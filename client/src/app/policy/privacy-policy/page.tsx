export const privacyPolicyItems = [
    {
        title: "1. Information We Collect",
        body: [
            "1.1. When you visit our site, we may collect certain information about your device, including your IP address, browser type, time zone, and some cookies installed on your device.",
            "1.2. If you create an account, place an order, or contact us directly, we may also collect your name, email address, shipping address, and payment details.",
        ],
    },
    {
        title: "2. How We Use Your Information",
        body: [
            "2.1. To fulfill orders, provide customer support, and improve your experience on our site.",
            "2.2. To communicate with you about orders, product updates, or promotions (only if you've opted in).",
            "2.3. To analyze how users interact with the site in order to improve performance and content.",
        ],
    },
    {
        title: "3. Sharing Your Information",
        body: [
            "3.1. We do not sell or rent your personal information to third parties.",
            "3.2. We may share information with third-party providers who help us process payments, fulfill orders, or operate the website (e.g., Stripe, Printify, analytics tools).",
            "3.3. We may disclose your information if required to do so by law or to protect our rights and property.",
        ],
    },
    {
        title: "4. Cookies and Tracking",
        body: [
            "4.1. We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze website traffic.",
            "4.2. You can manage cookie preferences through your browser settings.",
        ],
    },
    {
        title: "5. Data Security",
        body: [
            "5.1. We implement reasonable security measures to protect your information, but no method of transmission over the Internet is 100% secure.",
            "5.2. You are responsible for keeping your login credentials confidential.",
        ],
    },
    {
        title: "6. Your Rights",
        body: [
            "6.1. You have the right to access, update, or delete your personal information at any time by contacting us.",
            "6.2. If you're located in certain regions (like the EU), you may have additional rights under data protection laws (e.g., GDPR).",
        ],
    },
    {
        title: "7. Changes to This Policy",
        body: [
            "7.1. We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated date.",
            "7.2. Continued use of the site after changes are posted indicates your acceptance of the revised policy.",
        ],
    },
    {
        title: "8. Contact Us",
        body: [
            "8.1. If you have any questions about this Privacy Policy or how your data is used, please contact us at: support@kvikvne.com",
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Privacy Policy
            </h1>
            <div className="space-y-8 text-muted-foreground">
                <div>
                    <p className="font-bold text-sm uppercase tracking-wide mb-2">
                        Last Updated: 06/25
                    </p>
                    <p>
                        Your privacy matters to us. This Privacy Policy explains
                        what information we collect, how we use it, and what
                        choices you have. By using this website, you agree to
                        the terms outlined below. If you have any questions or
                        concerns, feel free to reach out.
                    </p>
                </div>
                {privacyPolicyItems.map((section, idx) => (
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
