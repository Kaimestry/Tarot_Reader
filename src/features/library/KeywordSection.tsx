import React from "react";

interface KeywordSectionProps {
  upright: string[];
  reversed: string[];
}

export const KeywordSection: React.FC<KeywordSectionProps> = ({
  upright,
  reversed,
}) => {
  const Card = ({
    title,
    items,
    colorClass,
  }: {
    title: string;
    items: string[];
    colorClass: string;
  }) => (
    <div className="bg-surface/30 p-6 rounded-2xl border border-divider backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${colorClass}`} />
        <h4 className="text-main font-black uppercase text-sm tracking-widest">
          {title}
        </h4>
      </div>
      <ul className="space-y-2">
        {items.map((kw) => (
          <li key={kw} className="text-muted text-sm flex items-center gap-2">
            <span className="opacity-50">•</span> {kw}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card title="Upright" items={upright} colorClass="bg-primary" />
      <Card title="Reversed" items={reversed} colorClass="bg-red-500/50" />
    </div>
  );
};
