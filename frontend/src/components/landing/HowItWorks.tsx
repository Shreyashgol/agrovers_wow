import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    icon: '💬',
    title: 'Answer Simple Soil Questions',
    description:
      'Tell us about your soil color, texture, moisture, and location. Takes just 2-3 minutes.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    number: '02',
    icon: '🧠',
    title: 'AI Analyzes Your Soil',
    description:
      'Our smart AI processes your inputs and matches them with scientific soil data and farming best practices.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    number: '03',
    icon: '📄',
    title: 'Get Full Farming Report',
    description:
      'Download detailed PDF with soil health, fertilizer recommendations, crop suggestions, and farming calendar.',
    color: 'from-amber-500 to-orange-600',
  },
];

export default function HowItWorks() {
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
      id="how-it-works"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-green-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium mb-4">
            <span>🌱</span>
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Three Simple Steps to Better Farming
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            No complicated equipment or lab tests required
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-blue-200 to-amber-200 -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                {/* Step Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
                  {/* Number Badge */}
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-8 mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center text-4xl">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-green-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-green-700 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
