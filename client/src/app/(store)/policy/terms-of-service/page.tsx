const tosItems = [
    {
        title: "1. Use of Website",
        body: [
            "1.1. You must be at least 18 years old to use this website. By accessing this site, you warrant and represent that you are at least 18 years of age.",
            "1.2. You agree to use this website only for lawful purposes and in a way that does not infringe on the rights or restrict the use and enjoyment of the website by others.",
            "1.3. Your use of this site is also subject to our Privacy Policy, which outlines how we collect, use, and protect your personal information.",
        ],
    },
    {
        title: "2. Products and Services",
        body: [
            "2.1. We reserve the right to modify, replace, or discontinue any product or service at any time without notice. Product availability is not guaranteed.",
            "2.2. All product descriptions and pricing are subject to change at our sole discretion without prior notice.",
            "2.3. Some products may be fulfilled by third-party providers. We are not responsible for delays, errors, or issues resulting from third-party services.",
            "2.4. Please refer to our Return Policy for information about returns, exchanges, and refunds.",
        ],
    },
    {
        title: "3. User Accounts",
        body: [
            "3.1. If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
            "3.2. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion, especially if you violate these terms.",
            "3.3. We may suspend or block access to the site at any time, without notice, for any conduct that we believe violates these terms or applicable laws.",
        ],
    },
    {
        title: "4. Intellectual Property",
        body: [
            "4.1. All content on this website—including text, images, graphics, and code—is the property of KVIKVNE or its content suppliers and is protected under international copyright law.",
            "4.2. You may not reproduce, duplicate, copy, sell, or exploit any part of this website without express written permission from us.",
            "4.3. All photographs sold or displayed on this website are original works created by KVIKVNE. Purchased prints are for personal, non-commercial use only.",
        ],
    },
    {
        title: "5. Disclaimer and Limitation of Liability",
        body: [
            "5.1. KVIKVNE and its affiliates, employees, and service providers will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or any products purchased through it.",
            "5.2. We do not warrant that the website will be uninterrupted, secure, or error-free. Content may include typographical errors or inaccuracies, and we reserve the right to correct them at any time.",
        ],
    },
    {
        title: "6. Governing Law",
        body: [
            "6.1. These terms are governed by the laws of the State of California. You agree to submit to the non-exclusive jurisdiction of the courts located in California for any dispute arising out of your use of this website.",
        ],
    },
];

export default function Tos() {
    return (
        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Terms of Service
            </h1>
            <div className="space-y-8 text-muted-foreground">
                <div>
                    <p className="font-bold text-sm uppercase tracking-wide mb-2">
                        Last Updated: 06/25
                    </p>
                    <p>
                        By accessing or using this website, you agree to be
                        bound by the following terms and conditions. Please read
                        them carefully before using the site or purchasing any
                        products. If you do not agree with these terms, you
                        should not use this website.
                    </p>
                </div>
                {tosItems.map((section, idx) => (
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
