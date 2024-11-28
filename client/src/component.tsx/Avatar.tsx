interface AvatarProps {
    src: string;
    alt: string;
    size?: number;
    className?: string;
  }
  
  export function Avatar({ src, alt, size = 24, className = '' }: AvatarProps) {
    return (
      <div 
        className={`overflow-hidden rounded-full flex items-center justify-center bg-gray-200 ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }
  
  