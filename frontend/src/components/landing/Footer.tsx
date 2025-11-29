import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl shadow-lg">
                🌱
              </div>
              <span className="font-bold text-2xl">Agrovers</span>
            </div>
            <p className="text-green-200 leading-relaxed">
              India's Smart Soil & Farming Assistant. Empowering farmers with
              AI-powered guidance for better yields.
            </p>
            <div className="flex items-center gap-2 text-green-300">
              <span>🇮🇳</span>
              <span className="text-sm">Made in India with love for farmers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Features', 'How It Works', 'Testimonials', 'About Us'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className="text-green-200 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                'Farming Tips',
                'Soil Health Guide',
                'Crop Calendar',
                'FAQ',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-green-200">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>support@agrovers.in</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-green-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-green-300 text-sm">
              © 2025 Agrovers. All rights reserved.
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Supported By */}
          <div className="mt-6 text-center">
            <div className="text-green-400 text-sm">
              Supported by: Newton School → Rishihood University
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
