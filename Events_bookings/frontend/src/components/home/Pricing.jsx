import React from 'react';

export default function Pricing() {
  const plans = [
    { name: 'Basic', price: '$99', features: ['Access to talks', 'Networking'] },
    { name: 'Standard', price: '$199', features: ['All Basic', 'Workshops'] },
    { name: 'Premium', price: '$399', features: ['All Standard', 'VIP'] }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold">{p.name}</h4>
              <div className="text-2xl font-bold my-4">{p.price}</div>
              <ul className="text-sm text-gray-600 space-y-2">
                {p.features.map((f, idx) => <li key={idx}>• {f}</li>)}
              </ul>
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 rounded">Get {p.name}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
