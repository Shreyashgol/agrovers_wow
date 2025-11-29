import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: '✨',
    title: 'AI Soil Test Wizard',
    description:
      'Step-by-step guided questions to analyze your soil. No lab needed - just answer simple questions about your mitti.',
    color: 'from-green-100 to-emerald-100',
  },
  {
    icon: '🎤',
    title: 'Voice Based Farming Assistant',
    description:
      'Speak in Hindi or English. Ask about crops, weather, diseases. Get instant farming advice.',
    color: 'from-blue-100 to-cyan-100',
  },
  {
    icon: '💧',
    title: 'Fertilizer & pH Recommendations',
    description:
      'Get exact NPK ratios, organic alternatives, and pH correction methods for your specific soil type.',
    color: 'from-amber-100 to-yellow-100',
  },
  {
    icon: '☀️',
    title: 'Weather, Irrigation & Crop Tips',
    description:
      'Personalized farming calendar, irrigation schedules, and best crop suggestions for your region.',
    color: 'from-green-100 to-lime-100',
  },
];

export default function Features() {
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
      id="features"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium mb-4">
            <span>✨</span>
            <span>Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Everything You Need to Grow Better
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            From soil testing to crop planning, get AI-powered guidance at every
            step
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-green-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-green-700 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
