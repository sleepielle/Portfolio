import AboutPreview from "~/components/AboutPreview";
import ContactForm from "~/components/ContactForm";
import { SocialsDock } from "~/components/SocialsDock";

const ContactPage = () => {
  return (
    <div className="min-h-screen ">
      <SocialsDock noEmail />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
