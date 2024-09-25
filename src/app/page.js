"use client"
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  UploadIcon,
  DollarSign,
  Package,
  TrendingDown,
  SendIcon,
} from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

// Updated color theme
const theme = {
  background: "#1A1B20",
  accent: "#F5A623",
  text: "#E5E5E5",
};

// Mock data for box plots
const boxPlotData = [
  {
    category: "Ground",
    min: 10,
    q1: 20,
    median: 30,
    q3: 40,
    max: 50,
    userPosition: 35,
  },
  {
    category: "Air",
    min: 15,
    q1: 25,
    median: 35,
    q3: 45,
    max: 55,
    userPosition: 40,
  },
  {
    category: "Express",
    min: 20,
    q1: 30,
    median: 40,
    q3: 50,
    max: 60,
    userPosition: 45,
  },
  {
    category: "International",
    min: 25,
    q1: 35,
    median: 45,
    q3: 55,
    max: 65,
    userPosition: 50,
  },
  {
    category: "Freight",
    min: 30,
    q1: 40,
    median: 50,
    q3: 60,
    max: 70,
    userPosition: 55,
  },
];

function ShippingCostAnalysis() {
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
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className="text-2xl font-bold"
          style={{ color: theme.accent }}
        >
          Shipping Cost Analysis
        </CardTitle>
        <Badge
          variant="outline"
          className="flex items-center"
          style={{ borderColor: theme.accent, color: theme.accent }}
        >
          <Package className="mr-1 h-4 w-4" />
          {shippingData.packageCount} Packages Shipped
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-6">
          <div
            className="flex flex-col items-center justify-center rounded-lg bg-primary/10 p-6"
            style={{ backgroundColor: `${theme.accent}20` }}
          >
            <span className="text-lg font-medium">
              Current Annual Shipping Spend
            </span>
            <span
              className="text-4xl font-bold mt-2"
              style={{ color: theme.accent }}
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
              style={{ backgroundColor: `${theme.accent}10` }}
            >
              <span className="text-sm font-medium">
                With Average Industry Discount
              </span>
              <span
                className="text-2xl font-bold mt-2"
                style={{ color: theme.accent }}
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
                style={{
                  backgroundColor: `${theme.accent}30`,
                  color: theme.accent,
                }}
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
              style={{ backgroundColor: `${theme.accent}10` }}
            >
              <span className="text-sm font-medium">
                With Maximum Industry Discount
              </span>
              <span
                className="text-2xl font-bold mt-2"
                style={{ color: theme.accent }}
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
                style={{
                  backgroundColor: `${theme.accent}30`,
                  color: theme.accent,
                }}
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
            <DollarSign
              className="h-4 w-4 mr-1"
              style={{ color: theme.accent }}
            />
            Optimize your shipping costs with industry-leading discounts
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BoxPlot({ data }) {
  const randomMedian = data.q1 + Math.random() * (data.q3 - data.q1);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="text-sm font-medium mb-2" style={{ color: theme.text }}>
        {data.category}
      </div>
      <div className="relative w-full h-8">
        <div
          className="absolute top-1/2 w-full h-0.5"
          style={{ backgroundColor: `${theme.text}30` }}
        />
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: `${data.q1}%`,
            right: `${100 - data.q3}%`,
            backgroundColor: `${theme.accent}30`,
          }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{ left: `${randomMedian}%`, backgroundColor: theme.accent }}
        />
        <div
          className="absolute top-1/2 w-1 h-1 rounded-full"
          style={{
            left: `${data.min}%`,
            transform: "translateY(-50%)",
            backgroundColor: theme.accent,
          }}
        />
        <div
          className="absolute top-1/2 w-1 h-1 rounded-full"
          style={{
            left: `${data.max}%`,
            transform: "translateY(-50%)",
            backgroundColor: theme.accent,
          }}
        />
        <div
          className="absolute top-1/2 w-2 h-2 rounded-full"
          style={{
            left: `${data.userPosition}%`,
            transform: "translateY(-50%)",
            backgroundColor: theme.text,
          }}
        />
      </div>
      <div
        className="flex justify-between w-full text-xs mt-1"
        style={{ color: theme.text }}
      >
        <span>{data.min}%</span>
        <span>{data.max}%</span>
      </div>
    </div>
  );
}

