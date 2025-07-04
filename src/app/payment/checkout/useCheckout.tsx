import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function useCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const plan = searchParams.get("plan");

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const planPrices: { [key: string]: string } = {
    Basic: "$29",
    Professional: "$99",
    Enterprise: "$299",
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Redirect to confirmation page
      router.push(`/payment/confirmation?session_id=${sessionId}&plan=${plan}`);
    }, 2000);
  };
  return {
    sessionId,
    plan,
    planPrices,
    handleSubmit,
    formData,
    handleInputChange,
    isProcessing,
  };
}

export default useCheckout;
