import React, { useState, useCallback } from 'react';
import { animated, useSpring, to } from '@react-spring/three';
import RoundedPlane from '../shapes/RoundedPlane';
import { Html } from '@react-three/drei';
import './ShowVideo.css';

  type VideoProps = {
    url: string;
    title: string;
    artist: string;
    genre: string;
    thumbnail: string;
  };
  
  type ShowVideoProps = {
    video: VideoProps;
    position: [number, number, number];
    onVideoEnd: () => void;
  };
  
  const ShowVideo: React.FC<ShowVideoProps> = ({ video, position, onVideoEnd }) => { 
      const getGenreEmoji = () => {
        switch (video.genre) {
          case '밴드':
            return '🎶';
          case '키보드':
            return '🎹';
          case '기타':
            return '🎸';
          case '드럼':
            return '🥁';
          case '베이스':
            return '🪕';
          default:
            return '🎧';
        }
      }; 
      return (
          <Html position={position} style={{ transform: "translate(-50%, -50%)" }}>
            <div className='SV'>
              <div className='showvideo'>
                <video src={video.url} controls autoPlay className='showvideo' onEnded={onVideoEnd}/>
                <div className='explain'>
                    <div className='ta'>
                        <h2>{video.title}</h2>
                        <p><span>Artist :</span> {video.artist}</p>
                    </div>
                    <div className='g'>
                        <h2>{getGenreEmoji()} {video.genre}</h2>
                    </div>
                </div>
              </div>
            </div>
          </Html>
      ); 
  };
  
  export default ShowVideo;