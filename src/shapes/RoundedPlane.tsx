import * as THREE from 'three';
import React, { useMemo } from 'react';

type RoundedPlaneProps = {
    width: number;
    height: number;
    radius: number;
    color: string;
    opacity: number;
    transparent: boolean;
    receiveShadow?: boolean;
  };

const RoundedPlane: React.FC<RoundedPlaneProps> = ({ width, height, radius, color, opacity, transparent, receiveShadow }) => {
  // Rounded rectangle shape를 생성합니다.
  const roundedRectShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
    return shape;
  }, [width, height, radius]);

  // Shape를 기반으로 ShapeGeometry를 생성합니다.
  const geometry = useMemo(() => new THREE.ShapeGeometry(roundedRectShape), [
    roundedRectShape,
  ]);

  // 메쉬의 머티리얼을 생성합니다.
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    transparent: transparent,
    opacity: opacity,
  });

  return <mesh geometry={geometry} material={material} receiveShadow={receiveShadow} />;
};

export default RoundedPlane;