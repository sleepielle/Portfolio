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
import { RainbowButton } from "./ui/rainbow-button";

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

      const res = await fetch(import.meta.env.FORMSPREE_ENDPOINT, {
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
    <div className=" flex items-center justify-center max-w-6xl py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-8 flex flex-col justify-center h-fit items-center text-center mx-auto ">
          <div>
            <h1 className="text-4xl  tracking-tighter text-blue-500 ">
              Contact Me
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Reach out and I'll happily answer within 1-2 business days.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="w-sm md:w-2xl lg:w-[55rem] "
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            {field(1, {
              id: "name",
              name: "name",
              label: "Name",
              icon: <User className="h-4 w-6" />,
              placeholder: "Your full name",
            })}
            {field(2, {
              id: "email",
              name: "email",
              label: "E-mail",
              icon: <Mail className="h-4 w-6 " />,
              type: "email",
              placeholder: "youremail@domain.com",
            })}
          </div>

          <div className="mt-4">
            {field(3, {
              id: "subject",
              name: "subject",
              label: "Subject",
              icon: <MessageSquareText className="h-4 w-6" />,
              placeholder: "Write e-mail's subject here...",
            })}
          </div>

          <div className="mt-4">
            {field(4, {
              id: "message",
              name: "message",
              element: "textarea",
              label: "Message",
              icon: <MessageSquareText className="h-4 w-6 " />,
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
          <div className="hidden md:flex md:w-2xl lg:flex lg:w-[54rem] mx-auto mt-10">
            <img
              src="/images/general/contact-banner.png"
              alt="banner"
              className="rounded-xl"
            />
          </div>
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
      </motion.div>
    </div>
  );
}
