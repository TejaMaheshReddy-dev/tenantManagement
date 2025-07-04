import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function useConfirmationHook() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const plan = searchParams.get("plan");

  const [paymentStatus, setPaymentStatus] = useState<
    "loading" | "success" | "failed"
  >("loading");

  useEffect(() => {
    // Mock API call to check payment status
    const checkPaymentStatus = async () => {
      if (!sessionId) {
        setPaymentStatus("failed");
        return;
      }

      // Simulate API call to /payment/status?session_id=...
      setTimeout(() => {
        // Mock successful payment
        setPaymentStatus("success");
      }, 1500);
    };

    checkPaymentStatus();
  }, [sessionId]);

  return { paymentStatus, plan, sessionId };
}

export default useConfirmationHook;
