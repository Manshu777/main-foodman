import React from "react";
import SEO from "components/seo";
import WelcomeContainer from "containers/welcome/welcome";
import WelcomeHero from "components/welcomeHero/welcomeHero";
import { useQuery } from "react-query";
import useLocale from "hooks/useLocale";
import FaqContainer from "containers/faq/faq";
import faqService from "services/faq";
import HowDoesItWork from "components/welcomeDoesWork";
import WelcomeReservation from "components/welcomeReservation";
import SubscriptionPlan from "components/subscriptionPlan";
import MobileAppBanner from "components/mobileAppBanner";

type Props = {};

export default function Welcome({}: Props) {
  const { locale } = useLocale();

  const { data: faqs } = useQuery(["faqs", locale], () => faqService.getAll());

  return (
    <div className="pricing-table-area-three">
      <SEO />
      <WelcomeContainer>
        <WelcomeHero />
        <HowDoesItWork />
        <WelcomeReservation />
        <SubscriptionPlan isMore count={3} />
        <MobileAppBanner />
        <FaqContainer data={faqs?.data} />
      </WelcomeContainer>
    </div>
  );
}
