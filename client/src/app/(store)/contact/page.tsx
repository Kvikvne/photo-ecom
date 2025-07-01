import ContactForm from "@/components/sections/contact-form";

export default function ContactMe() {
  return (
    <>
      <h1 className="text-6xl mb-4 text-center font-bold">Contact me</h1>
      <p className="md:w-2xl mx-auto mb-4 text-center text-muted-foreground">
        Have a question, issue, or just want to say hello? We&rsquo;re here to
        help. Reach out about orders, prints, collaborations, or anything
        else—we&rsquo;ll get back to you as soon as possible.
      </p>

      <ContactForm />
    </>
  );
}
