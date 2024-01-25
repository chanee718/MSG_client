import React, { useEffect, useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import './EditProfile.css';
import { IconButton, TextField, Fab, Button } from '@mui/material';
import { ArrowBack, Edit, Save } from '@mui/icons-material';
import axios from "axios";

enum PageState {
    Main,
    AddVideo,
    EditProfile,
    Login,
    Join
}

type EditProfileProps = {
    position: [number, number, number];
    onChangePage: (newPage: PageState) => void;
};

const EditProfile: React.FC<EditProfileProps> = ({ position, onChangePage }) => {
  const [user, setUser] = useState<any>();
  const [newFirstname, setNewFirstname] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [oneliner, setOneliner] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('/images/blankimg.png');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userEmail = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');

  const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstname(e.target.value);
    console.log("dfs", user);
  };
  const handleLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastname(e.target.value);
  };
  const handleOnelinerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOneliner(e.target.value);
  };
  

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleEditButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    // 로그인 로직 처리
    const formData = new FormData();

    console.log(newFirstname);
    console.log(newLastname);
    console.log(oneliner);
    console.log(selectedImage);

    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
        formData.append('profileImage', fileInputRef.current.files[0]);
    }
    formData.append('firstname', newFirstname);
    formData.append('lastname', newLastname);
    formData.append('memo', oneliner);
    formData.append('id', userEmail || '');
    try {
        //서버에 로그인 요청 보내기
        const response = await axios.post('http://172.10.7.58:80/user/updateuser', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        });
        // 로그인 성공 처리
        console.log('Login Successful:', response.data);

        alert("Profile updated successfully!");
        onChangePage(PageState.Main);
        
    } catch (error) {
        console.log(error);
        alert('Error while updating profile');
    }
};


  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
        {user && (
            <div className="EditProfile">
                <div className="EPtop">
                    <h2>Edit Profile</h2>
                </div>
                <div className="EPbody">
                    <div className='image-container'>
                        <img src={selectedImage} alt={`profile`} />
                        <Fab 
                            aria-label="edit" 
                            className='edit-button' 
                            style={{backgroundColor: 'orangered', color: 'white', scale: '0.7', position: 'absolute', right: '0%', bottom: '5%'}}
                            onClick={handleEditButtonClick} >
                            <Edit style={{width: '50%', height: '50%'}}/>
                        </Fab>
                        <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleImageChange}
                        />
                    </div>
                    <div className='edit'>
                        <div className='editname'>
                            <TextField label="First Name" variant="outlined" className="en" onInput={handleFirstChange} style={{borderColor: 'white'}} />
                            <TextField label="Last Name" variant="outlined" className="en" onInput={handleLastChange} style={{borderColor: 'white'}} />
                        </div>
                        <div className='oneliner'>
                            <TextField label="One-liner" variant="outlined" className="ol" onInput={handleOnelinerChange} style={{borderColor: 'white'}} />
                        </div>
                    </div>
                </div>
                <div className='EPbottom'>
                <Button variant="outlined" startIcon={<Save />} style={{color: 'orangered', borderColor: 'orangered'}} onClick={handleSave}>
                    Save Profile
                </Button>
                </div>
            </div>
        )}
        <IconButton aria-label="editprofile" onClick={() => onChangePage(PageState.Main)} style={{ color: "#FFFFFF", marginRight: '3%', position: 'absolute', left: '3%', top: '-1%' }}>
            <ArrowBack />
        </IconButton>
    </Html>
  );
};

export default EditProfile;