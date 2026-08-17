"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, MessageCircle, Send, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_EMAIL, getWhatsAppUrl, WHATSAPP_LINK } from "@/lib/translations";

export function Contact() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const allServices = t.services.categories.flatMap((c) => c.items);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      locale === "ar"
        ? `مرحباً، اسمي ${name || "—"}\nالخدمة: ${service || "—"}\n${message || ""}`
        : `Hello, my name is ${name || "—"}\nService: ${service || "—"}\n${message || ""}`;
    window.open(getWhatsAppUrl(text), "_blank");
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-site" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center sm:mb-14"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 sm:text-4xl md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brown-600 sm:text-lg">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <a
              href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
              className="card-luxury flex items-center gap-4 transition-transform hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient">
                <Phone className="h-6 w-6 text-brown-900" />
              </div>
              <div>
                <p className="text-sm text-brown-500">{t.contact.call}</p>
                <p className="font-display text-xl font-bold text-brown-900" dir="ltr">
                  {t.contact.phone}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="card-luxury flex items-center gap-4 transition-transform hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient">
                <Mail className="h-6 w-6 text-brown-900" />
              </div>
              <div>
                <p className="text-sm text-brown-500">{t.contact.emailLabel}</p>
                <p className="font-medium text-brown-900 break-all" dir="ltr">
                  {t.contact.email}
                </p>
              </div>
            </a>

            <div className="card-luxury flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient">
                <MapPin className="h-6 w-6 text-brown-900" />
              </div>
              <div>
                <p className="text-sm text-brown-500">Location</p>
                <p className="font-medium text-brown-900">{t.contact.location}</p>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] p-5 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-6 w-6" />
              {t.contact.whatsapp}
            </a>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="card-luxury space-y-4"
          >
            <h3 className="font-display text-xl font-bold text-brown-900">
              {t.contact.formTitle}
            </h3>

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brown-700">
                {t.contact.formName}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gold-200 bg-cream-50 px-4 py-3 text-brown-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-300/30"
              />
            </div>

            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-brown-700">
                {t.contact.formService}
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl border border-gold-200 bg-cream-50 px-4 py-3 text-brown-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-300/30"
              >
                <option value="">—</option>
                {allServices.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brown-700">
                {t.contact.formMessage}
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-gold-200 bg-cream-50 px-4 py-3 text-brown-900 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-300/30"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              <Send className="h-4 w-4" />
              {t.contact.formSubmit}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
