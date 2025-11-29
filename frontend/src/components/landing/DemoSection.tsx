import React, { useEffect, useRef, useState } from 'react';

export default function DemoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-white to-green-50/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium mb-4">
            <span>📱</span>
            <span>See It In Action</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Simple Interface, Powerful Results
          </h2>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Soil Test Card */}
          <div
            className={`bg-white rounded-3xl p-8 shadow-xl transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-900">
                Interactive Soil Test
              </h3>
              <p className="text-green-700">
                Step-by-step wizard with visual guidance
              </p>

              {/* Mock Question */}
              <div className="bg-green-50 rounded-2xl p-6 space-y-4">
                <div className="text-green-900 font-semibold">
                  What is the color of your soil?
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {['Red (Lal mitti)', 'Black (Kali mitti)', 'Clay (Chikni mitti)'].map(
                    (option, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-green-100 transition-colors cursor-pointer group"
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-green-600 group-hover:bg-green-600 transition-colors" />
                        <span className="text-green-800">{option}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Voice Assistant Card */}
          <div
            className={`bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 shadow-xl text-white transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">AI Voice Assistant</h3>
              <p className="text-blue-100">
                Ask questions in Hindi or English
              </p>

              {/* Mock Voice Interface */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="text-sm text-blue-100">
                  "Meri mitti ke liye kaun si khad achhi hai? Isko do baar mein dalein..."
                </div>

                {/* Tap to Speak Button */}
                <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-blue-50 transition-colors group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    🎤
                  </span>
                  <span>Tap to Speak</span>
                </button>
              </div>

              <div className="text-center text-sm text-blue-100">
                Ask questions in Hindi or English
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
