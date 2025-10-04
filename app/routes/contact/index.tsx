import AboutPreview from "~/components/AboutPreview";
import ContactForm from "~/components/ContactForm";
import { SocialsDock } from "~/components/SocialsDock";

const ContactPage = () => {
  return (
    <div>
      <SocialsDock noEmail />
      <ContactForm />
      <AboutPreview />
    </div>
  );
};

export default ContactPage;
