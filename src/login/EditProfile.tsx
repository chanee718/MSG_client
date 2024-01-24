import React, { useEffect, useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import './EditProfile.css';
import { IconButton, TextField, Fab, Button } from '@mui/material';
import { ArrowBack, Edit, Save } from '@mui/icons-material';

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
  const [newFirstname, setNewFirstname] = useState('');
  const [newLastname, setNewLastname] = useState('');
  const [oneliner, setOneliner] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('/images/blankimg.png');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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


  return (
    <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
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
                        <TextField label="Last Name" variant="standard" className="en" value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
                        <TextField label="First Name" variant="standard" className="en" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
                    </div>
                    <div className='oneliner'>
                        <TextField label="One-liner" variant="standard" className="ol" value={oneliner} onChange={(e) => setOneliner(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='EPbottom'>
            <Button variant="outlined" startIcon={<Save />} style={{color: 'orangered', borderColor: 'orangered'}}>
                Save Profile
            </Button>
            </div>
        </div>
        <IconButton aria-label="editprofile" onClick={() => onChangePage(PageState.Main)} style={{ color: "#FFFFFF", marginRight: '3%', position: 'absolute', left: '3%', top: '-1%' }}>
            <ArrowBack />
        </IconButton>
    </Html>
  );
};

export default EditProfile;