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
  return (
    <Html position={position} style={{ transform: "translate(-50%, -70%)" }}>
        <div className="MyPage">
          <div className="top">
            <h2>My Workspace</h2>
            <IconButton aria-label="editprofile" onClick={() => onChangePage(PageState.EditProfile)} style={{ color: "#FFFFFF", marginRight: '3%' }}>
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
              <IconButton aria-label="addvideo" onClick={() => onChangePage(PageState.AddVideo)} style={{ color: "#FFFFFF", marginBottom: '0.5%' }} size="large">
                <AddBox />
              </IconButton>
            </div>
            <div className='video'>
            </div>
          </div>
        </div>
    </Html>
  );
};

export default MyPage;