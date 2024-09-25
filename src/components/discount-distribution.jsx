import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const BoxPlot = ({ data }) => {
  const randomMedian = data.q1 + Math.random() * (data.q3 - data.q1);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="text-sm font-medium mb-2" style={{ color: "#E5E5E5" }}>
        {data.category}
      </div>
      <div className="relative w-full h-8">
        <div
          className="absolute top-1/2 w-full h-0.5"
          style={{ backgroundColor: "#E5E5E530" }}
        />

        <div
          className="absolute top-0 bottom-0"
          style={{
            left: `${data.q1}%`,
            right: `${100 - data.q3}%`,
            backgroundColor: "#F5A62330",
          }}
        />

        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{ left: `${randomMedian}%`, backgroundColor: "#F5A623" }}
        />

        <div
          className="absolute top-1/2 w-1 h-1 rounded-full"
          style={{
            left: `${data.min}%`,
            transform: "translateY(-50%)",
            backgroundColor: "#F5A623",
          }}
        />

        <div
          className="absolute top-1/2 w-1 h-1 rounded-full"
          style={{
            left: `${data.max}%`,
            transform: "translateY(-50%)",
            backgroundColor: "#F5A623",
          }}
        />

        <div
          className="absolute top-1/2 w-2 h-2 rounded-full"
          style={{
            left: `${data.userPosition}%`,
            transform: "translateY(-50%)",
            backgroundColor: "#E5E5E5",
          }}
        />
      </div>
      <div
        className="flex justify-between w-full text-xs mt-1"
        style={{ color: "#E5E5E5" }}
      >
        <span>{data.min}%</span>
        <span>{data.max}%</span>
      </div>
    </div>
  );
};

const DiscountDistribution = () => {
  return (
    <Card
      className="mb-8"
      style={{ backgroundColor: "#1A1B20", color: "#E5E5E5" }}
    >
      <CardHeader>
        <CardTitle style={{ color: "#F5A623" }}>
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
              style={{ backgroundColor: "#F5A62330" }}
            ></div>
            <span>Interquartile Range</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-0.5 mr-2"
              style={{ backgroundColor: "#F5A623" }}
            ></div>
            <span>Median</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: "#E5E5E5" }}
            ></div>
            <span>Your Position</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscountDistribution;
