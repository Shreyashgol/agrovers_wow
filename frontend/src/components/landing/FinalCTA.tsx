import React, { useEffect, useRef, useState } from 'react';

interface FinalCTAProps {
  onGetStarted: () => void;
}

export default function FinalCTA({ onGetStarted }: FinalCTAProps) {
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
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-12 md:p-16 shadow-2xl transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Get Personalized Farming Plans for Your Land
              </h2>
              <p className="text-green-50 text-lg leading-relaxed">
                Start your soil test today and receive a detailed farming report
                with fertilizer recommendations, crop suggestions, and seasonal
                planning - all tailored to your specific soil and location.
              </p>

              {/* Features List */}
              <div className="space-y-3">
                {[
                  'Detailed PDF Report - Download and share with your family',
                  'Hindi & English Support - Comfortable in your language',
                  '100% Free - No hidden charges, no subscription',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-green-300">✓</span>
                    </div>
                    <span className="text-green-50">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - CTA & Stats */}
            <div className="space-y-6">
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="group relative px-8 py-4 bg-white text-green-700 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Start Soil Test Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                  <span>📄</span>
                  <span>Sample Report</span>
                </button>
              </div>

              {/* Stats Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-3xl">
                    🌾
                  </div>
                  <div className="text-white">
                    <div className="text-3xl font-bold">5000+</div>
                    <div className="text-green-100">Reports Generated</div>
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
