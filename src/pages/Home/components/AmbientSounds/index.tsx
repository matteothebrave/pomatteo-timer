import { useState, useRef } from 'react';

import coffee from '@/assets/sounds/coffee.mp3';
import rain from '@/assets/sounds/rain.mp3';
import fire from '@/assets/sounds/fire.mp3';
import wind from '@/assets/sounds/wind.mp3';

const sounds = [
  { name: 'Coffee Shop', file: coffee, emoji: '☕' },
  { name: 'Rain', file: rain, emoji: '🌧️' },
  { name: 'Fireplace', file: fire, emoji: '🔥' },
  { name: 'Wind', file: wind, emoji: '💨' },
];

export function AmbientSounds() {
  const [current, setCurrent] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const handleClick = (soundName: string, file: string) => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    if (current === soundName) {
      setCurrent(null);
      return;
    }

    if (!audioRefs.current[soundName]) {
      audioRefs.current[soundName] = new Audio(file);
      audioRefs.current[soundName].loop = true;
    }

    audioRefs.current[soundName].play();
    setCurrent(soundName);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '3rem',
        // position: 'fixed',        // fixado no topo
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      
        justifyContent: 'center',
      }}
    >
      {sounds.map(({ name, file, emoji }) => (
        <button
          key={name}
          onClick={() => handleClick(name, file)}
          title={name}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            fontSize: '1.5rem',
            backgroundColor: current === name ? '#22c55e' : '#37393cff',
            color: current === name ? 'white' : 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            transition: '0.2s',
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}


