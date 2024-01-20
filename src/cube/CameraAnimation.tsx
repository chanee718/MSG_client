import React, { FC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sceneState } from '../types/store';

export const CameraAnimation: FC = () => {
    const target = new THREE.Vector3()

	return useFrame(({ camera }) => {
		target.set(...sceneState.camera.position)
		camera.position.lerp(target, 0.3)
        if (!sceneState.isMoving && camera.position.distanceTo(target) > 0.1) {
            sceneState.isMoving = true;
        }

        // 이동이 완료될 때 isMoving을 false로 설정
        if (sceneState.isMoving && camera.position.distanceTo(target) < 0.1) {
            sceneState.isMoving = false;
        }

		// target.set(...sceneState.camera.target)
		// sceneState.cameraTargetProgress.lerp(target, 0.1)
		// camera.lookAt(sceneState.cameraTargetProgress)
	})
}