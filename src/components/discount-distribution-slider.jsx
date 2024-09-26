import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

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
      style={{ backgroundColor: "#1A1D21", color: "#E5E5E5" }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold" style={{ color: "#4299E1" }}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Cost</p>
            <p className="text-2xl font-bold" style={{ color: "#4299E1" }}>
              ${currentCost.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">New Cost</p>
            <p className="text-2xl font-bold" style={{ color: "#4299E1" }}>
              ${newCost.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-end h-40 mb-6 relative">
          {distribution.map((value, index) => (
            <div
              key={index}
              className="w-[3.33%] mr-[0.5px]"
              style={{ height: `${value}%`, backgroundColor: "#4299E130" }}
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
 border-bottom: 20px solid #4299E1;
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

export default DiscountDistributionSlider;
