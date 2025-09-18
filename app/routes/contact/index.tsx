import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  Phone,
  User,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquareText,
  Shield,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { RainbowButton } from "components/magicui/rainbow-button";

const FORMSPREE_FORM_ID = "mdkdvayw"; // ← replace with your Formspree form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/" + FORMSPREE_FORM_ID;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.06 * i, ease: "easeOut" },
  }),
};

const fieldBase =
  "group relative w-full rounded-2xl border border-zinc-800/60 bg-white/60 backdrop-blur-md px-4 pt-5 pb-3 text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus-within:border-zinc-700 focus-within:shadow-[0_0_0_3px_rgba(63,63,70,0.35)]";

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
      newErrors.name = "El nombre es requerido";
    }

    if (!values.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "El formato del correo no es válido";
    }

    if (!values.subject.trim()) {
      newErrors.subject = "El asunto es requerido";
    }

    if (!values.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (values.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
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
        <div className="pointer-events-none absolute left-4 bottom-3 flex items-center gap-2 text-zinc-500">
          {icon}
        </div>
        {element === "input" ? (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={values[name as keyof typeof values] || ""}
            onChange={(e) => setValues({ ...values, [name]: e.target.value })}
            className="peer mt-4 w-full bg-transparent pl-9 pr-2 text-sm placeholder-zinc-500 focus:outline-none"
            required
          />
        ) : (
          <textarea
            id={id}
            name={name}
            rows={rows ?? 6}
            placeholder={placeholder}
            value={values[name as keyof typeof values] || ""}
            onChange={(e) => setValues({ ...values, [name]: e.target.value })}
            className="peer mt-4 w-full resize-y bg-transparent pl-9 pr-2 text-sm placeholder-zinc-500 focus:outline-none"
            required
          />
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tighter text-blue-00">
              Contact Me
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Cuéntame brevemente sobre tu proyecto y te responderé pronto.
            </p>
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
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="rounded-3xl border border-zinc-800/60 bg-blue-100 p-5  backdrop-blur-xl md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              icon: <Mail className="h-4 w-4" />,
              type: "email",
              placeholder: "youremail@domain.com",
            })}
            {field(3, {
              id: "subject",
              name: "subject",
              label: "Subject",
              icon: <MessageSquareText className="h-4 w-full" />,
              placeholder: "Ej. Sitio web para mi empresa",
            })}
          </div>

          <div className="mt-4">
            {field(5, {
              id: "message",
              name: "message",
              element: "textarea",
              label: "Message",
              icon: <MessageSquareText className="h-4 w-4" />,
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
            <p className="text-xs text-gray-500">
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
