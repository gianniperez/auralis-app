import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [navbar, home, about, workflow, services, artworks, contactForm, faqs, footer] =
    await Promise.all([
      import(`../../messages/${locale}/navbar.json`),
      import(`../../messages/${locale}/home.json`),
      import(`../../messages/${locale}/about.json`),
      import(`../../messages/${locale}/workflow.json`),
      import(`../../messages/${locale}/services.json`),
      import(`../../messages/${locale}/artworks.json`),
      import(`../../messages/${locale}/contactForm.json`),
      import(`../../messages/${locale}/faqs.json`),
      import(`../../messages/${locale}/footer.json`),
    ]);

  return {
    locale,
    messages: {
      Navbar: navbar.default,
      Home: home.default,
      About: about.default,
      Workflow: workflow.default,
      Services: services.default,
      Artworks: artworks.default,
      ContactForm: contactForm.default,
      Faqs: faqs.default,
      Footer: footer.default,
    },
  };
});
