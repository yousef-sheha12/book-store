import React from "react";
import { BookMarked, Globe, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3b2d4a] text-white py-20 px-10 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-2">
              <BookMarked size={32} />
              <span className="text-xl font-semibold tracking-wide">
                Bookshop
              </span>
            </div>

            <nav className="flex gap-6 text-sm font-medium">
              <Link to="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link
                to="/books"
                className="hover:text-gray-300 transition-colors"
              >
                Books
              </Link>
              <Link
                to="/about"
                className="hover:text-gray-300 transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        <hr className="border-gray-500 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <div>
            <span>
              &lt;Developed By&gt; EraaSoft &lt;All Copy Rights Reserved @2024
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Globe size={20} />
            <div className="flex items-center border border-gray-500 rounded-md px-3 py-1 gap-10 hover:bg-white/5 cursor-pointer transition-colors">
              <span className="text-xs uppercase">English</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
