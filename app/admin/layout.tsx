import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Sanity Studio — content management for the portfolio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * The Studio page is a client component (the Sanity bundle must not be
 * evaluated in the RSC graph), so metadata/viewport live here instead.
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
