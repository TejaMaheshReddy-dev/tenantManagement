"use client";

import type React from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import useQuestionsHook, { Question } from "./useQuestionsHook";

export default function QuestionsPage() {
  const {
    responses,
    handleResponseChange,
    isLoading,
    projectId,
    handleSubmit,
    questions,
    isSaving,
  } = useQuestionsHook();
  const renderQuestionField = (question: Question) => {
    if (question.response_type === "bool") {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={question.id}
            checked={(responses[question.id] as boolean) || false}
            onCheckedChange={(checked) =>
              handleResponseChange(question.id, checked)
            }
          />
          <Label htmlFor={question.id} className="text-sm font-normal">
            Yes
          </Label>
        </div>
      );
    } else {
      return (
        <Textarea
          id={question.id}
          placeholder="Enter your response..."
          value={(responses[question.id] as string) || ""}
          onChange={(e) => handleResponseChange(question.id, e.target.value)}
          className="min-h-[100px]"
        />
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="text-center">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/projects?tenant_id=tenant-123">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">State-Specific Questions</h1>
            <p className="text-muted-foreground">Project ID: {projectId}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Questionnaire</CardTitle>
            <CardDescription>
              Please answer the following questions to ensure compliance with
              state regulations. Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {questions.map((question: any, index: number) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">
                    {index + 1}. {question.question}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                  {renderQuestionField(question)}
                </div>
              ))}

              <div className="flex justify-end pt-6">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Responses
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
