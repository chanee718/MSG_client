import React, { useState, useCallback } from 'react';
import { animated, useSpring, to } from '@react-spring/three';
import RoundedPlane from '../shapes/RoundedPlane';
import { Html } from '@react-three/drei';
import ShowVideo from '../shapes/ShowVideo';
  
  type CarouselProps = {
    videos: any[];
    position: [number, number, number];
    rotation: [number, number, number];
  };
  
  const Carousel: React.FC<CarouselProps> = ({ videos, position, rotation }) => {
      const [activeIndex, setActiveIndex] = useState(0);
      const [zoom, setZoom] = useState(false);
      const [remainingIndices, setRemainingIndices] = useState(Array.from({ length: videos.length }, (_, i) => i));
      console.log(videos);
  
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
            setRemainingIndices(Array.from({ length: videos.length }, (_, i) => i));
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
    }, [remainingIndices, videos.length]);

    const handleVideoEnd = () => {
      // handlePlaneClick 함수를 호출하여 다음 비디오로 넘어감
      handlePlaneClick();
    };
  
      return (
          <>
              <group>
                  {videos.map((video, index) => (
                    <>
                      <animated.group
                          key={index}
                          position={[position[0], position[1], index === activeIndex ? position[2] : -1000]} // 활성화된 plane만 중앙에 표시
                          rotation={rotation}
                          scale={index === activeIndex ? scale : 1}
                          onClick={handlePlaneClick}
                      >
                          <RoundedPlane
                              width={40}
                              height={27}
                              radius={1}
                              color={'#000000'}
                              opacity={0.8}
                              transparent={true}
                          />
                      </animated.group>
                    </>
                  ))}
                  
                  <ShowVideo video={videos[activeIndex]} position={position} onVideoEnd={handleVideoEnd}/>
              </group>
          </>
      );
  };
  
  export default Carousel;
