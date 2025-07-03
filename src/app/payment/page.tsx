"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

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
    features: ["Up to 25 projects", "Priority support", "Advanced compliance", "Custom reports"],
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
]

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()

  const handlePayment = async (planName: string) => {
    setIsLoading(true)
    setSelectedPlan(planName)

    // Mock payment session creation
    try {
      // Simulate API call to /payment/session
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      setTimeout(() => {
        // Redirect to mock checkout
        router.push(`/payment/checkout?session_id=${sessionId}&plan=${planName}`)
      }, 1000)
    } catch (error) {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">Upgrade to unlock more features and better support</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handlePayment(plan.name)}
                  disabled={isLoading}
                >
                  {isLoading && selectedPlan === plan.name ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Choose {plan.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
