import React, { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { cameraSet } from '../types/datas';
import { Camera } from '../types/types';
import { sceneState } from '../types/store';

const CameraControls = () => {
    const { camera } = useThree();
    const [currentCamera, setCurrentCamera] = useState<Camera>(cameraSet.camera1);
    const [previousCamera, setPreviousCamera] = useState<Camera>(cameraSet.camera1);
    const rotationSpeed = 0.1;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (sceneState.isMoving) {
            return; // 이동 중이면 새로운 이동 무시
        }
        if (currentCamera === cameraSet.camera1) {  // white
            switch (event.key) {
                case 'ArrowLeft':
                    // sceneState.camera = cameraSet.camera6;
                    // setCurrentCamera(cameraSet.camera6);
                    sceneState.camera = cameraSet.camera6;
                    setCurrentCamera(cameraSet.camera6);
                    break;
                case 'ArrowRight':
                    sceneState.camera = cameraSet.camera5;
                    setCurrentCamera(cameraSet.camera5);
                    break;
                case 'ArrowUp':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera1);
                    break;
                case 'ArrowDown':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera4;
                    setCurrentCamera(cameraSet.camera4);
                    setPreviousCamera(cameraSet.camera1);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera2) {  // green
            switch (event.key) {
                case 'ArrowLeft':
                    sceneState.camera = cameraSet.camera5;
                    setCurrentCamera(cameraSet.camera5);
                    break;
                case 'ArrowRight':
                    sceneState.camera = cameraSet.camera6;
                    setCurrentCamera(cameraSet.camera6);
                    break;
                case 'ArrowUp':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera2);
                    break;
                case 'ArrowDown':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera4;
                    setCurrentCamera(cameraSet.camera4);
                    setPreviousCamera(cameraSet.camera2);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera5) {  // cyan
            switch (event.key) {
                case 'ArrowLeft':
                    sceneState.camera = cameraSet.camera1;
                    setCurrentCamera(cameraSet.camera1);
                    break;
                case 'ArrowRight':
                    sceneState.camera = cameraSet.camera2;
                    setCurrentCamera(cameraSet.camera2);
                    break;
                case 'ArrowDown':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera4;
                    setCurrentCamera(cameraSet.camera4);
                    setPreviousCamera(cameraSet.camera5);
                    break;
                case 'ArrowUp':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera5);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera6) {  // white
            switch (event.key) {
                case 'ArrowLeft':
                    // sceneState.camera = cameraSet.camera6;
                    // setCurrentCamera(cameraSet.camera6);
                    sceneState.camera = cameraSet.camera2;
                    setCurrentCamera(cameraSet.camera2);
                    break;
                case 'ArrowRight':
                    sceneState.camera = cameraSet.camera1;
                    setCurrentCamera(cameraSet.camera1);
                    break;
                case 'ArrowUp':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera6);
                    break;
                case 'ArrowDown':
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera4;
                    setCurrentCamera(cameraSet.camera4);
                    setPreviousCamera(cameraSet.camera6);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera3) {  // white
            switch (event.key) {
                case 'ArrowDown':
                    sceneState.isMoving = true;
                    sceneState.camera = previousCamera;
                    setCurrentCamera(previousCamera);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera4) {  // white
            switch (event.key) {
                case 'ArrowUp':
                    sceneState.isMoving = true;
                    sceneState.camera = previousCamera;
                    setCurrentCamera(previousCamera);
                    break;
            }
        }

    }, [currentCamera]); 

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]); // handleKeyDown을 의존성 배열에 추가

    return null;
};

export default CameraControls;