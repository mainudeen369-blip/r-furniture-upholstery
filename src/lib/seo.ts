export const SITE_URL = "https://rfurnitureupholstery.com";
export const SITE_NAME = "R Furniture Upholstery";
export const CONTACT_EMAIL = "rfurnitureupholstery7@gmail.com";
export const CONTACT_PHONE = "+971567692414";
export const CONTACT_PHONE_DISPLAY = "+971 56 769 2414";

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description:
    "Premium furniture upholstery, sofa repair, headboard upholstery, curtains and blinds in Dubai International City.",
  url: SITE_URL,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/images/hero-upholstery.jpeg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop 04, French Al Khor",
    addressLocality: "Dubai International City",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.165,
    longitude: 55.402,
  },
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: [
    "https://wa.me/971567692414",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Upholstery Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sofa Upholstery Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Headboard Upholstery" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Leather Sofa Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curtains and Blinds" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hotel Upholstery" } },
    ],
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: "Dubai furniture upholstery, sofa repair and custom furnishings",
  inLanguage: ["en", "ar"],
  publisher: { "@id": `${SITE_URL}/#business` },
};
