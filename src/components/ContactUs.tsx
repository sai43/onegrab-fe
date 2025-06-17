import { useState } from "react";
import FAQSection from "./FAQSection";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Message sent!");
  };

  return (
    <>
      {/* Help Text Container */}
      <section id="contact" className="max-w-7xl mt-6 mx-auto my-16 p-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-6xl font-anton font-bold uppercase leading-tight">
            We’re here to help you<br />anytime, anywhere
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <p className="max-w-md text-gray-700">
            Have questions or feedback? We’d love to hear from you. Reach out to us anytime and our support team will assist you quickly.
          </p>
        </div>
      </section>

      <section className="bg-[#BFF2F4] p-8 max-w-7xl mx-auto my-16 rounded-md shadow-md">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Form */}
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
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

          {/* Right Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/Image-4PNLNCB.jpg"
              alt="Contact woman with laptop"
              className="rounded-md shadow-lg max-w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Contact Info Boxes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#D6CBF2] p-6 rounded-md shadow-md flex items-center gap-4">
            <div className="text-4xl">📞</div>
            <div>
              <h3 className="font-bold uppercase text-black">LET'S TALK</h3>
              <p>Phone: (+91) 8919 6695 15</p>
            </div>
          </div>

          <div className="bg-[#D6CBF2] p-6 rounded-md shadow-md flex items-center gap-4">
            <div className="text-4xl">✉️</div>
            <div>
              <h3 className="font-bold uppercase text-black">EMAIL SUPPORT</h3>
              <p>chsai.btech@gmail.com</p>
            </div>
          </div>

          <div className="bg-[#D6CBF2] p-6 rounded-md shadow-md flex items-center gap-4">
            <div className="text-4xl">📍</div>
            <div>
              <h3 className="font-bold uppercase text-black">OFFICE ADDRESS</h3>
              <p>#7, AP NGO HOME, Main Road, </p>
              <p>Parvathipuram, AP-535501.</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8 h-64 rounded-md overflow-hidden shadow-md">
            <iframe
                style={{ border: 0, width: "100%", height: "100%" }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=83.4225%2C18.7715%2C83.4239%2C18.7725&layer=mapnik&marker=18.772004%2C83.423277"
                title="AP NGO HOME Location"
                loading="lazy"
                allowFullScreen
            />
        </div>
      </section>

      <FAQSection />
    </>
  );
};

export default ContactUs;
