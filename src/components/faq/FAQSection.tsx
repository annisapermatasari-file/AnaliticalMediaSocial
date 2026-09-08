'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion, Send } from 'lucide-react';
import { faqs } from '@/src/lib/mockData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
          <MessageCircleQuestion size={15} />
        </span>
        <h3 className="text-base font-bold text-ink sm:text-lg">Bantuan & FAQ</h3>
      </div>

      <div className="mt-4 space-y-2">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-xl transition-colors ${open ? 'bg-surface-alt' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
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
                <p className="px-3 pb-3.5 text-sm leading-relaxed text-ink-light">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-3.5 text-sm font-bold text-white shadow-card transition-all hover:shadow-card-lg active:scale-[0.99]">
        <Send size={16} /> Gabung Grup Telegram Komunitas
      </button>
    </div>
  );
}
