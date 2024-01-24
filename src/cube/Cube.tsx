import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { cameraSet } from '../types/datas';
import { Camera } from '../types/types';
import { sceneState } from '../types/store';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CameraAnimation } from './CameraAnimation';
import ArrowDisplay from './ArrowDisplay';
import AddVideo from '../login/AddVideo';
import EditProfile from '../login/EditProfile';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useSpring, animated } from '@react-spring/three';
import RoundedPlane from '../shapes/RoundedPlane'
import Login from '../login/Login';
import Join from '../login/Join';
import MyPage from '../login/MyPage';
import { useAuth } from '../types/AuthContext';
import Carousel from './Carousel';
import LightsComponent from '../shapes/LightsComponent';

type TextMeshProps = {
    text: string;
    position: [number, number, number];
    rotation: [number, number, number];
    color: string;
  };

type Face = {
    position: [number, number, number];
    rotation: [number, number, number];
    color: string;
};

const TextMesh: React.FC<TextMeshProps> = ({ text, position, rotation, color }) => {
    const font = useLoader(FontLoader, 'fonts/font030.json');
    const textGeometry = new TextGeometry(text, {
        font,
        size: 3,
        height: 0.01,
    });

    return (
        <mesh position={position} rotation={rotation}>
            <primitive attach="geometry" object={textGeometry} />
            <meshStandardMaterial attach="material" color={color} />
        </mesh>
    );
};

enum PageState {
    Main,
    AddVideo,
    EditProfile,
    Login,
    Join
}


