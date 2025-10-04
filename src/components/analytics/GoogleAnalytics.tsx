'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  const ga_id = "G-G26WGJ0CNR";

  return (
    <>
      <Script 
        strategy="afterInteractive" 
        src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga_id}');
        `}
      </Script>
    </>
  )
}