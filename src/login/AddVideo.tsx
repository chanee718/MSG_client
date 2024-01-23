import React, { useEffect, useState, useMemo } from 'react';
import { Html } from '@react-three/drei';
import './MyPage.css';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

enum PageState {
    Main,
    AddVideo,
    EditProfile,
    Login,
    Join
}


type AddVideoProps = {
    position: [number, number, number];
    onChangePage: (newPage: PageState) => void;
};

const AddVideo: React.FC<AddVideoProps> = ({ position, onChangePage }) => {
  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
        <div className="MyPage">
            <div className="top">
            <h2>Upload Video</h2>
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
            </div>
            <div className='video'>
            </div>
            </div>
        </div>
        <IconButton aria-label="editprofile" onClick={() => onChangePage(PageState.Main)} style={{ color: "#FFFFFF", marginRight: '3%' }}>
            <ArrowBack />
        </IconButton>
    </Html>
  );
};

export default AddVideo;