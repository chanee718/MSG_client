import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import './Login.css'
import axios from 'axios';
import { useAuth } from '../types/AuthContext';

type LoginProps = {
    position: [number, number, number];
};

const Login: React.FC<LoginProps & { onJoinClick: () => void }> = ({ position, onJoinClick }) => {
  const { camera, gl } = useThree();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { logIn } = useAuth();

  useEffect(() => {
    const updateVisibility = () => {
      // Check if camera and gl.domElement are available
      if (camera && gl.domElement) {
        const vector = new THREE.Vector3(...position);
        vector.project(camera);
        // Calculate the position and set visibility to true
        setIsVisible(true);
      }
    };
    // Call the updateVisibility function
    updateVisibility();
  }, [position, camera, gl]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 로그인 로직 처리
    const formData = new FormData();
    formData.append('id', email);
    formData.append('password', password);
    try {
        //서버에 로그인 요청 보내기
        const response = await axios.post('http://172.10.7.58:80/user/login', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
        // 로그인 성공 처리
        console.log('Login Successful:', response.data);

        logIn(email, remember);
        
    } catch (error) {
        console.log(error);
        alert('The email or password do not match');
    }
};

  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
      <div className="Login">
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="remember-me">
                <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)} />
                <span></span>
                <label htmlFor="remember"><span></span>Keep me signed in</label>
                <button>
                    <span>Reset Password</span>
                </button>
            </div>
            <div className='login'>
                <button type="submit">Login</button>
            </div>
            <div className='join'>
                <p>Don't have an account?</p>
                <button type="button" onClick={onJoinClick} >
                    <span>JOIN</span>
                </button>
            </div>
        </form>
      </div>
    </Html>
  );
};

export default Login;