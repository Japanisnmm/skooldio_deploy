import SkooldioLogo from '../../assets/Skooldio 1.svg';
import WebDevLogo from '../../assets/WebDev 1.svg';
import Group5 from '../../assets/Group5.svg';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#222" }} className="text-white py-6 w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[160px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Featured product */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold mb-4 md:mb-6">
              Featured product
            </h2>
            <ul className="space-y-2">
              <li className="hover:text-[#DEF81C] cursor-pointer">Men</li>
              <li className="hover:text-[#DEF81C] cursor-pointer">Ladies</li>
              <li className="hover:text-[#DEF81C] cursor-pointer">Shoes</li>
              <li className="hover:text-[#DEF81C] cursor-pointer">Accessories</li>
            </ul>
          </div>

          {/* Register with us */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold mb-4 md:mb-6">
              Register with us
            </h2>
            <p className="mb-4 md:mb-6">
              Sign up now and get 20% off your first purchase!
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="signup-button px-4 py-2 rounded-r bg-[#fff] text-black font-bold 
                flex items-center gap-2 hover:bg-[#DEF81C] transition-colors">
                Sign Up Now
                <img src={Group5} alt="arrow" className="w-[22px] h-[22px]" />
              </button>
            </div>
          </div>

          {/* Customer services */}
          <div className="text-center md:text-left md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold mb-4 md:mb-6">
              Customer services
            </h2>
            <p className="mb-2 text-sm md:text-base">
              MBK Tower 29th Floor, 444 Phaya Thai Rd, Wang Mai, Pathum Wan,
              Bangkok 10330
            </p>
            <p className="mb-4 md:mb-6 text-sm md:text-base">
              Email: jane.doe@realmail.com
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded mb-2 w-full text-sm md:text-base"
              style={{ backgroundColor: "#fff", color: "#222" }}
            />
            <button
              className="px-4 py-2 rounded w-full hover:bg-[#c9dd19] transition-colors text-sm md:text-base"
              style={{ backgroundColor: "#def81c", color: "#222" }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
          style={{ borderTop: "1px solid #9f9f9f" }}>
          <p className="text-xs text-[#9f9f9f] order-2 md:order-1">
            Copyright © 2024 All rights reserved for all contents
          </p>
          
          <div className="flex items-center space-x-2 order-1 md:order-2">
            <span className="text-[#9f9f9f] text-xs">Powered By</span>
            <div className="flex items-center gap-2">
              <img src={SkooldioLogo} alt="Skooldio" className="h-[19px]" />
              <div className="w-[1px] h-4 bg-[#dee2e6]"></div>
              <img src={WebDevLogo} alt="WebDev" className="h-[17px]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
