// src/app/components/ArtistPicture.tsx
import React from 'react';

const getRandomElement = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const hairStyles = [
    'M32 10c-10 0-12 8-12 8h24s-2-8-12-8z', // Short hair
    'M32 10c-10 0-12 8-12 8h24s-2-10-12-10z', // Long hair
    'M32 10c-10 0-12 8-12 8h24s-2-6-12-6z', // Curly hair
    'M32 10c-10 0-12 8-12 8h24s-2-4-12-4z', // Buzz cut
];

const ArtistPicture: React.FC<{ size?: number }> = ({ size = 150 }) => { // Set default size to 150
    const skinColor = getRandomColor();
    const eyeColor = getRandomColor();
    const hairColor = getRandomColor();
    const selectedHairStyle = getRandomElement(hairStyles);

    return (
        <div className={`w-[${size}px] h-[${size}px] rounded-full overflow-hidden flex justify-center items-center bg-gray-200 shadow-neumorphic`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width={size}
                height={size}
                fill="#000"
            >
                {/* Face */}
                <circle cx="32" cy="32" r="30" fill={skinColor} />

                {/* Eyes */}
                <ellipse cx="22" cy="28" rx="4" ry="3" fill={eyeColor} />
                <ellipse cx="42" cy="28" rx="4" ry="3" fill={eyeColor} />

                {/* Eyebrows */}
                <rect x="18" y="24" width="8" height="2" fill="#000" />
                <rect x="38" y="24" width="8" height="2" fill="#000" />

                {/* Mouth */}
                <path
                    d="M24 36c2 2 8 2 10 0"
                    stroke="#000"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Hair */}
                <path d={selectedHairStyle} fill={hairColor} />

                {/* Optional: Add a neck */}
                <rect x="28" y="50" width="8" height="6" fill={skinColor} />
            </svg>
        </div>
    );
};

export default ArtistPicture;
