import AboutPreview from "~/components/AboutPreview";
import ContactForm from "~/components/ContactForm";
import { SocialsDock } from "~/components/SocialsDock";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Me" },
    { name: "description", content: "Mercedes Paz's Portfolio" },
  ];
}

const ContactPage = () => {
  return (
    <div className="min-h-screen relative max-w-6xl ">
      {/* <SocialsDock noEmail /> */}
      <ContactForm />
    </div>
  );
};

export default ContactPage;
