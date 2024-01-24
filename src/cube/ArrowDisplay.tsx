import React from 'react';
import Arrow from './Arrow';
import './Arrow.css';
import { Camera } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ArrowDisplayProps {
    showArrows: {
      left: boolean;
      right: boolean;
      up: boolean;
      down: boolean;
    };
    showIndices: {
      left: string;
      right: string;
      up: string;
      down: string;
    }
    onRotate: (direction: string, camera: Camera) => void;
    currentCamera: Camera;
  }

const ArrowDisplay: React.FC<ArrowDisplayProps> = ({ showArrows, showIndices, onRotate, currentCamera }) => {
  const icons = {
        up: faChevronUp,
        down: faChevronDown,
        left: faChevronLeft,
        right: faChevronRight,
  };
  return (
    <div>
      {showArrows.left && (
        <div className='arrow-container left' onClick={() => onRotate('left', currentCamera)}>
          <Arrow direction="left" onRotate={onRotate} currentCamera={currentCamera}/>
          <span className={`arrow-text l`}>{showIndices.left}</span>
        </div>
      )}
      {showArrows.right && (
        <div className='arrow-container right' onClick={() => onRotate('right', currentCamera)}>
          <Arrow direction="right" onRotate={onRotate} currentCamera={currentCamera}/>
          <span className={`arrow-text r`}>{showIndices.right}</span>
        </div>
      )}
      {showArrows.up && (
        <div className='arrow-container up' onClick={() => onRotate('up', currentCamera)}>
          <Arrow direction="up" onRotate={onRotate} currentCamera={currentCamera}/>
          <span className={`arrow-text u`}>{showIndices.up}</span>
        </div>
      )}
      {showArrows.down && (
        <div className='arrow-container down' onClick={() => onRotate('down', currentCamera)}>
          <Arrow direction="down" onRotate={onRotate} currentCamera={currentCamera}/>
          <span className={`arrow-text d`}>{showIndices.down}</span>
        </div>
      )}
      {showArrows.up && <FontAwesomeIcon icon={icons['up']} className={`arrow arrow-up icon`} />}
      {showArrows.down && <FontAwesomeIcon icon={icons['down']} className={`arrow arrow-down icon`} />}
      {showArrows.left && <FontAwesomeIcon icon={icons['left']} className={`arrow arrow-left icon`} />}
      {showArrows.right && <FontAwesomeIcon icon={icons['right']} className={`arrow arrow-right icon`} />}
    </div>
  );
};

export default ArrowDisplay;