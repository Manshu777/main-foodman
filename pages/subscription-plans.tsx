import React from "react";
import SEO from "components/seo";
import WelcomeContainer from "containers/welcome/welcome";
import SubscriptionPlan from "components/subscriptionPlan";

type Props = {};

export default function SubscriptionPlans({}: Props) {
  return (
    <div className="pricing-table-area-three">
      <SEO />
      <WelcomeContainer>
        <SubscriptionPlan isMore={false} count={4} />
      </WelcomeContainer>
    </div>
  );
}
