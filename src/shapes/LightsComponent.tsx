import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';


interface LightsComponentProps {
    colors: number[]; // 색상 배열
}

const LightsComponent: React.FC<LightsComponentProps> = ({ colors }) => {
    const lightsRef = useRef<THREE.PointLight[]>([]);
    const speed = 0.003;

    useFrame(() => {
        lightsRef.current.forEach((light, index) => {
            light.position.x = Math.sin(Date.now() * speed + index) * 10;
            light.position.y = Math.cos(Date.now() * speed + index) * 10;
        });
    });

    return (
        <>
            {colors.map((color, index) => (
                <pointLight
                    key={index}
                    ref={el => {
                        if (el) lightsRef.current[index] = el;
                    }}
                    color={color}
                    distance={50}
                    intensity={500}
                    position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]}
                />
            ))}
        </>
    );
};

export default LightsComponent;