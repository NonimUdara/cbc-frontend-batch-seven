import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* ABOUT */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold">
              Crystal Beauty Clear
            </h3>
            <p className="text-white/70 max-w-sm">
              Premium skincare products designed to enhance your natural beauty.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-accent transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-accent transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-accent transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-accent transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-5 text-xl">
              <a href="#" className="hover:text-accent transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-accent transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-accent transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/20 my-10" />

        {/* COPYRIGHT */}
        <p className="text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
