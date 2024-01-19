import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CameraControls from './CameraControls';


const Cube = () => {
    const sideSize = 10;
    const halfSideSize = sideSize / 2;

    // 각 면의 위치와 회전
    const faces = [
        { position: [halfSideSize, 0, 0], rotation: [0, -Math.PI / 2, 0], color: '#FFEFEF' }, // +x, orange
        { position: [-halfSideSize, 0, 0], rotation: [0, Math.PI / 2, 0], color: 'green' }, // -x
        { position: [0, halfSideSize, 0], rotation: [Math.PI / 2, 0, 0], color: 'blue' }, // +y purple
        { position: [0, -halfSideSize, 0], rotation: [-Math.PI / 2, 0, 0], color: 'yellow' }, // -y
        { position: [0, 0, halfSideSize], rotation: [0, Math.PI, 0], color: 'cyan' }, // +z  skyblue
        { position: [0, 0, -halfSideSize], rotation: [0, 0, 0], color: 'magenta' } // -z pink   start
    ];
    return (
        <div className="App" style={{height: "100%", width: "100%"}}>
            <Canvas camera={{ position: [-1, 0, 0], fov: 85 }}>
                <CameraControls />
                <OrbitControls enableZoom={false} enableRotate={false}/>
                <ambientLight intensity={5} color="#FFFFFF"/>
                {faces.map((face, index) => (
                    <mesh key={index} position={face.position as [number, number, number]} rotation={face.rotation as [number, number, number]}>
                        <planeGeometry attach="geometry" args={[sideSize, sideSize]} />
                        <meshLambertMaterial attach="material" color={face.color} />
                    </mesh>
                ))}
                <lineSegments>
                    <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(10, 10, 10)]} />
                    <lineBasicMaterial attach="material" color="black" side={THREE.DoubleSide} linewidth={5} />
                </lineSegments>
            </Canvas>
        </div>
    );
};

export default Cube;