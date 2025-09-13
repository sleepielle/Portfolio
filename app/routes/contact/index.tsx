import type { Route } from "./+types";
import { useForm, ValidationError } from "@formspree/react";

/*
export async function action({ request }: Route.ActionArgs) {
  // Extract form data from the request
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Initialize errors object to store validation errors
  // utility that represents a record for key and value where both are going to be strings
  const errors: Record<string, string> = {};

  // Validate required fields and add appropriate error messages
  if (!name) errors.name = "Name is required";

  // Email validation with type checking and regex pattern
  const emailValue = typeof email === "string" ? email : "";
  if (!emailValue) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errors.email = "Invalid email address";
  }

  if (!subject) errors.subject = "Subject is required";
  if (!message) errors.message = "Message is required";

  // If there are validation errors, return them without processing
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Prepare data object for successful submission
  const data = {
    name,
    email,
    subject,
    message,
  };

  // Return success message and form data
  return { message: "Form submitted successfully", data };
}
*/

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const [state, handleSubmit] = useForm("mdkdvayw");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="text-white ">
      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea id="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
};

export default ContactPage;
