import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  readonly items: ReadonlyArray<{
    readonly label: string;
    readonly href?: string;
    readonly active?: boolean;
  }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {items.map((item, idx) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href && !item.active ? (
              <Link href={item.href} className="hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className={item.active ? "text-blue-600 font-medium" : ""}>{item.label}</span>
            )}
            {idx < items.length - 1 && <ChevronRight className="w-4 h-4" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
