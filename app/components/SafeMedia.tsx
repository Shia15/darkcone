// components/SafeMedia.tsx
import Image from "next/image";

export default function SafeMedia({
  src,
  alt,
  className = "",
  height = 40,
  width = 120,
}: {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
}) {
  return (
    <div className={`safe-frame ${className}`}>
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
        className="h-10 w-auto object-contain"
        priority
      />
    </div>
  );
}
