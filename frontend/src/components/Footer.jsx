

import React from 'react'

import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">JobHunt</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your one-stop solution to find your dream job or hire top talent. Trusted by thousands of candidates and recruiters.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href="/signup" className="hover:underline">Register</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
         <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
         <ul className="space-y-2 text-sm">
       <li className="text-gray-200 font-normal text-sm">About Us</li>
<li className="text-gray-200 font-normal text-sm">Contact</li>
<li className="text-gray-200 font-normal text-sm">Privacy Policy</li>


        </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> <a href="mailto:support@jobhunt.com">support@jobhunt.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> <a href="tel:+916060222980">+91 6060222980</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Chandigarh, India
            </li>
          </ul>

          <div className="mt-6">
           <h4 className="text-sm mb-2 font-semibold">Get Job Updates</h4>
           <p className="text-xs text-gray-400 mb-2">Enter your email to receive job alerts and news from JobHunt.</p>

            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social + Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} JobHunt. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin className="hover:text-white" size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="hover:text-white" size={18} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="hover:text-white" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
