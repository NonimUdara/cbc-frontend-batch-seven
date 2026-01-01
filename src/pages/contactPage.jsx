import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import Footer from "../components/footer";

export default function ContactPageView() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary font-sans flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-secondary/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-primary drop-shadow-xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-primary/90">
            We’d love to hear from you. Let’s talk beauty ✨
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Contact Information</h2>
            <p className="text-muted text-lg">
              Have questions about our products or need assistance? Reach out —
              our team is always happy to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-accent text-2xl" />
                <span className="text-lg">support@crystalbeautyclear.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-accent text-2xl" />
                <span className="text-lg">+94 77 123 4567</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-accent text-2xl" />
                <span className="text-lg">
                  Colombo, Sri Lanka
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-10 rounded-2xl shadow-2xl space-y-6"
          >
            <h3 className="text-3xl font-semibold mb-4">Send Us a Message</h3>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <button
              type="submit"
              className="w-full py-4 bg-accent text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer (Same as Home & About) */}
      <Footer />
    </div>
  );
}
