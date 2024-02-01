import React, { useState, useEffect } from 'react'
import styles from '@/component/Slider/Slider.module.css'

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://cdn.pixabay.com/photo/2023/02/15/06/08/hypnosis-7791027__480.jpg',
    'https://cdn.pixabay.com/photo/2023/02/14/17/23/flower-7790105__480.jpg',
    'https://cdn.pixabay.com/photo/2023/02/14/16/59/bird-7790051__480.jpg',
    'https://cdn.pixabay.com/photo/2023/02/15/06/07/clock-7791024__480.jpg',
  ];

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
      }, 3000);

      return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className={styles["slider"]}>
      <img src={images[currentImage]} alt="slider" />
    </div>
  )
}

export default ImageSlider