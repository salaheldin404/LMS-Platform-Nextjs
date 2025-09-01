import Image from "next/image";
import {
  LuBookOpenCheck,
  LuSend,
  LuInstagram,
  LuLinkedin,
  LuFacebook,
  LuTwitter,
} from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-[#1D2026] text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and Newsletter Section */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              {/* <LuBookOpenCheck className="text-primary h-8 w-8" /> */}
              <Image
                src={"/logo.png"}
                className="rounded-full"
                width={70}
                height={70}
                alt="logo"
                priority
              />
              <span className="text-2xl font-bold text-white">SyncClass</span>
            </div>
            <p className="text-gray-400 mb-6">
              Unlock your potential with our expert-led online courses.
            </p>
            <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/80 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <LuSend size={20} />
              </button>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Sections */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 tracking-wide">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center sm:text-left mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} LearnSphere. All Rights Reserved.
          </p>
          <div className="flex space-x-5">
            <a
              href="#"
              className="text-white w-10 h-10 grid place-content-center  bg-[#272B33] hover:shadow-lg hover:shadow-primary hover:bg-primary transition-all"
              aria-label="Facebook"
            >
              <LuFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-white w-10 h-10 grid place-content-center  bg-[#272B33]  hover:shadow-lg hover:shadow-primary  shadow-primary hover:bg-primary transition-all"
              aria-label="Twitter"
            >
              <LuTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-white w-10 h-10 grid place-content-center  bg-[#272B33] hover:shadow-lg hover:shadow-primary  shadow-primary hover:bg-primary transition-all"
              aria-label="Instagram"
            >
              <LuInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-white w-10 h-10 grid place-content-center  bg-[#272B33]  hover:shadow-lg hover:shadow-primary shadow-primary hover:bg-primary transition-all"
              aria-label="LinkedIn"
            >
              <LuLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
