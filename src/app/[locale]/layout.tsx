import type { Metadata, Viewport } from "next";
import { Lora, Berkshire_Swash } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/effects/CustomCursor";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const berkshire = Berkshire_Swash({
  weight: ["400"],
  variable: "--font-berkshire",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auralis - Estudio de Arte",
  description:
    "Estudio artístico y universo narrativo de ilustración fantástica, portadas de libros y diseño de personajes.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${lora.variable} ${berkshire.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-abyss text-parchment font-serif overflow-x-hidden selection:bg-gold-200/30 selection:text-gold-50">
        <CustomCursor />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
