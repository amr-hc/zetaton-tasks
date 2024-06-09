import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFavoriteImages, deleteFromFavorites } from "../api/DB";
import { useNavigate } from 'react-router-dom';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Favorite() {
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async (ids) => {
    try {
      const promises = ids.map(async (id) => {
        const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
          headers: {
            Authorization: 'WkUcCnKyVqvhXCCWROZyPfXZJrJIMyTSreOHqjp5KpeSbu1hGDZ4Lvo7',
          },
        });
        return {
          img: response.data.src.large,
          title: response.data.photographer,
          author: response.data.photographer,
          id: id
        };
      });

      const data = await Promise.all(promises);
      setItemData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    const initialize = async () => {
      const id_photos = await getFavoriteImages();
      fetchData(id_photos);
    };

    initialize();

    
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const handleDeleteFromFavorites = async (idToDelete) => {
    try {
      await deleteFromFavorites(idToDelete);
      const id_photos = await getFavoriteImages();
      fetchData(id_photos);
    } catch (error) {
      console.error('Error deleting from favorites:', error);
    }
  };

  return (
    <>
      <ImageList
        sx={{
          width: '100%',
          height: '100vh',
          transform: 'translateZ(0)',
        }}
        cols={4}
        gap={8}
      >
        {itemData.map((item) => {
          const cols = 1; 
          const rows = 1; 

          return (
            <ImageListItem key={item.img} cols={cols} rows={rows}>
              <img
                {...srcset(item.img, 250, 200, rows, cols)}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                    onClick={() => handleDeleteFromFavorites(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
}
