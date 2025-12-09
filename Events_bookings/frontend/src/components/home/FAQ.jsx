import React from 'react';

const faqs = [
  { q: 'Will the talks be recorded?', a: 'Yes, sessions will be recorded and shared.' },
  { q: 'Can I get a refund?', a: 'Refunds allowed within 14 days of purchase.' }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 bg-gray-50 rounded">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
