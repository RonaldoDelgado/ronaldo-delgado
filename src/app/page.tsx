import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { getSiteUrl } from "@/lib/site-url";

export default function Home() {
  const siteUrl = getSiteUrl().toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: "Ronaldo Delgado",
        jobTitle: "Full Stack Developer | AI Engineer",
        description: "Soy desarrollador Full Stack con experiencia en aplicaciones web y móviles, APIs REST, bases de datos relacionales e integración de Azure OpenAI.",
        email: "mailto:ronalldocorrea@gmail.com",
        telephone: "+57 313 748 5788",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chía",
          addressCountry: "CO",
        },
        url: siteUrl,
        sameAs: [
          "https://linkedin.com/in/ronaldo-delgado",
          "https://github.com/RonaldoDelgado",
        ],
        knowsAbout: [
          "TypeScript",
          "Node.js",
          "React.js",
          "Next.js",
          "Flutter",
          "React Native",
          ".NET 8",
          "NestJS",
          "PostgreSQL",
          "Microsoft Azure",
          "Azure OpenAI",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}#profile-page`,
        url: siteUrl,
        name: "Portafolio profesional de Ronaldo Delgado",
        inLanguage: "es",
        mainEntity: { "@id": `${siteUrl}#person` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PortfolioPage />
    </>
  );
}
