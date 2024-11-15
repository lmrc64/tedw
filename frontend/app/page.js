"use client";

import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

import StoreHeading from "@/components/home/StoreHeading";
import ProductListings from "@/components/home/ProductListings";


function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <Layout>
        <SEO title={process.env.siteTitle} />
        <StoreHeading />
        <ProductListings products={products} />
      </Layout>
    </div>
  );
}

export default IndexPage;

/*
<Layout>
      <SEO 
        title={process.env.siteTitle}
      />
      <Component {...pageProps} />
    </Layout>
*/
