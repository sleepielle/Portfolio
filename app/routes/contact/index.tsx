import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  User,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquareText,
} from "lucide-react";
import { RainbowButton } from "components/magicui/rainbow-button";
import { buttonVariants } from "~/components/ui/button";
import { SocialsDock } from "~/components/SocialsDock";
import Eyebrow from "~/components/Eyebrow";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { BorderBeam } from "~/components/ui/border-beam";
import { cn } from "~/lib/utils";
import { Dock, DockIcon } from "~/components/ui/dock";
import { Link } from "react-router";
import { FAQ } from "~/components/FAQ";
import AboutPreview from "~/components/AboutPreview";
export type IconProps = React.HTMLAttributes<SVGElement>;

const FORMSPREE_FORM_ID = "mdkdvayw"; // ← replace with your Formspree form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/" + FORMSPREE_FORM_ID;

const Icons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
};

const DATA = {
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "#",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: Icons.linkedin,
      },
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.06 * i, ease: "easeOut" },
  }),
};

const fieldBase =
  "group relative w-full rounded-2xl border border-zinc-800/20 bg-white/60 backdrop-blur-md px-4 pt-5 pb-3 text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus-within:border-zinc-300 focus-within:shadow-[0_0_0_3px_rgba(63,63,70,0.35)]";

const iconClasses =
  "pointer-events-none absolute left-4 flex items-center gap-2 text-zinc-400";
export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot field
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "E-mail is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Invalid e-mail format";
    }

    if (!values.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    } else if (values.message.trim().length < 10) {
      newErrors.message = "The message must have at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (values.website) return; // honeypot -> likely a bot

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    try {
      setSubmitting(true);

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
        // optional helpers
        _subject: "New message: " + values.subject,
        _gotcha: values.website,
        _origin:
          typeof window !== "undefined" ? window.location.href : "custom",
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOk(true);
        setValues({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
        });
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}) as any);
        if (data && Array.isArray(data.errors)) {
          const mapped: Record<string, string> = {};
          for (const err of data.errors) {
            if (err.field) mapped[err.field] = err.message;
          }
          setErrors(mapped);
        }
        throw new Error("Form submission failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    idx: number,
    {
      id,
      icon,
      label,
      element = "input",
      type = "text",
      placeholder,
      name,
      rows,
    }: {
      id: string;
      icon: React.ReactNode;
      label: string;
      element?: "input" | "textarea";
      type?: string;
      placeholder?: string;
      name: string;
      rows?: number;
    }
  ) => (
    <motion.div custom={idx} variants={fadeUp}>
      <div className={fieldBase}>
        <span className="absolute left-4 top-1.5 text-xs text-gray-500/70">
          {label}
        </span>

        {element === "input" ? (
          <>
            {" "}
            <div className={`${iconClasses} bottom-3`}>{icon}</div>
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              value={values[name as keyof typeof values] || ""}
              onChange={(e) => setValues({ ...values, [name]: e.target.value })}
              className="peer mt-4 w-full bg-transparent pl-9 pr-2 text-sm placeholder-zinc-400 focus:outline-none"
            />
          </>
        ) : (
          <>
            {" "}
            <div className={`${iconClasses} top-10`}>{icon}</div>{" "}
            <textarea
              id={id}
              name={name}
              rows={rows ?? 6}
              placeholder={placeholder}
              value={values[name as keyof typeof values] || ""}
              onChange={(e) => setValues({ ...values, [name]: e.target.value })}
              className="peer mt-4 w-full resize-y bg-transparent pl-9 pr-2 text-sm placeholder-zinc-400 focus:outline-none"
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            className="mt-1 pl-1 text-xs text-rose-400"
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full  py-14 px-4">
      <SocialsDock noEmail />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 flex  flex-col justify-center items-center text-center ">
          <div>
            <h1 className="text-4xl  tracking-tighter text-blue-500 ">
              Contact Me
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Reach out and I'll happily answer within 1-2 business days.
            </p>
          </div>
        </div>
        {/**     <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 110 }}
            className="hidden rounded-2xl border border-zinc-800/60  px-4 py-3 text-xs text-zinc-300 md:block"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Tus datos no se comparten.
            </div>
          </motion.div> */}

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className=""
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {field(1, {
              id: "name",
              name: "name",
              label: "Name",
              icon: <User className="h-4 w-4" />,
              placeholder: "Your full name",
            })}
            {field(2, {
              id: "email",
              name: "email",
              label: "E-mail",
              icon: <Mail className="h-4 w-4 " />,
              type: "email",
              placeholder: "youremail@domain.com",
            })}
          </div>

          <div className="mt-4">
            {field(3, {
              id: "subject",
              name: "subject",
              label: "Subject",
              icon: <MessageSquareText className="h-4 w-4" />,
              placeholder: "Write e-mail's subject here...",
            })}
          </div>

          <div className="mt-4">
            {field(4, {
              id: "message",
              name: "message",
              element: "textarea",
              label: "Message",
              icon: <MessageSquareText className="h-4 w-4 " />,
              placeholder: "Write your message here...",
              rows: 7,
            })}
          </div>

          {/* Honeypot field - hidden from users */}
          <div className="hidden">
            <input
              name="website"
              type="text"
              value={values.website}
              onChange={(e) =>
                setValues({ ...values, website: e.target.value })
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <motion.div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-gray-400">
              By contacting me, you accept receiving a follow up e-mail to
              continue the conversation.
            </p>
            <RainbowButton
              disabled={submitting}
              type="submit"
              variant={"outline"}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send e-mail
                </>
              )}
            </RainbowButton>
          </motion.div>
          <BorderBeam />
        </motion.form>
        <AnimatePresence>
          {ok && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mx-auto mt-6 flex max-w-3xl items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-400"
            >
              <CheckCircle2 className="h-5 w-5" />
              Thank you! Your message was sent successfully.
            </motion.div>
          )}
        </AnimatePresence>

        <AboutPreview />
      </motion.div>
    </div>
  );
}
