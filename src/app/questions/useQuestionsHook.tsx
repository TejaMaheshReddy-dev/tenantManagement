import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface Question {
  id: string;
  question: string;
  response_type: "text" | "bool";
  required?: boolean;
}

function useQuestionsHook() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project_id");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{
    [key: string]: string | boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Mock API call to fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const mockQuestions: Question[] = [
          {
            id: "q1",
            question: "Does your organization comply with CCPA regulations?",
            response_type: "bool",
            required: true,
          },
          {
            id: "q2",
            question: "Describe your current data encryption methods",
            response_type: "text",
            required: true,
          },
          {
            id: "q3",
            question: "Do you have a designated Data Protection Officer?",
            response_type: "bool",
            required: false,
          },
          {
            id: "q4",
            question: "What is your data retention policy?",
            response_type: "text",
            required: true,
          },
          {
            id: "q5",
            question: "Do you conduct regular security audits?",
            response_type: "bool",
            required: true,
          },
          {
            id: "q6",
            question: "Describe your incident response procedures",
            response_type: "text",
            required: false,
          },
        ];

        setQuestions(mockQuestions);
        setIsLoading(false);
      }, 500);
    };

    fetchQuestions();
  }, [projectId]);

  const handleResponseChange = (
    questionId: string,
    value: string | boolean
  ) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Validate required fields
    const requiredQuestions = questions.filter((q) => q.required);
    const missingResponses = requiredQuestions.filter(
      (q) => responses[q.id] === undefined || responses[q.id] === ""
    );

    if (missingResponses.length > 0) {
      alert("Please fill in all required fields");
      setIsSaving(false);
      return;
    }

    // Simulate API call to save responses
    setTimeout(() => {
      alert("Responses saved successfully!");
      setIsSaving(false);
    }, 1000);
  };

  return {
    responses,
    handleResponseChange,
    isLoading,
    projectId,
    handleSubmit,
    questions,
    isSaving,
  };
}

export default useQuestionsHook;
