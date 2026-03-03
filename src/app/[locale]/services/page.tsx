"use client";
import CardSlider from "@/components/CardSlider/CardSlider";
import Heading from "@/components/Heading/Heading";
import ProcessTimeline from "@/components/ProcessTimeline/ProcessTimeline";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { getNavLinks } from "@/data/navLinks";
import { IllustrationType } from "@/types/IllustrationType";
import { ServiceType } from "@/types/ServiceType";
import { useIsMobile } from "@/utils/isMobile";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useBEM } from "@/utils/component/useBEM";
import "./page.scss";

export default function ServicesPage() {
  const b = useBEM("services-page");

  const tNavBar = useTranslations("Navbar");
  const navLinks = getNavLinks(tNavBar);
  const tServices = useTranslations("Services");
  const tWorkflow = useTranslations("Workflow");

  const isMobile = useIsMobile();
  const [services, setServices] = useState<ServiceType[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );
  const [steps, setSteps] = useState<IllustrationType[]>([]);

  /**
   * Navigates to the previous service in the list.
   */
  const onPreviousService = () => {
    if (!selectedService || services.length === 0) return;
    const currentIndex = services.findIndex(
      (s) => s.title.en === selectedService.title.en,
    );
    if (currentIndex === -1) return;

    if (currentIndex === 0) {
      setSelectedService(services[services.length - 1]);
    } else {
      setSelectedService(services[currentIndex - 1]);
    }
  };

  /**
   * Navigates to the next service in the list.
   */
  const onNextService = () => {
    if (!selectedService || services.length === 0) return;
    const currentIndex = services.findIndex(
      (s) => s.title.en === selectedService.title.en,
    );
    if (currentIndex === -1) return;

    if (currentIndex === services.length - 1) {
      setSelectedService(services[0]);
    } else {
      setSelectedService(services[currentIndex + 1]);
    }
  };

  /**
   * Initial data fetch.
   */
  useEffect(() => {
    fetch("/api/steps")
      .then((res) => res.json())
      .then((data) => setSteps(data));
  }, []);
  /**
   * Initial data fetch.
   */
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  /**
   * Initial service.
   */
  useEffect(() => {
    if (!selectedService && isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedService(services[0]);
    }
  }, [selectedService, services, isMobile]);

  return (
    <main className={b()}>
      <Heading
        classname={b("services-heading")}
        heading={tServices("copy")}
        icon={isMobile}
      />
      <CardSlider
        cards={services}
        selectedCard={selectedService}
        onPrevious={onPreviousService}
        onNext={onNextService}
        onSelectCard={(card) => setSelectedService(card)}
        renderCard={(card) => (
          <ServiceCard
            service={card}
            costCopy={tServices("cost")}
            durationCopy={tServices("duration")}
            ctaCopy={tServices("cta")}
            ctaHref={navLinks[navLinks.length - 1].href}
          />
        )}
      >
        {selectedService && (
          <ServiceCard
            service={selectedService}
            costCopy={tServices("cost")}
            durationCopy={tServices("duration")}
            ctaCopy={tServices("cta")}
            ctaHref={navLinks[navLinks.length - 1].href}
          />
        )}
      </CardSlider>
      <Heading
        classname={b("workflow-heading")}
        heading={tWorkflow("heading")}
        copy={tWorkflow("copy")}
        icon={true}
      />
      <ProcessTimeline steps={steps} />
    </main>
  );
}
