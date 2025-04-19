import React from "react";

interface InfoCardProps {
  title: string;
  icon?: string;
  items?: string[];
  children?: React.ReactNode;
}

export default function InfoCard({ title, icon, items, children }: InfoCardProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-2xl font-bold text-primary mb-4">
        {icon && <span>{icon} </span>}
        {title}
      </h3>
      {items && (
        <ul className="space-y-2 text-lg text-gray-700">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
      {children && <div className="mt-4 text-base text-gray-600">{children}</div>}
    </div>
  );
}
