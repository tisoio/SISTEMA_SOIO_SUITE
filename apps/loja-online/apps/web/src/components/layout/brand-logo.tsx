import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

const sizes = {
  header: { width: 168, height: 48, className: "h-10 w-auto md:h-12" },
  footer: { width: 140, height: 40, className: "h-9 w-auto" },
};

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const { width, height, className: sizeClass } = sizes[variant];

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/logo-soio.png"
        alt="SOIO — Soluções em Identificação para sua Organização"
        width={width}
        height={height}
        className={`${sizeClass} object-contain object-left`}
        priority={variant === "header"}
      />
    </Link>
  );
}
