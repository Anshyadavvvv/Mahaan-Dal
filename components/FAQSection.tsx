import React from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export function FAQSection({ title, subtitle, items }: FAQProps) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="faq-grid">
          {items.map((item, i) => (
            <div key={i} className="faq-card">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
