import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Header } from "../_ui/Header";
import { Footer } from "../_ui/Footer";
import { BusinessSchema } from "../_ui/BusinessSchema";
import { StickyBookBanner } from "../_ui/StickyBookBanner";
import { ORIGIN, DEFAULT_OG_IMAGE } from "../_lib/content-map";
import { HOME_DESCRIPTION, HOME_TITLE } from "../_lib/home-meta";
import { CMSRoute } from "@/lib/cms/CMSRoute";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: HOME_TITLE,
    template: "%s | Rutherford Spine & Wellness Center",
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    siteName: "Rutherford Spine & Wellness Center",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    google: "jOM4qXYpiMZjyzIa3xPSUt-fZCwgBxgDuLJ03BF2XBE",
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4RDRK2BSL1"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10997508084"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4RDRK2BSL1');
            gtag('config', 'AW-10997508084');
            gtag('config', 'AW-10997508084/JQXNCNml2qIdEPTPgvwo', {
              'phone_conversion_number': '(615) 217-0097'
            });
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-10997508084/zs7VCNyl2qIdEPTPgvwo',
                'value': 1.0,
                'currency': 'USD',
                'event_callback': callback
              });
              return false;
            }
            document.addEventListener('click', function (event) {
              var target = event.target;
              var link = target && target.closest ? target.closest('a[href^="tel:"]') : null;
              if (!link) return;
              var href = link.getAttribute('href');
              if (!href) return;
              event.preventDefault();
              gtag_report_conversion(href);
            });
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj6nozdnwj");
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1011020477537296');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1011020477537296&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <BusinessSchema />
        <Header />
        <CMSRoute path={pathname}>{children}</CMSRoute>
        <Footer />
        <StickyBookBanner />
        <Script id="knock-knock-widget" strategy="lazyOnload">
          {`
            window.company_id = '6a7aefaab47776717de9bae4';
            var newScript = document.createElement('script');
            newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
            document.getElementsByTagName('HEAD')[0].appendChild(newScript);
          `}
        </Script>
      </body>
    </html>
  );
}
