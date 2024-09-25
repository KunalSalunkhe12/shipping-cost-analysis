import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, TrendingDown } from "lucide-react";

const ShippingCostAnalysis = () => {
  const shippingData = {
    annualSpend: 15000,
    packageCount: 750,
    currentCPP: 20,
    avgDiscountCPP: 16,
    maxDiscountCPP: 12,
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateSavings = (originalCPP, discountedCPP) => {
    const savingsPercentage =
      ((originalCPP - discountedCPP) / originalCPP) * 100;
    return savingsPercentage.toFixed(1);
  };

  return (
    <Card
      className="w-full"
      style={{ backgroundColor: "#1A1B20", color: "#E5E5E5" }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold" style={{ color: "#F5A623" }}>
          Shipping Cost Analysis
        </CardTitle>
        <Badge
          variant="outline"
          className="flex items-center"
          style={{ borderColor: "#F5A623", color: "#F5A623" }}
        >
          <Package className="mr-1 h-4 w-4" />
          {shippingData.packageCount} Packages Shipped
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-6">
          <div
            className="flex flex-col items-center justify-center rounded-lg bg-primary/10 p-6"
            style={{ backgroundColor: "#F5A62320" }}
          >
            <span className="text-lg font-medium">
              Current Annual Shipping Spend
            </span>
            <span
              className="text-4xl font-bold mt-2"
              style={{ color: "#F5A623" }}
            >
              {formatMoney(shippingData.annualSpend)}
            </span>
            <span className="text-sm text-muted-foreground mt-1">
              Average CPP: {formatMoney(shippingData.currentCPP)}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="flex flex-col items-center justify-center rounded-lg bg-secondary/10 p-4"
              style={{ backgroundColor: "#F5A62310" }}
            >
              <span className="text-sm font-medium">
                With Average Industry Discount
              </span>
              <span
                className="text-2xl font-bold mt-2"
                style={{ color: "#F5A623" }}
              >
                {formatMoney(
                  shippingData.avgDiscountCPP * shippingData.packageCount
                )}
              </span>
              <span className="text-sm text-muted-foreground">
                CPP: {formatMoney(shippingData.avgDiscountCPP)}
              </span>
              <Badge
                variant="secondary"
                className="mt-2"
                style={{ backgroundColor: "#F5A62330", color: "#F5A623" }}
              >
                <TrendingDown className="mr-1 h-3 w-3" />
                {calculateSavings(
                  shippingData.currentCPP,
                  shippingData.avgDiscountCPP
                )}
                % Potential Savings
              </Badge>
            </div>
            <div
              className="flex flex-col items-center justify-center rounded-lg bg-secondary/10 p-4"
              style={{ backgroundColor: "#F5A62310" }}
            >
              <span className="text-sm font-medium">
                With Maximum Industry Discount
              </span>
              <span
                className="text-2xl font-bold mt-2"
                style={{ color: "#F5A623" }}
              >
                {formatMoney(
                  shippingData.maxDiscountCPP * shippingData.packageCount
                )}
              </span>
              <span className="text-sm text-muted-foreground">
                CPP: {formatMoney(shippingData.maxDiscountCPP)}
              </span>
              <Badge
                variant="secondary"
                className="mt-2"
                style={{ backgroundColor: "#F5A62330", color: "#F5A623" }}
              >
                <TrendingDown className="mr-1 h-3 w-3" />
                {calculateSavings(
                  shippingData.currentCPP,
                  shippingData.maxDiscountCPP
                )}
                % Potential Savings
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1" style={{ color: "#F5A623" }} />
            Optimize your shipping costs with industry-leading discounts
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingCostAnalysis;
