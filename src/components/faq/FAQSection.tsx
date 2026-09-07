'use client';

import { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { faqs } from '@/src/lib/mockData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <h3 className="text-base font-bold text-ink sm:text-lg">Bantuan & FAQ</h3>

      <div className="mt-4 divide-y divide-teal-100">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
              >
                <span className="text-sm font-semibold text-ink">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-ink-light transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {open && <p className="pb-3 text-sm leading-relaxed text-ink-light">{faq.answer}</p>}
            </div>
          );
        })}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-900">
        <Send size={16} /> Gabung Grup Telegram Komunitas
      </button>
    </div>
  );
}
