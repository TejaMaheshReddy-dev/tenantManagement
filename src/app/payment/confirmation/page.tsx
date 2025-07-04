"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import useConfirmationHook from "./useConfirmationHook";

export default function ConfirmationPage() {
  const { paymentStatus, plan, sessionId } = useConfirmationHook();

  if (paymentStatus === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Confirming Payment</h2>
              <p className="text-muted-foreground">
                Please wait while we process your payment...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-red-600">Payment Failed</CardTitle>
                <CardDescription>
                  There was an issue processing your payment. Please try again.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/payment">
                  <Button>Try Again</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl text-green-600">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for upgrading to the {plan} plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span>{plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session ID:</span>
                    <span className="font-mono text-xs">{sessionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600 font-semibold">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your account has been upgraded and you now have access to all{" "}
                  {plan} plan features.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/projects?tenant_id=tenant-123">
                    <Button>
                      Go to Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => window.print()}>
                    Download Receipt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
