import { Helmet } from "react-helmet-async";
import { BUSINESS } from "@/lib/constants";

const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: [
      "Dallas", "Plano", "Frisco", "McKinney", "Allen", "Richardson",
      "Garland", "Mesquite", "Irving", "Arlington", "Grand Prairie", "Carrollton",
    ].map((city) => ({ "@type": "City", name: city })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
    ],
    priceRange: "$$",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "350" },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default StructuredData;
