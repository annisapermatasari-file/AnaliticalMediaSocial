'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/src/lib/mockData';

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface-alt py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">FAQ</span>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Pertanyaan yang sering ditanyakan</h2>
        </div>

        <div className="mt-8 space-y-2">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="overflow-hidden rounded-xl bg-white shadow-card">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className={`text-sm font-semibold ${open ? 'text-teal-700' : 'text-ink'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-light transition-transform ${open ? 'rotate-180 text-teal-600' : ''}`}
                  />
                </button>
                {open && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-light">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
