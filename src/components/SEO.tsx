import { Helmet } from "react-helmet-async";
import { BUSINESS } from "@/lib/constants";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

const SEO = ({ title, description, path = "" }: SEOProps) => {
  const url = `${BUSINESS.url}${path}`;
  const fullTitle = `${title} | ${BUSINESS.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
