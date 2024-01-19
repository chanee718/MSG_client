import React, { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

const CameraControls = () => {
    const { camera } = useThree();
    const [targetRotationY, setTargetRotationY] = useState(-Math.PI / 2); // 초기 회전 각도
    const rotationSpeed = 0.1;

    useFrame(() => {
        // 현재 카메라의 Y축 회전과 목표 회전 각도의 차이 계산
        const deltaRotationY = targetRotationY - camera.rotation.y;
        
        // 목표 회전에 부드럽게 도달하기 위한 회전
        camera.rotation.y += deltaRotationY * rotationSpeed;
        
        // 회전 각도 정규화
        camera.rotation.y %= 2 * Math.PI;
    });

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                setTargetRotationY(prev => prev + Math.PI * 5); // Rotate left by 90 degrees
                break;
            case 'ArrowRight':
                setTargetRotationY(prev => prev - Math.PI * 5); // Rotate right by 90 degrees
                break;
            // Implement handling for ArrowUp and ArrowDown if needed
        }
    }, [setTargetRotationY]); 

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]); // handleKeyDown을 의존성 배열에 추가

    return null;
};

export default CameraControls;