import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const carriers = ["Current", "DHL", "FedEx", "UPS"];
const colors = {
  Current: "#E5E5E5",
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

const RecommendedServices = () => {
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
      style={{ backgroundColor: "#1A1D21", color: "#E5E5E5" }}
    >
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold" style={{ color: "#4299E1" }}>
            Recommended Services for You
          </h1>
          <div className="flex justify-center items-baseline space-x-4">
            <p className="text-2xl font-semibold">
              Current Cost:{" "}
              <span className="text-3xl" style={{ color: "#4299E1" }}>
                {formatCurrency(totalCurrentCost)}
              </span>
            </p>
            <p className="text-2xl font-semibold">
              Potential Cost:{" "}
              <span className="text-3xl" style={{ color: "#4299E1" }}>
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
              style={{ backgroundColor: "#1A1D21", color: "#E5E5E5" }}
            >
              <CardHeader style={{ backgroundColor: "#4299E110" }}>
                <div className="flex justify-between items-center">
                  <CardTitle
                    className="text-lg font-semibold"
                    style={{ color: "#4299E1" }}
                  >
                    {recommendation.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-sm"
                    style={{ backgroundColor: "#4299E130", color: "#4299E1" }}
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
                      stroke="#E5E5E5"
                    />

                    <YAxis dataKey="name" type="category" stroke="#E5E5E5" />
                    <Tooltip
                      formatter={(value, name, props) => [
                        formatCurrency(value),
                        props.payload.name,
                      ]}
                      labelFormatter={() => "Cost"}
                      contentStyle={{
                        backgroundColor: "#1A1D21",
                        borderColor: "#4299E1",
                      }}
                    />

                    <Legend />
                    <Bar dataKey="cost" fill="#4299E1">
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
                              ? "#4299E1"
                              : "transparent",
                          color:
                            selectedCarriers[recommendation.id] === carrier
                              ? "#1A1D21"
                              : "#E5E5E5",
                          borderColor: "#4299E1",
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
                  style={{ backgroundColor: "#4299E1", color: "#1A1D21" }}
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
};

export default RecommendedServices;
