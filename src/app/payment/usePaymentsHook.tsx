import React, { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    features: ["Up to 5 projects", "Basic support", "Standard compliance"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    features: [
      "Up to 25 projects",
      "Priority support",
      "Advanced compliance",
      "Custom reports",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    features: [
      "Unlimited projects",
      "24/7 support",
      "Full compliance suite",
      "Custom integrations",
      "Dedicated manager",
    ],
    popular: false,
  },
];

function usePaymentsHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async (planName: string) => {
    setIsLoading(true);
    setSelectedPlan(planName);

    // Mock payment session creation
    try {
      // Simulate API call to /payment/session
      const sessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      setTimeout(() => {
        // Redirect to mock checkout
        router.push(
          `/payment/checkout?session_id=${sessionId}&plan=${planName}`
        );
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };
  return { plans, handlePayment, isLoading, selectedPlan };
}

export default usePaymentsHook;
