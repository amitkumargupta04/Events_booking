import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(titleRef.current, { y: 30, opacity: 0, duration: 0.8 })
      .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(ctaRef.current, { scale: 0.95, opacity: 0, duration: 0.5 }, '-=0.3');
  }, []);

  return (
    <section className="relative bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 ref={titleRef} className="text-4xl sm:text-6xl font-bold leading-tight">Code. Connect. Create.</h1>
        <p ref={subtitleRef} className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Summitra 2025 — an immersive IT conference bringing top minds together for three days of learning, networking and building.</p>
        <div ref={ctaRef} className="mt-8 flex items-center justify-center gap-3">
          <a href="#pricing" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow">Buy Ticket</a>
          <a href="#about" className="text-gray-700 px-4 py-3 rounded-lg border">Learn More</a>
        </div>
      </div>
    </section>
  );
}
