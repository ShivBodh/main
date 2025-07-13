
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const storyScenes = [
  {
    title: "The Crocodile's Blessing",
    description: "Young Shankara, desiring Sannyasa, is caught by a crocodile. He tells his mother only her permission to renounce the world will save him. She reluctantly agrees, and the crocodile releases him, symbolizing his release from worldly bonds.",
    paths: [
      { d: "M 20 80 C 40 70, 60 70, 80 80 S 120 90, 140 80" }, // Water ripples
      { d: "M 130 75 C 140 65, 155 65, 165 75 L 180 85 L 150 90 Z" }, // Crocodile head
      { d: "M 160 82 C 162 80, 164 80, 166 82" }, // Crocodile eye
      { d: "M 100 60 L 105 78 L 110 60" }, // Shankara's body
      { d: "M 105 50 C 102 45, 108 45, 105 50" }, // Shankara's head (simple)
      { d: "M 105 78 C 120 85, 130 85, 145 80" }, // Crocodile body around leg
    ]
  },
  {
    title: "Debate with Mandana Mishra",
    description: "Shankara travels to debate the great scholar Mandana Mishra. Mishra's wife, Ubhaya Bharati, acts as judge. After a profound philosophical contest, Shankara is victorious, establishing the supremacy of Advaita Vedanta.",
    paths: [
      { d: "M 40 90 L 160 90" }, // Floor
      { d: "M 60 70 L 65 88 L 70 70" }, // Shankara's body
      { d: "M 65 60 C 62 55, 68 55, 65 60" }, // Shankara's head
      { d: "M 130 70 L 135 88 L 140 70" }, // Mandana Mishra's body
      { d: "M 135 60 C 132 55, 138 55, 135 60" }, // Mandana Mishra's head
      { d: "M 95 30 L 105 30" }, // Parrot on a perch (symbol of the story)
      { d: "M 100 30 C 90 40, 110 40, 100 30" } // Parrot wings
    ]
  },
  {
    title: "Composing Bhaja Govindam",
    description: "Seeing an old man trying to master grammar rules near the Ganges in Kashi, Shankara is moved to pity. He spontaneously composes the 'Bhaja Govindam' hymn, stressing that devotion is paramount, not mere intellectual pursuits.",
    paths: [
      { d: "M 20 80 C 40 70, 60 70, 80 80 S 120 90, 140 80 S 180 70, 200 80" }, // Ganges river
      { d: "M 150 65 L 155 83 L 160 65" }, // Old scholar
      { d: "M 155 55 C 152 50, 158 50, 155 55" },
      { d: "M 50 60 L 55 78 L 60 60" }, // Shankara
      { d: "M 55 50 C 52 45, 58 45, 55 50" },
      { d: "M 58 65 L 80 60" } // Pointing gesture
    ]
  },
];

export function ShankaraStoryCanvas() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [animationState, setAnimationState] = useState('drawing');

  useEffect(() => {
    const scene = storyScenes[currentSceneIndex];
    const totalDuration = (scene.paths.length * 500) + 4000; // Draw time + pause time

    const timer = setTimeout(() => {
      setAnimationState('erasing');
      
      const eraseTimer = setTimeout(() => {
        setCurrentSceneIndex((prevIndex) => (prevIndex + 1) % storyScenes.length);
        setAnimationState('drawing');
      }, (scene.paths.length * 300)); // Erase time

      return () => clearTimeout(eraseTimer);

    }, totalDuration);

    return () => clearTimeout(timer);
  }, [currentSceneIndex]);

  const currentScene = storyScenes[currentSceneIndex];

  return (
    <Card className="w-full h-full p-4 flex flex-col bg-stone-50 border-4 border-stone-200 shadow-inner">
      <div className="w-full aspect-video border border-stone-300 rounded-md bg-white overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <g
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {currentScene.paths.map((path, index) => (
              <path
                key={`${currentSceneIndex}-${index}`}
                d={path.d}
                className={cn(
                    'animate-draw-erase',
                    animationState === 'drawing' ? 'draw' : 'erase'
                )}
                style={{
                  animationDelay: `${index * (animationState === 'drawing' ? 0.5 : 0.3)}s`,
                  animationDuration: `${animationState === 'drawing' ? '2s' : '1.5s'}`
                }}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="text-center mt-4">
        <h3 className="font-headline text-lg font-bold text-primary">{currentScene.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 px-4">{currentScene.description}</p>
      </div>
    </Card>
  );
}
