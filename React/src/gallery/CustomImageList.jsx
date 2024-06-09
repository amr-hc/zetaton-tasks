import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FreeSolo from './FreeSolo';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  const [itemData, setItemData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api.pexels.com/v1/search', {
            headers: {
              Authorization: 'WkUcCnKyVqvhXCCWROZyPfXZJrJIMyTSreOHqjp5KpeSbu1hGDZ4Lvo7',
            },
            params: {
              query: query,
            },
          });
          const data = response.data.photos.map(photo => ({
            img: photo.src.large,
            title: photo.photographer,
            author: photo.photographer,
          }));
          setItemData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <>
      <FreeSolo onSearch={handleSearch} />
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
                  >
                    <StarBorderIcon />
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
