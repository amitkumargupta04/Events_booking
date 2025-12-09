import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const sample = [
  { name: 'John Anderson', title: 'Head of Community Design', img: '' },
  { name: 'Carlos Mendes', title: 'Senior DevOps Engineer', img: '' },
  { name: 'Ethan Zhao', title: 'AI Ethics Researcher', img: '' }
];

export default function Speakers() {
  const container = useRef();

  useEffect(() => {
    const nodes = container.current.querySelectorAll('.speaker');
    gsap.from(nodes, { y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out' });
  }, []);

  return (
    <section id="speakers" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6">Meet The Speakers</h3>
        <div ref={container} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sample.map((s, i) => (
            <div key={i} className="speaker bg-gray-50 p-4 rounded shadow">
              <div className="h-28 w-full bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">Image</div>
              <h4 className="font-semibold">{s.name}</h4>
              <p className="text-sm text-gray-600">{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
