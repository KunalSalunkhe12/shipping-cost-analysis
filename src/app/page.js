"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import FileUpload from "@/components/file-upload";
import ShippingCostAnalysis from "@/components/shipping-cost-analysis";
import DiscountDistribution from "@/components/discount-distribution";
import RecommendedServices from "@/components/recommended-services";
import DiscountDistributionSlider from "@/components/discount-distribution-slider";
import LoadingSpinner from "@/components/loading-spinner";
export default function ShippingAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleFileUpload = (file) => {
    setIsLoading(true);
    // Simulating file processing
    setTimeout(() => {
      setIsLoading(false);
      setShowAnalysis(true);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen px-8 py-8"
      style={{ backgroundColor: "#1A1B20", color: "#E5E5E5" }}
    >
      <h1 className="text-3xl font-bold mb-8" style={{ color: "#F5A623" }}>
        Shipping Cost Analysis
      </h1>

      {!showAnalysis && (
        <div className="flex items-center justify-center mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {showAnalysis && (
        <>
          <ShippingCostAnalysis />
          <DiscountDistribution />
          <RecommendedServices />

          <div className="space-y-4">
            <DiscountDistributionSlider
              title="Ground Shipping Discount"
              currentCost={1000}
              currentDiscount={20}
            />

            <DiscountDistributionSlider
              title="Air Shipping Discount"
              currentCost={2000}
              currentDiscount={15}
            />

            <DiscountDistributionSlider
              title="Express Shipping Discount"
              currentCost={1500}
              currentDiscount={25}
            />

            <DiscountDistributionSlider
              title="International Shipping Discount"
              currentCost={3000}
              currentDiscount={10}
            />
          </div>

          <div className="mt-8">
            <Button
              className="w-full"
              style={{ backgroundColor: "#F5A623", color: "#1A1B20" }}
            >
              <TrendingDown className="mr-2 h-5 w-5" />
              Renegotiate Contract
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
