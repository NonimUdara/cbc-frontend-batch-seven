import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHeart,
  FaAward,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import Footer from "../components/footer";

export default function AboutPageView() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary font-sans flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-secondary/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-primary drop-shadow-xl">
            About Crystal Beauty Clear
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-primary/90">
            Enhancing natural beauty through premium skincare and mindful
            ingredients.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Our Story
          </h2>
          <p className="text-muted max-w-3xl mx-auto text-lg leading-relaxed">
            Crystal Beauty Clear was founded with a simple belief — true beauty
            begins with healthy skin. We carefully craft skincare products using
            natural, skin-loving ingredients to help you feel confident,
            radiant, and beautiful every day.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent/10 px-4 sm:px-6 lg:px-0">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-14">
          What We Stand For
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto justify-items-center">
          {[
            {
              icon: <FaLeaf className="w-14 h-14 text-accent mb-4" />,
              title: "Natural Beauty",
              desc: "We use carefully selected natural ingredients that respect your skin.",
            },
            {
              icon: <FaHeart className="w-14 h-14 text-accent mb-4" />,
              title: "Customer First",
              desc: "Your satisfaction and confidence inspire everything we create.",
            },
            {
              icon: <FaAward className="w-14 h-14 text-accent mb-4" />,
              title: "Premium Quality",
              desc: "High standards, safe formulations, and trusted results.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-2xl text-center w-80"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Discover Your Glow
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-8 text-lg">
            Join thousands who trust Crystal Beauty Clear to elevate their
            skincare routine.
          </p>
          <a
            href="/products"
            className="inline-block px-10 py-4 bg-accent text-primary font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:bg-accent/90 transition-all duration-300"
          >
            Explore Products
          </a>
        </motion.div>
      </section>

      {/* Footer (Same as Homepage) */}
      <Footer />
    </div>
  );
}
