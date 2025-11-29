import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    text: 'पहले मुझे समझ नहीं आता था कि मेरी मिट्टी में क्या कमी है। Agrovers ने बहुत आसानी से बता दिया और अब मेरी फसल पहले से बेहतर है।',
    name: 'रमेश्वर पटेल',
    location: 'गुजरात',
    avatar: '👨‍🌾',
    rating: 5,
  },
  {
    text: 'वॉइस असिस्टेंट बहुत काम का है। मैं हिंदी में बोल सकती हूं और तुरंत जवाब मिल जाता है। खेती के बारे में सब कुछ पूछ सकती हूं।',
    name: 'सुनीता देवी',
    location: 'उत्तर प्रदेश',
    avatar: '👩‍🌾',
    rating: 5,
  },
  {
    text: 'मिट्टी की जांच के लिए पहले लैब जाना पड़ता था। अब घर बैठे सब कुछ पता चल जाता है। बहुत सही ऐप है किसानों के लिए।',
    name: 'जगदीश सिंह',
    location: 'पंजाब',
    avatar: '👨‍🌾',
    rating: 5,
  },
];

export default function Testimonials() {
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
      id="testimonials"
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
            <span>💚</span>
            <span>Farmer Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Trusted by Thousands of Indian Farmers
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Real experiences from farmers across India
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-green-800 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-green-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-green-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <span>📍</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
