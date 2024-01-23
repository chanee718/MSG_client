import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Camera } from '../types/types';
import './Arrow.css';

type ArrowDirection = 'up' | 'down' | 'left' | 'right';

interface ArrowProps {
  direction: ArrowDirection;
  onRotate: (direction: string, camera: Camera) => void;
  currentCamera: Camera;
}

const Arrow: React.FC<ArrowProps> = ({ direction, onRotate, currentCamera }) => {
  const icons = {
    up: faChevronUp,
    down: faChevronDown,
    left: faChevronLeft,
    right: faChevronRight,
  };

  return <FontAwesomeIcon icon={icons[direction]} className={`arrow arrow-${direction}`} style={{ opacity: 1 }} onClick={() => onRotate(direction, currentCamera)}/>;
};

export default Arrow;