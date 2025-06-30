import { useState } from "react";
import FAQSection from "./FAQ";
import { Image } from '@imagekit/react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        enquiry: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }
      };

      const backendUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${backendUrl}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to send enquiry. Please try again.");
        return;
      }

      setSuccess("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <>
      {/* Your existing JSX */}
      <section id="contact" className="bg-[#BFF2F4] p-8 max-w-7xl mx-auto my-24 rounded-md shadow-md">
        <div className="flex flex-col lg:flex-row gap-8">
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
            {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006064]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006064]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006064]"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006064]"
              />
            </div>

            <textarea
              name="message"
              placeholder="Write your message here."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006064]"
            />

            <button
              type="submit"
              className="bg-[#E5D256] px-6 py-3 rounded-md font-semibold text-black hover:bg-yellow-400 transition"
            >
              SEND ME MESSAGE
            </button>
          </form>

          <div className="flex-1 flex justify-center items-center">
            <Image
              urlEndpoint="https://ik.imagekit.io/x5lc68m0o/"
              src="woman_with_lap.jpg"
              width={500}
              height={500}
              alt="woman with laptop"
              loading="lazy"
              decoding="async"
              className="rounded-md shadow-lg max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
};

export default ContactUs;
