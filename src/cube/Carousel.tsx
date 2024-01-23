import React, { useState, useCallback } from 'react';
import { animated, useSpring, to } from '@react-spring/three';
import RoundedPlane from '../shapes/RoundedPlane';
import { Html } from '@react-three/drei';

type RoundedPlaneProps = {
    width: number;
    height: number;
    radius: number;
    color: string;
    opacity: number;
  };
  
  type CarouselProps = {
    planes: RoundedPlaneProps[];
    position: [number, number, number];
    rotation: [number, number, number];
  };
  
  const Carousel: React.FC<CarouselProps> = ({ planes, position, rotation }) => {
      const [activeIndex, setActiveIndex] = useState(0);
      const [zoom, setZoom] = useState(false);
      const [remainingIndices, setRemainingIndices] = useState(Array.from({ length: planes.length }, (_, i) => i));
  
      // 확대 애니메이션
      const { scale } = useSpring({
        scale: zoom ? 1.05 : 1,
        config: { duration: 100 }, // 100ms 동안 애니메이션 실행
        onRest: () => setZoom(false),
      });
  
      // RoundedPlane 클릭 핸들러
      const handlePlaneClick = useCallback(() => {
        if (remainingIndices.length === 0) {
            // 모든 plane이 선택되었으면 리스트 초기화
            setRemainingIndices(Array.from({ length: planes.length }, (_, i) => i));
        }
    
        // 랜덤 인덱스 선택 (배열이 비어 있지 않은 경우에만)
        let selectedIndex;
        if (remainingIndices.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingIndices.length);
            selectedIndex = remainingIndices[randomIndex];
    
            // 선택된 인덱스를 리스트에서 제거
            setRemainingIndices((prev) => prev.filter((_, i) => i !== randomIndex));
        } else {
            // 배열이 비어 있으면 첫 번째 plane 선택
            selectedIndex = 0;
        }
    
        setActiveIndex(selectedIndex);
        setZoom(true);
    }, [remainingIndices, planes.length]);
  
      return (
          <>
              <group>
                  {planes.map((plane, index) => (
                      <animated.group
                          key={index}
                          position={[position[0], position[1], index === activeIndex ? position[2] : -1000]} // 활성화된 plane만 중앙에 표시
                          rotation={rotation}
                          scale={index === activeIndex ? scale : 1}
                          onClick={handlePlaneClick}
                      >
                          <RoundedPlane
                              width={plane.width}
                              height={plane.height}
                              radius={plane.radius}
                              color={plane.color}
                              opacity={plane.opacity}
                              transparent={true}
                          />
                          {index === activeIndex && (
                              <Html position={[0, 0, 1]} zIndexRange={[100, 0]}>
                                  <div style={{ color: 'white' }}>{`#${index+1} plane`}</div>
                              </Html>
                          )}
                      </animated.group>
                  ))}
              </group>
          </>
      );
  };
  
  export default Carousel;
















// import React, { useState, useRef } from 'react';
// import { animated, useSpring, to } from '@react-spring/three';
// import RoundedPlane from '../shapes/RoundedPlane';
// import { Html } from '@react-three/drei';

// type RoundedPlaneProps = {
//     width: number;
//     height: number;
//     radius: number;
//     color: string;
//     opacity: number;
//   };
  
//   type CarouselProps = {
//     planes: RoundedPlaneProps[];
//     width: number;
//     height: number;
//     radius: number;
//   };

// const Carousel: React.FC<CarouselProps> = ({ planes, width, height, radius }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const gap = 10;
//     const totalWidth = width + gap;
//     const newPositionX = -totalWidth * activeIndex;

//     const { position } = useSpring({
//         position: [-14, 0, -newPositionX],
//     });
  
//     const next = () => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % planes.length);
//     };
  
//     const prev = () => {
//       setActiveIndex((prevIndex) => (prevIndex - 1 + planes.length) % planes.length);
//     };

//   return (
//     <>
//         <group>
//             <animated.group position={to(position, (x, y, z) => [x, y, z])} rotation={[0, -Math.PI / 2, 0]}>
//                 {planes.map((plane, index) => (
//                 <group key={index} position={[-totalWidth * (index), 0, 0]} >
//                     <RoundedPlane
//                         width={width}
//                         height={height}
//                         radius={radius}
//                         color={plane.color}
//                         opacity={plane.opacity}
//                         transparent={true}
//                     />
//                 </group>
//                 ))}
//             </animated.group>
//             <Html position={[0, 0, 7]} // Adjust position for 'Prev' button
//                     center
//                     zIndexRange={[100, 0]}
//             >
//                 <button onClick={prev}>Prev</button>
//             </Html>
//             <Html position={[0, 0, -7]} // Adjust position for 'Next' button
//                     center
//                     zIndexRange={[100, 0]}
//             >
//                 <button onClick={next}>Next</button>
//             </Html>
//             {/* Indicator */}
//             <Html position={[1, -4.5, 0]} // Adjust position as needed
//                     center // Centers the content horizontally
//                     zIndexRange={[100, 0]} // Ensure it's above other canvas content
//             >
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 {planes.map((_, index) => (
//                     <span key={index} style={{ margin: '0 4px' }}>
//                     {index === activeIndex ? '●' : '○'}
//                     </span>
//                 ))}
//                 </div>
//             </Html>
//         </group>
//     </>

//   );
// };

// export default Carousel;