const Cube = () => {
    const sideSize = 50;
    const halfSideSize = sideSize / 2;

    const [showArrows, setShowArrows] = useState({
        left: false,
        right: false,
        up: false,
        down: false,
    });
    const [showIndices, setShowIndices] = useState({
        left: '',
        right: '',
        up: '',
        down: '',
    });
    const [ currentCamera, setCurrentCamera ] = useState<Camera>(cameraSet.camera1);
    const [previousCamera, setPreviousCamera] = useState<Camera>(cameraSet.camera1);
    const [showMesh1, setShowMesh1] = useState(false);
    const [showMesh2, setShowMesh2] = useState(false);
    const [showMesh3, setShowMesh3] = useState(false);
    const [showMesh4, setShowMesh4] = useState(false);
    const [showMesh5, setShowMesh5] = useState(false);
    const [showMesh6, setShowMesh6] = useState(false);
    const [isJoin, setIsJoin] = useState(false);
    const [angle, setAngle] = useState(0);

    const { isLoggedIn } = useAuth();
    const [currentPage, setCurrentPage] = useState<PageState>(PageState.Main);

    // useEffect(() => {
    //     updateLoginStatus();
    //   }, []);
    
    //   const updateLoginStatus = () => {
    //     const authToken = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');
    //     setIsLoggedIn(!!authToken);
    //   };

    const toggleJoin = () => {
        setIsJoin(true);
      };
    const goToLogin = () => {
        setIsJoin(false);
    };

    const updateArrows = useCallback(() => {
        // 현재 카메라 상태에 따라 화살표 상태 업데이트
        let arrows = { left: false, right: false, up: false, down: false };
        let indices = { left: '', right: '', up: '', down: '' }
        switch (currentCamera) {
            case cameraSet.camera1:
                arrows = { left: false, right: false, up: false, down: false };
                indices = { left: '', right: '', up: '', down: '' }
                break;
            case cameraSet.camera2:
                arrows = { left: true, right: true, up: true, down: true };
                indices = { left: 'Drum', right: 'Keyboard', up: 'Guitar', down: 'Bass' }
                break;
            case cameraSet.camera3:
                arrows = { left: false, right: false, up: false, down: true };
                switch(previousCamera) {
                    case cameraSet.camera2:
                        indices = { left: '', right: '', up: '', down: 'Band' }
                        break;
                    case cameraSet.camera5:
                        indices = { left: '', right: '', up: '', down: 'Drum' }
                        break;
                    case cameraSet.camera6:
                        indices = { left: '', right: '', up: '', down: 'KeyBoard' }
                        break;
                }
                break;
            case cameraSet.camera4:
                arrows = { left: false, right: false, up: true, down: false };
                switch(previousCamera) {
                    case cameraSet.camera2:
                        indices = { left: '', right: '', up: 'Band', down: '' }
                        break;
                    case cameraSet.camera5:
                        indices = { left: '', right: '', up: 'Drum', down: '' }
                        break;
                    case cameraSet.camera6:
                        indices = { left: '', right: '', up: 'KeyBoard', down: '' }
                        break;
                }
                break;
            case cameraSet.camera5:
                arrows = { left: false, right: true, up: true, down: true };
                indices = { left: '', right: 'Band', up: 'Guitar', down: 'Bass' }
                break;
            case cameraSet.camera6:
                arrows = { left: true, right: false, up: true, down: true };
                indices = { left: 'Band', right: '', up: 'Guitar', down: 'Bass' }
                break;
        }
        setShowArrows(arrows);
        setShowIndices(indices)
    }, [currentCamera, setShowArrows, previousCamera, setShowIndices]);

    useEffect(() => {
        updateArrows();
    }, [updateArrows]);

    let content;
    if (isLoggedIn) {
        switch (currentPage) {
          case PageState.Main:
            content = <MyPage position={[14, 0, 0]} onChangePage={setCurrentPage} />;
            break;
          case PageState.AddVideo:
            content = <AddVideo position={[14, 0, 0]} onChangePage={setCurrentPage} />;
            break;
          case PageState.EditProfile:
            content = <EditProfile position={[14, 0, 0]} onChangePage={setCurrentPage}/>;
            break;
        }
      } else {
        if (isJoin) {
            content = <Join position={[14, 0, 0]} onGoToLogin={() => setIsJoin(false)} />;
        } else {
            content = <Login position={[14, 0, 0]} onJoinClick={() => setIsJoin(true)} />;
        }
      }

    const rotateCamera = useCallback((direction: string, camera: Camera) => {
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            // 로그인하지 않았다면 이동을 수행하지 않음
            alert("Please Log In First!");
            console.log("You must be logged in to move the camera.");
            return;
        }
        if (sceneState.isMoving) {
            return; // 이동 중이면 새로운 이동 무시
        }
        setIsJoin(false);
        switch (camera) {
            case cameraSet.camera1:
                setAngle(Math.PI/2);
                switch (direction) {
                    case 'left':
                        sceneState.camera = cameraSet.camera6;
                        setCurrentCamera(cameraSet.camera6);
                        break;
                    case 'right':
                        sceneState.camera = cameraSet.camera5;
                        setCurrentCamera(cameraSet.camera5);
                        break;
                    case 'up':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera3;
                        setCurrentCamera(cameraSet.camera3);
                        setPreviousCamera(cameraSet.camera1);
                        break;
                    case 'down':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera4;
                        setCurrentCamera(cameraSet.camera4);
                        setPreviousCamera(cameraSet.camera1);
                        break;
                }
                break;
            case cameraSet.camera2:
                setAngle(Math.PI/2);
                switch (direction) {
                    case 'left':
                        sceneState.camera = cameraSet.camera5;
                        setCurrentCamera(cameraSet.camera5);
                        break;
                    case 'right':
                        sceneState.camera = cameraSet.camera6;
                        setCurrentCamera(cameraSet.camera6);
                        break;
                    case 'up':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera3;
                        setCurrentCamera(cameraSet.camera3);
                        setPreviousCamera(cameraSet.camera2);
                        break;
                    case 'down':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera4;
                        setCurrentCamera(cameraSet.camera4);
                        setPreviousCamera(cameraSet.camera2);
                        break;
                }
                break;
            case cameraSet.camera3:
                switch (direction) {
                    case 'down':
                        sceneState.isMoving = true;
                        sceneState.camera = previousCamera;
                        setCurrentCamera(previousCamera);
                        break;
                }
                break;
            case cameraSet.camera4:
                switch (direction) {
                    case 'up':
                        sceneState.isMoving = true;
                        sceneState.camera = previousCamera;
                        setCurrentCamera(previousCamera);
                        break;
                }
                break;
            case cameraSet.camera5:
                setAngle(0);
                switch (direction) {
                    case 'left':
                        sceneState.camera = cameraSet.camera1;
                        setCurrentCamera(cameraSet.camera1);
                        break;
                    case 'right':
                        sceneState.camera = cameraSet.camera2;
                        setCurrentCamera(cameraSet.camera2);
                        break;
                    case 'up':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera3;
                        setCurrentCamera(cameraSet.camera3);
                        setPreviousCamera(cameraSet.camera5);
                        break;
                    case 'down':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera4;
                        setCurrentCamera(cameraSet.camera4);
                        setPreviousCamera(cameraSet.camera5);
                        break;
                }
                break;
            case cameraSet.camera6:
                setAngle(0);
                switch (direction) {
                    case 'left':
                        sceneState.camera = cameraSet.camera2;
                        setCurrentCamera(cameraSet.camera2);
                        break;
                    case 'right':
                        sceneState.camera = cameraSet.camera1;
                        setCurrentCamera(cameraSet.camera1);
                        break;
                    case 'up':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera3;
                        setCurrentCamera(cameraSet.camera3);
                        setPreviousCamera(cameraSet.camera6);
                        break;
                    case 'down':
                        sceneState.isMoving = true;
                        sceneState.camera = cameraSet.camera4;
                        setCurrentCamera(cameraSet.camera4);
                        setPreviousCamera(cameraSet.camera6);
                        break;
                }
                break;
        }
    }, [currentCamera, setShowArrows]) 

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (sceneState.isMoving) {
            return; // 이동 중이면 새로운 이동 무시
        }

        if (currentCamera === cameraSet.camera2) {  // green
            setAngle(Math.PI/2);
            switch (event.key) {
                case 'ArrowLeft':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.camera = cameraSet.camera5;
                    setCurrentCamera(cameraSet.camera5);
                    break;
                case 'ArrowRight':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.camera = cameraSet.camera6;
                    setCurrentCamera(cameraSet.camera6);
                    break;
                case 'ArrowUp':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera2);
                    break;
                case 'ArrowDown':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera4;
                    setCurrentCamera(cameraSet.camera4);
                    setPreviousCamera(cameraSet.camera2);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera5) {  // cyan
            setAngle(0);
            switch (event.key) {
                case 'ArrowRight':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.camera = cameraSet.camera2;
                    setCurrentCamera(cameraSet.camera2);
                    break;
                case 'ArrowDown':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera4;
                    setCurrentCamera(cameraSet.camera4);
                    setPreviousCamera(cameraSet.camera5);
                    break;
                case 'ArrowUp':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera5);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera6) {  // white
            setAngle(0);
            switch (event.key) {
                case 'ArrowLeft':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    // sceneState.camera = cameraSet.camera6;
                    // setCurrentCamera(cameraSet.camera6);
                    sceneState.camera = cameraSet.camera2;
                    setCurrentCamera(cameraSet.camera2);
                    break;
                case 'ArrowUp':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = cameraSet.camera3;
                    setCurrentCamera(cameraSet.camera3);
                    setPreviousCamera(cameraSet.camera6);
                    break;
                case 'ArrowDown':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
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
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = previousCamera;
                    setCurrentCamera(previousCamera);
                    break;
            }
        }

        if (currentCamera === cameraSet.camera4) {  // white
            switch (event.key) {
                case 'ArrowUp':
                    if (!isLoggedIn) {
                        // 로그인하지 않았다면 이동을 수행하지 않음
                        alert("Please Log In First!");
                        console.log("You must be logged in to move the camera.");
                        return;
                    }
                    sceneState.isMoving = true;
                    sceneState.camera = previousCamera;
                    setCurrentCamera(previousCamera);
                    break;
            }
        }

    }, [currentCamera, setCurrentCamera, rotateCamera, isLoggedIn]); 

    const handleSpaceBar = useCallback(() => {
        if (!isLoggedIn) {
            alert("Please Log In First!");
            console.log("You must be logged in to move the camera.");
            return;
        }
        if (currentCamera === cameraSet.camera1) {
            if(currentPage === PageState.Main){
                sceneState.camera = cameraSet.camera2;
                setCurrentCamera(cameraSet.camera2);
            } else {
                return;
            }
        }
        if (currentCamera === cameraSet.camera2 || currentCamera === cameraSet.camera3 || currentCamera === cameraSet.camera4 || currentCamera === cameraSet.camera5 || currentCamera === cameraSet.camera6){
            sceneState.camera = cameraSet.camera1;
            setCurrentCamera(cameraSet.camera1);
        }
    }, [currentCamera, isLoggedIn, currentPage]);

    const handlePlaneClick = useCallback(() => {
        if (!isLoggedIn) {
            // 로그인하지 않았다면 이동을 수행하지 않음
            alert("Please Log In First!");
            console.log("You must be logged in to move the camera.");
            return;
        }
        if (currentCamera === cameraSet.camera1) {
            if(currentPage === PageState.Main){
                sceneState.camera = cameraSet.camera2;
                setCurrentCamera(cameraSet.camera2);
            } else {
                return;
            }
        }
    }, [currentCamera, isLoggedIn, currentPage]);

    // 키보드 이벤트 리스너 업데이트
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                handleSpaceBar();
            }
            handleKeyDown(event);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [handleKeyDown, handleSpaceBar, isLoggedIn]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]); // handleKeyDown을 의존성 배열에 추가

    useEffect(() => {
        if (currentCamera === cameraSet.camera1) {
          setTimeout(() => {
            setShowMesh1(true);
          }, 100); // 카메라 이동 후 0.5초 뒤에 mesh 표시
        } else {
          setShowMesh1(false);
        }
    }, [currentCamera]);

    const meshSpring1 = useSpring({
        scale: showMesh1 ? 1.1 : 1, // 크기가 커졌다가 원래 크기로
        config: { tension: 150, friction: 10 },
    });

    useEffect(() => {
        if (currentCamera === cameraSet.camera2) {
          setTimeout(() => {
            setShowMesh2(true);
          }, 100); // 카메라 이동 후 0.5초 뒤에 mesh 표시
        } else {
          setShowMesh2(false);
        }
    }, [currentCamera]);

    const meshSpring2 = useSpring({
        scale: showMesh2 ? 1.1 : 1, // 크기가 커졌다가 원래 크기로
        config: { tension: 150, friction: 5 },
    });

    useEffect(() => {
        if (currentCamera === cameraSet.camera3) {
          setTimeout(() => {
            setShowMesh3(true);
          }, 100); // 카메라 이동 후 0.5초 뒤에 mesh 표시
        } else {
          setShowMesh3(false);
        }
    }, [currentCamera]);

    const meshSpring3 = useSpring({
        scale: showMesh3 ? 1.1 : 1, // 크기가 커졌다가 원래 크기로
        config: { tension: 150, friction: 10 },
    });

    useEffect(() => {
        if (currentCamera === cameraSet.camera4) {
          setTimeout(() => {
            setShowMesh4(true);
          }, 100); // 카메라 이동 후 0.5초 뒤에 mesh 표시
        } else {
          setShowMesh4(false);
        }
    }, [currentCamera]);

    const meshSpring4 = useSpring({
        scale: showMesh4 ? 1.1 : 1, // 크기가 커졌다가 원래 크기로
        config: { tension: 150, friction: 10 },
    });

    useEffect(() => {
        if (currentCamera === cameraSet.camera5) {
          setTimeout(() => {
            setShowMesh5(true);
          }, 100); // 카메라 이동 후 0.5초 뒤에 mesh 표시
        } else {
          setShowMesh5(false);
        }
    }, [currentCamera]);

    const meshSpring5 = useSpring({
        scale: showMesh5 ? 1.1 : 1, // 크기가 커졌다가 원래 크기로
        config: { tension: 150, friction: 10 },
    });

    useEffect(() => {
        if (currentCamera === cameraSet.camera6) {
          setTimeout(() => {
            setShowMesh6(true);
          }, 100); // 카메라 이동 후 0.5초 뒤에 mesh 표시
        } else {
            setShowMesh6(false);
        }
    }, [currentCamera]);

    const meshSpring6 = useSpring({
        scale: showMesh6 ? 1.1 : 1, // 크기가 커졌다가 원래 크기로
        config: { tension: 150, friction: 10 },
    });

    // 각 면의 위치와 회전
    const faces: Face[] = [
        { position: [halfSideSize, 0, 0], rotation: [0, -Math.PI / 2, 0], color: '#FFEFEF' }, // +x, white
        { position: [-halfSideSize, 0, 0], rotation: [0, Math.PI / 2, 0], color: '#FFEFEF' }, // -x green
        { position: [0, halfSideSize, 0], rotation: [Math.PI / 2, 0, 0], color: '#FFEFEF' }, // +y blue
        { position: [0, -halfSideSize, 0], rotation: [-Math.PI / 2, 0, 0], color: '#FFEFEF' }, // -y yellow
        { position: [0, 0, halfSideSize], rotation: [0, Math.PI, 0], color: '#FFEFEF' }, // +z  skyblue
        { position: [0, 0, -halfSideSize], rotation: [0, 0, 0], color: '#FFEFEF' } // -z pink
    ];

    const planes = [
        { width: 40, height: 27, radius: 1, color: '#000000', opacity: 0.8 },
        { width: 40, height: 27, radius: 1, color: '#000000', opacity: 0.8 },
        { width: 40, height: 27, radius: 1, color: '#000000', opacity: 0.8 },
        { width: 40, height: 27, radius: 1, color: '#000000', opacity: 0.8 },
        { width: 40, height: 27, radius: 1, color: '#000000', opacity: 0.8 },
        { width: 40, height: 27, radius: 1, color: '#000000', opacity: 0.8 },
        // ... 추가 RoundedPlane 객체들
      ];

    return (
        <div className="App" style={{ height: "100%", width: "100%" }}>
            <Canvas camera={{ position: [0, 0, 0], fov: 80 }} >
                <CameraAnimation />
                <OrbitControls enableZoom={false} enableRotate={false}/>
                <pointLight position={[0, 0, 0]} color="#FFFFFF" intensity={1000} castShadow={true} />
                {faces.map((face, index) => (
                    <group key={index}>
                        <mesh key={index} position={face.position as [number, number, number]} rotation={face.rotation as [number, number, number]}>
                            <planeGeometry attach="geometry" args={[sideSize, sideSize]} />
                            <meshLambertMaterial attach="material" color={face.color} />
                        </mesh>
                        <TextMesh text={`face #${index+1}`} position={face.position} rotation={face.rotation} color="black" />
                    </group>
                ))}
                {showMesh1 && (
                    <>
                        <pointLight position={[0, 0, 0]} color="#FFFFFF" intensity={1000} castShadow={true} />
                        <animated.mesh 
                            position={[14, 0, 0]} 
                            rotation={[0, -Math.PI / 2, 0]}
                            scale={meshSpring1.scale} // 애니메이션 적용
                            onClick={handlePlaneClick}
                            >
                            <RoundedPlane width={40} height={27} radius={1} color={"#000000"} opacity={0.8} transparent={true} />
                            <meshLambertMaterial attach="material" color={"#000000"} transparent={true} opacity={0.8} depthTest={false} />
                        </animated.mesh>
                        {content}
                    </>
                )}
                {showMesh2 && (
                    <>
                        <LightsComponent colors={[0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff]}/>
                        <animated.mesh scale={meshSpring2.scale} >
                            <Carousel planes={planes} position={[-14, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                        </animated.mesh>
                    </>
                )}
                {showMesh3 && (
                    <>
                        <LightsComponent colors={[0xFFFFFF, 0xFF5733, 0x733D31, 0x6A452C, 0xA2684B, 0x3D2217]}/>
                        <animated.mesh scale={meshSpring3.scale} >
                            <Carousel planes={planes} position={[0, 14, 0]} rotation={[Math.PI / 2, 0, angle]} />
                        </animated.mesh>
                    </>
                )}
                {showMesh4 && (
                    <>
                        <LightsComponent colors={[0x5F85BB, 0xFFFFFF, 0x05264E, 0x1A237E, 0x303F9F, 0x9FA8DA]}/>
                        <animated.mesh scale={meshSpring4.scale} >
                            <Carousel planes={planes} position={[0, -14, 0]} rotation={[-Math.PI / 2, 0, angle]} />
                        </animated.mesh>
                    </>
                )}
                {showMesh5 && (
                    <>
                        <LightsComponent colors={[0xF2AF06, 0xFFFFFF, 0xFDE06B, 0x999698, 0xFDC411, 0xC8C5C2]}/>
                        <animated.mesh scale={meshSpring5.scale} >
                            <Carousel planes={planes} position={[0, 0, 14]} rotation={[0, Math.PI, 0]} />
                        </animated.mesh>
                    </>
                )}
                {showMesh6 && (
                    <>
                        <LightsComponent colors={[0x69F0AE, 0x76FF03, 0x388E3C, 0xFFFFFF, 0xC6FF00, 0xB9F6CA]}/>
                        <animated.mesh scale={meshSpring6.scale} >
                            <Carousel planes={planes} position={[0, 0, -14]} rotation={[0, 0, 0]} />
                        </animated.mesh>
                    </>
                )}
                {/* <lineSegments>
                    <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(sideSize-0.1, sideSize-0.1, sideSize-0.1)]} />
                    <lineBasicMaterial attach="material" color="black" side={THREE.DoubleSide} linewidth={5} />
                </lineSegments> */}
            </Canvas>
            <ArrowDisplay showArrows={showArrows} showIndices={showIndices} onRotate={rotateCamera} currentCamera={currentCamera}/>
        </div>
    );
};

export default Cube;