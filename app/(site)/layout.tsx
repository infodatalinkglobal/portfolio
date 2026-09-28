import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";

/**
 * Site chrome (navbar + page transitions + footer) for all public pages.
 * Kept out of the root layout so the embedded Sanity Studio at /admin
 * renders full-bleed without the site chrome around it.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
