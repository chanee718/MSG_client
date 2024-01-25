import React, { useEffect, useState, useMemo } from 'react';
import { Html } from '@react-three/drei';
import Logout from './Logout';
import './MyPage.css';
import { IconButton } from '@mui/material';
import { Edit, AddBox } from '@mui/icons-material';
import axios from "axios";

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

  const userEmail = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');
  const [user, setUser] = useState<any>();
  const [thumbnails, setThumbnails] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const endpoint: string = `http://172.10.7.58:80/user/getusers?email=${userEmail}`;
        const response = await axios.get(endpoint);
        if (response.data) {
            setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(userEmail) {
        fetchUserData();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        console.log(userEmail);
        const endpoint: string = `http://172.10.7.58:80/contents/getthumbnail?email=${userEmail}`;
        const response = await axios.get(endpoint);
        if (response.data) {
            setThumbnails(response.data);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(userEmail) {
        fetchThumbnail();
        console.log(thumbnails)
    }
  }, [userEmail]);

  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
        <div className="MyPage">
        {user && (
          <>
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
              {user.profile ? (
                  <img src={`http://172.10.7.58:80/public/images/${user.profile}`} alt={`${user.profile} profile`} />
              ) : (
                <img src='/images/blankimg.png' alt={`profile`} />
              )}
              <div className='profile'>
                <p className='name'>{user.firstname} {user.lastname}</p>
                <p className='oneliner'>{user.memo}</p>
              </div>
            </div>
          </>
        )}
          <div className='bottom'>
            <div className='videotitle'>
              <h2>내 동영상</h2>
              <IconButton aria-label="addvideo" onClick={() => onChangePage(PageState.AddVideo)} sx ={{ color: "#FFFFFF", marginBottom: '0.5%', '&:hover': { color: 'orangered' } }}  size="large">
                <AddBox />
              </IconButton>
            </div>
            {thumbnails && (
              <div className='video'>
                {thumbnails.map((image, index) => (
                  <img key={index} src={image.thumbnail} alt={`Video ${index}`} className="video-item" />
                ))}
              </div>
            )}
          </div>
        </div>
    </Html>
  );
};

export default MyPage;