function DiscountDistribution() {
  return (
    <Card
      className="mb-8"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.accent }}>
          Discount Distribution by Shipment Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {boxPlotData.map((data, index) => (
          <BoxPlot key={index} data={data} />
        ))}
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: `${theme.accent}30` }}
            ></div>
            <span>Interquartile Range</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-0.5 mr-2"
              style={{ backgroundColor: theme.accent }}
            ></div>
            <span>Median</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: theme.text }}
            ></div>
            <span>Your Position</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const DiscountDistributionSlider = ({
  title,
  currentCost,
  currentDiscount,
}) => {
  const [selectedDiscount, setSelectedDiscount] = useState(currentDiscount);
  const newCost =
    currentCost * (1 + (currentDiscount - selectedDiscount) / 100);

  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const newDistribution = Array(30)
      .fill(0)
      .map((_, index) => {
        const middleIndex = 15;
        const distanceFromMiddle = Math.abs(index - middleIndex);
        const baseHeight = Math.random() * 50;
        const heightBoost = Math.max(0, 50 - distanceFromMiddle * 5);
        return baseHeight + heightBoost;
      });
    setDistribution(newDistribution);
  }, []);

  return (
    <Card
      className="w-full mb-4"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <CardHeader>
        <CardTitle
          className="text-2xl font-bold"
          style={{ color: theme.accent }}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Cost</p>
            <p className="text-2xl font-bold" style={{ color: theme.accent }}>
              ${currentCost.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">New Cost</p>
            <p className="text-2xl font-bold" style={{ color: theme.accent }}>
              ${newCost.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-end h-40 mb-6 relative">
          {distribution.map((value, index) => (
            <div
              key={index}
              className="w-[3.33%] mr-[0.5px]"
              style={{
                height: `${value}%`,
                backgroundColor: `${theme.accent}30`,
              }}
            ></div>
          ))}
          <div
            className="absolute bottom-0 w-1 bg-red-500"
            style={{
              height: "100%",
              left: `${(currentDiscount / 80) * 100}%`,
              backgroundColor: "red",
            }}
          />
        </div>

        <style>{`
          .custom-thumb {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid ${theme.accent};
            background: transparent;
            cursor: pointer;
          }
        `}</style>

        <Slider
          value={[selectedDiscount]}
          max={80}
          step={1}
          onValueChange={(values) => setSelectedDiscount(values[0])}
          className="mt-6"
          thumbClassName="custom-thumb"
        />

        <div className="flex justify-between mt-2">
          <span className="text-sm">0%</span>
          <span className="text-sm">80%</span>
        </div>
      </CardContent>
    </Card>
  );
};

const carriers = ["Current", "DHL", "FedEx", "UPS"];
const colors = {
  Current: theme.text,
  DHL: "#1E40AF",
  FedEx: "#065F46",
  UPS: "#92400E",
};

const recommendations = [
  {
    id: 1,
    title: "Fuel Surcharge",
    description: "Optimize fuel surcharge rates",
    currentCost: 10000,
    discounts: { DHL: 15, FedEx: 12, UPS: 10 },
  },
  {
    id: 2,
    title: "Delivery Area Surcharge",
    description: "Reduce delivery area surcharges",
    currentCost: 8000,
    discounts: { DHL: 10, FedEx: 8, UPS: 12 },
  },
  {
    id: 3,
    title: "Residential Delivery",
    description: "Lower residential delivery fees",
    currentCost: 6000,
    discounts: { DHL: 8, FedEx: 10, UPS: 7 },
  },
  {
    id: 4,
    title: "Weight-based Pricing",
    description: "Optimize weight-based pricing tiers",
    currentCost: 7000,
    discounts: { DHL: 12, FedEx: 15, UPS: 11 },
  },
];

const formatCurrency = (value) => `$${value.toLocaleString()}`;

function RecommendedServices() {
  const [selectedCarriers, setSelectedCarriers] = useState(
    recommendations.reduce((acc, rec) => ({ ...acc, [rec.id]: "Current" }), {})
  );

  const calculatePotentialCost = (recommendation, carrier) => {
    if (carrier === "Current") return recommendation.currentCost;
    const discountRate = recommendation.discounts[carrier] / 100;
    return recommendation.currentCost * (1 - discountRate);
  };

  const totalCurrentCost = recommendations.reduce(
    (sum, rec) => sum + rec.currentCost,
    0
  );
  const totalPotentialCost = recommendations.reduce(
    (sum, rec) => sum + calculatePotentialCost(rec, selectedCarriers[rec.id]),
    0
  );

  const handleCarrierChange = (recommendationId, carrier) => {
    setSelectedCarriers((prev) => ({ ...prev, [recommendationId]: carrier }));
  };

  const handleSendRFP = (recommendationId) => {
    console.log(`Sending RFP for recommendation ${recommendationId}`);
    // Implement the RFP sending logic here
  };

  return (
    <div
      className="p-6 min-h-screen flex flex-col items-center"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold" style={{ color: theme.accent }}>
            Recommended Services for You
          </h1>
          <div className="flex justify-center items-baseline space-x-4">
            <p className="text-2xl font-semibold">
              Current Cost:{" "}
              <span className="text-3xl" style={{ color: theme.accent }}>
                {formatCurrency(totalCurrentCost)}
              </span>
            </p>
            <p className="text-2xl font-semibold">
              Potential Cost:{" "}
              <span className="text-3xl" style={{ color: theme.accent }}>
                {formatCurrency(totalPotentialCost)}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((recommendation) => (
            <Card
              key={recommendation.id}
              className="overflow-hidden"
              style={{ backgroundColor: theme.background, color: theme.text }}
            >
              <CardHeader style={{ backgroundColor: `${theme.accent}10` }}>
                <div className="flex justify-between items-center">
                  <CardTitle
                    className="text-lg font-semibold"
                    style={{ color: theme.accent }}
                  >
                    {recommendation.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-sm"
                    style={{
                      backgroundColor: `${theme.accent}30`,
                      color: theme.accent,
                    }}
                  >
                    Rank #{recommendation.id}
                  </Badge>
                </div>
                <p className="text-sm">{recommendation.description}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={carriers.map((carrier) => ({
                      name: carrier,
                      cost: calculatePotentialCost(recommendation, carrier),
                    }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      tickFormatter={formatCurrency}
                      stroke={theme.text}
                    />
                    <YAxis dataKey="name" type="category" stroke={theme.text} />
                    <Tooltip
                      formatter={(value, name, props) => [
                        formatCurrency(value),
                        props.payload.name,
                      ]}
                      labelFormatter={() => "Cost"}
                      contentStyle={{
                        backgroundColor: theme.background,
                        borderColor: theme.accent,
                      }}
                    />
                    <Legend />
                    <Bar dataKey="cost" fill={theme.accent}>
                      {carriers.map((carrier, index) => (
                        <Bar
                          key={carrier}
                          dataKey="cost"
                          fill={colors[carrier]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-between items-center">
                  <div className="space-x-2">
                    {carriers.map((carrier) => (
                      <Button
                        key={carrier}
                        variant={
                          selectedCarriers[recommendation.id] === carrier
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleCarrierChange(recommendation.id, carrier)
                        }
                        style={{
                          backgroundColor:
                            selectedCarriers[recommendation.id] === carrier
                              ? theme.accent
                              : "transparent",
                          color:
                            selectedCarriers[recommendation.id] === carrier
                              ? theme.background
                              : theme.text,
                          borderColor: theme.accent,
                        }}
                      >
                        {carrier}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm font-medium">
                    Best:{" "}
                    {
                      Object.entries(recommendation.discounts).reduce((a, b) =>
                        a[1] > b[1] ? a : b
                      )[0]
                    }{" "}
                    ({Math.max(...Object.values(recommendation.discounts))}%
                    off)
                  </p>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleSendRFP(recommendation.id)}
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.background,
                  }}
                >
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send RFP
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShippingAnalysisPage() {
  return (
    <div
      className="px-5 py-8"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <h1 className="text-3xl font-bold mb-8" style={{ color: theme.accent }}>
        Shipping Cost Analysis
      </h1>

      <div className="mb-8">
        <Input type="file" className="sr-only" />
        <label
          htmlFor="pld-upload"
          className="flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium cursor-pointer"
          style={{
            borderColor: theme.accent,
            color: theme.accent,
            backgroundColor: theme.background,
          }}
        >
          <UploadIcon className="mr-2 h-5 w-5" />
          Upload PLD File
        </label>
      </div>

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
          style={{ backgroundColor: theme.accent, color: theme.background }}
        >
          <TrendingDown className="mr-2 h-5 w-5" />
          Renegotiate Contract
        </Button>
      </div>
    </div>
  );
}
