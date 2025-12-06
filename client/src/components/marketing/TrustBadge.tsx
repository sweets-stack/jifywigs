// components/marketing/TrustBadge.tsx
interface TrustBadgeProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export function TrustBadge({ icon: Icon, title, description }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-jify-primary/10 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-jify-primary" />
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}