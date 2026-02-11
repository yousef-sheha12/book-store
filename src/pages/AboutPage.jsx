import {
  ArrowRight,
  CreditCard,
  Headphones,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Truck,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "0123456789",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("Success:", res.data);
      alert("Sent Successfully!");
    } catch (error) {
      console.error("Error Detail:", error.response?.data);
      alert(
        "Failed: " +
          JSON.stringify(error.response?.data?.errors || "Server Error"),
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="font-sans antialiased">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f8f9fa] p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Quality Selection
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                et ultricies est. Aliquam in justo varius, sagittis neque ut.
              </p>
              <a
                href="#"
                className="text-[#d81b60] text-sm font-bold flex items-center gap-1 hover:underline"
              >
                View More <ArrowRight size={14} />
              </a>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Exceptional Service
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                et ultricies est. Aliquam in justo varius, sagittis neque ut.
              </p>
              <a
                href="#"
                className="text-[#d81b60] text-sm font-bold flex items-center gap-1 hover:underline"
              >
                View More <ArrowRight size={14} />
              </a>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Set Up Stores
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                et ultricies est. Aliquam in justo varius, sagittis neque ut.
              </p>
              <a
                href="#"
                className="text-[#d81b60] text-sm font-bold flex items-center gap-1 hover:underline"
              >
                View More <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-[#3b2d4a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute right-0 bottom-0 w-1/2 h-full border-l border-t border-gray-400"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Have a Questions?</h2>
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-300 mb-10 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                et ultricies est. Aliquam in justo varius, sagittis neque ut.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-md text-[#3b2d4a]">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg">01123456789</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-md text-[#3b2d4a]">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">Example@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-md text-[#3b2d4a]">
                    <MapPin size={20} />
                  </div>
                  <span className="text-lg">
                    Adipiscing elit. Mauris et ultricies est. Aliquam in justo
                    varius.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name" // مهم جداً
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="bg-white/10 border border-white/20 p-4 rounded-md focus:outline-none focus:border-[#d81b60]"
                  required
                />
                <input
                  type="email"
                  name="email" // مهم جداً
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="bg-white/10 border border-white/20 p-4 rounded-md focus:outline-none focus:border-[#d81b60]"
                  required
                />
              </div>
              <textarea
                name="message" // مهم جداً
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="bg-white/10 border border-white/20 p-4 rounded-md focus:outline-none focus:border-[#d81b60]"
                required
              ></textarea>

              <button
                onClick={handleSubmit}
                className="bg-[#d81b60] hover:bg-[#ad1457] text-white font-bold py-4 px-10 rounded-md self-start transition-all disabled:bg-gray-500"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-25 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div className="flex flex-col gap-3">
            <Truck className="text-gray-400" size={30} />
            <h4 className="font-bold text-gray-800">
              Fast & Reliable Shipping
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CreditCard className="text-gray-400" size={30} />
            <h4 className="font-bold text-gray-800">Secure Payment</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <RotateCcw className="text-gray-400" size={30} />
            <h4 className="font-bold text-gray-800">Easy Returns</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Headphones className="text-gray-400" size={30} />
            <h4 className="font-bold text-gray-800">24/7 Customer Support</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
