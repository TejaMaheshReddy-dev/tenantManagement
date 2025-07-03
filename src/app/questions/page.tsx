"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  question: string
  response_type: "text" | "bool"
  required?: boolean
}

export default function QuestionsPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project_id")

  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<{ [key: string]: string | boolean }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Mock API call to fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)

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
        ]

        setQuestions(mockQuestions)
        setIsLoading(false)
      }, 500)
    }

    fetchQuestions()
  }, [projectId])

  const handleResponseChange = (questionId: string, value: string | boolean) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Validate required fields
    const requiredQuestions = questions.filter((q) => q.required)
    const missingResponses = requiredQuestions.filter((q) => responses[q.id] === undefined || responses[q.id] === "")

    if (missingResponses.length > 0) {
      alert("Please fill in all required fields")
      setIsSaving(false)
      return
    }

    // Simulate API call to save responses
    setTimeout(() => {
      alert("Responses saved successfully!")
      setIsSaving(false)
    }, 1000)
  }

  const renderQuestionField = (question: Question) => {
    if (question.response_type === "bool") {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={question.id}
            checked={(responses[question.id] as boolean) || false}
            onCheckedChange={(checked) => handleResponseChange(question.id, checked)}
          />
          <Label htmlFor={question.id} className="text-sm font-normal">
            Yes
          </Label>
        </div>
      )
    } else {
      return (
        <Textarea
          id={question.id}
          placeholder="Enter your response..."
          value={(responses[question.id] as string) || ""}
          onChange={(e) => handleResponseChange(question.id, e.target.value)}
          className="min-h-[100px]"
        />
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="text-center">Loading questions...</div>
        </div>
      </div>
    )
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
              Please answer the following questions to ensure compliance with state regulations. Fields marked with *
              are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">
                    {index + 1}. {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
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
  )
}
