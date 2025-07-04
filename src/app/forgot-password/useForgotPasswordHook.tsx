import React, { useState } from "react";

function useForgotPasswordHook() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };
  return {
    isSubmitted,
    email,
    handleSubmit,
    setEmail,
    isLoading,
  };
}

export default useForgotPasswordHook;
