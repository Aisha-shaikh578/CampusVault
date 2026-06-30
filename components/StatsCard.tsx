import React from "react";

type StatsCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  iconColor,
  bgColor,
}: StatsCardProps) {
  return (
    <div
      className={`rounded-xl p-5 shadow-sm border border-(--border) max-w-50 ${bgColor}`}
    >
      <div className={`mb-4 text-2xl ${iconColor}`}>
        {icon}
      </div>

      <h3 className="text-gray-700 text-lg">
        {title}
      </h3>

      <p className="mt-2 text-4xl text-black font-bold">
        {value}
      </p>
    </div>
  );
}