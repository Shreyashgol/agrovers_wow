import React, { useEffect, useState } from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium animate-fade-in">
              <span>🇮🇳</span>
              <span>Made for Indian Farmers</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
              Smart Soil Testing & Farming Guidance for Every Indian Farmer
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-green-700 leading-relaxed">
              Mitti ka color, pH, narmi, khad — sab kuch AI bataayega. Voice
              assistant bhi available.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Soil Test</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-white border-2 border-green-200 text-green-800 rounded-2xl font-semibold hover:border-green-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🎤</span>
                <span>Try Voice Assistant</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-900">5000+</div>
                <div className="text-sm text-green-700 mt-1">
                  Farmers Helped
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-900">12+</div>
                <div className="text-sm text-green-700 mt-1">
                  States Covered
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-900">98%</div>
                <div className="text-sm text-green-700 mt-1">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Image Card */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float-slow">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=800&fit=crop"
                  alt="Farming field"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
              </div>

              {/* Floating pH Card */}
              <div className="absolute top-20 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float backdrop-blur-sm bg-white/95">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">
                      pH Level
                    </div>
                    <div className="text-lg font-bold text-green-900">
                      6.5 Optimal
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Soil Type Card */}
              <div className="absolute bottom-20 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float-delayed backdrop-blur-sm bg-white/95">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">
                      Soil Type
                    </div>
                    <div className="text-lg font-bold text-green-900">Loamy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
