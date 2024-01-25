import React, { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import './Join.css'
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from "axios";

type JoinProps = {
    position: [number, number, number];
    onGoToLogin: () => void;
};

const Join: React.FC<JoinProps> = ({ position, onGoToLogin }) => {
  const { camera, gl } = useThree();
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  
  const [hasfirstname, setHasfirstname] = useState<boolean>(true);
  const [haslastname, setHaslastname] = useState<boolean>(true);
  const [hasemail, setHasemail] = useState<boolean>(true);
  const [haspassword, setHaspassword] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isFormValid = firstname !== '' && lastname !== '' && email !== '' && password !== '' && password === confirm;

    // 유효성 검사 실패 시 함수 종료
    if (!isFormValid) {
        setIsPasswordMatch(password === confirm);
        setHasfirstname(firstname !== '');
        setHaslastname(lastname !== '');
        setHasemail(email !== '');
        setHaspassword(password !== '');
        return; // 여기서 함수 종료
    }
    //서버에 보낼 data 정의
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('id', email);
    formData.append('password', password);
    

    Array.from(formData).forEach(([key, value]) => {
        console.log(key, value);
      });

    try {
        if (!hasfirstname || !haslastname || !hasemail || !haspassword) return;
        const response = await axios.post('http://172.10.7.58:80/user/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        alert('Your account is successfully confirmed.');
        onGoToLogin();
    } catch (error) {
        console.error('There was an error!', error);
    }
    
};

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

  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
        <div className="joinfinal">
            <IconButton aria-label="editprofile" onClick={() => onGoToLogin()} style={{ color: "#FFFFFF", marginRight: '3%', position: 'absolute', left: '-37%', top: '20%' }}>
                <ArrowBack />
            </IconButton>
            <div className="Join">
                <form className="join-form">
                    <h1>Sign up to MSG</h1>
                    <div className='name-group'>
                        <div className='join-group'>
                            <label htmlFor='firstname'>First Name</label>
                            <input
                                type='text'
                                id='firstname'
                                name='firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                style={{ borderColor: hasfirstname ? '' : 'red' }}
                                placeholder='ex) Gil Dong'
                            />
                            {!hasfirstname && <div className='warning'>Missing First Name!</div>}
                        </div>
                        <div className='join-group'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input
                                type='text'
                                id='lastname'
                                name='lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                style={{ borderColor: haslastname ? '' : 'red' }}
                                placeholder='ex) Hong'
                            />
                            {!haslastname && <div className='warning'>Missing Last Name!</div>}
                        </div>
                        
                    </div>
                    <div className='join-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ borderColor: hasemail ? '' : 'red' }}
                        />
                        {!hasemail && <div className='warning'>Missing email!</div>}
                    </div>
                    <div className="join-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderColor: haspassword ? '' : 'red' }}
                        />
                        {!haspassword && <div className='warning'>Missing Password!</div>}
                    </div>
                    <div className="join-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirm" 
                            name="confirm" 
                            value={confirm} 
                            onChange={(e) => setConfirm(e.target.value)}
                            style={{ borderColor: isPasswordMatch ? '' : 'red' }}
                        />
                        {!isPasswordMatch && <div className='warning'>Password do not match</div>}
                    </div>
                    <div className='create'>
                        <button type="button" onClick={handleSubmit}>Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    </Html>
  );
};

export default Join;
