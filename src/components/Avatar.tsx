import React from 'react';
import Image from 'next/image';

type AvatarProps = {
  name: string;
  src?: string | null;
};

const Avatar: React.FC<AvatarProps> = ({ name, src }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const nameToColor = () => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 75%, 60%)`;
    return color;
  };

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
    );
  }

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
      style={{ backgroundColor: nameToColor() }}
    >
      {initial}
    </div>
  );
};

export default Avatar;