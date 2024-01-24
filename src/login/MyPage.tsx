import React, { useEffect, useState, useMemo } from 'react';
import { Html } from '@react-three/drei';
import Logout from './Logout';
import './MyPage.css';
import { IconButton } from '@mui/material';
import { Edit, AddBox } from '@mui/icons-material';

enum PageState {
    Main,
    AddVideo,
    EditProfile,
    Login,
    Join
}

type MyPageProps = {
    position: [number, number, number];
    onChangePage: (newPage: PageState) => void;
};

const MyPage: React.FC<MyPageProps> = ({ position, onChangePage }) => {
  
  const imageList = [
    '/images/image1.jpg',
    '/images/image2.png',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
    '/images/image7.jpg',
    '/images/image8.jpg',
    '/images/image9.jpg',
    '/images/image10.jpg',
    '/images/image11.jpg',
    '/images/image12.jpg',
    '/images/image13.jpg',
    '/images/image14.jpg',
    '/images/image15.jpg',
  ];

  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
        <div className="MyPage">
          <div className="top">
            <h2>My Workspace</h2>
            <IconButton 
              aria-label="editprofile" 
              onClick={() => onChangePage(PageState.EditProfile)} 
              sx={{
                color: '#FFFFFF', // 기본 색상
                marginRight: '3%',
                '&:hover': {
                  color: 'orangered', // 호버 시 색상 변경
                },
              }}
               >
              <Edit />
            </IconButton>
            <Logout />
          </div>
          <div className="body">
            <img src='/images/blankimg.png' alt={`profile`} />
            <div className='profile'>
              <p className='name'>Seung Chan Hwang</p>
              <p className='oneliner'>one-liner</p>
            </div>
          </div>
          <div className='bottom'>
            <div className='videotitle'>
              <h2>내 동영상</h2>
              <IconButton aria-label="addvideo" onClick={() => onChangePage(PageState.AddVideo)} sx ={{ color: "#FFFFFF", marginBottom: '0.5%', '&:hover': { color: 'orangered' } }}  size="large">
                <AddBox />
              </IconButton>
            </div>
            <div className='video'>
              {imageList.map((image, index) => (
                <img key={index} src={image} alt={`Video ${index}`} className="video-item" />
              ))}
            </div>
          </div>
        </div>
    </Html>
  );
};

export default MyPage;