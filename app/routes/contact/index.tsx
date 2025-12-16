import AboutPreview from "~/components/AboutPreview";
import ContactForm from "~/components/ContactForm";
import { SocialsDock } from "~/components/SocialsDock";

const ContactPage = () => {
  return (
    <div className="min-h-screen relative max-w-6xl ">
      <SocialsDock noEmail />
      <ContactForm />
      <div className="w-[54rem] mx-auto">
        <img
          src="../../public/images/general/contact-banner.png"
          alt="banner"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default ContactPage;
