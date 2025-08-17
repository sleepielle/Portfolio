import type { Route } from "./+types";
import { Form } from "react-router";

/**
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
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        📩 Contact me
      </h2>

      <form
        action="https://formspree.io/f/mdkdvayw"
        className="space-y-6"
        method="post"
      >
        <div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            ></input>
          </div>

          <div className="mt-8 mb-8">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            ></input>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300"
            >
              Subject{" "}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            ></input>
          </div>

          <div className="mt-8 mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
            ></textarea>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 cursor-pointer ">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
