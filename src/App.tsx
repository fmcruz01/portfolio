"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import arrowIcon from './assets/arrow.svg';
import heroImage from './assets/gradient.svg';
import sphere from './assets/sphere.svg';
import './App.css';
import { get } from 'http';

interface CarrouselImage {
  id: number;
  alt: string;
  description: string;
  src: any;
}

const CAROUSSEL_IMAGES: CarrouselImage[] = [
  {
    id: 1,
    alt: 'Image 1',
    description: 'Description for Image 1',
    src: sphere,
  },
  {
    id: 2,
    alt: 'Image 2',
    description: 'Description for Image 2',
    src: sphere,
  },
  {
    id: 3,
    alt: 'Image 2',
    description: 'Description for Image 2',
    src: sphere,
  }
];

const getScrollThreshold = () => {
  if (typeof window === 'undefined'){
    console.log('Window is undefined, returning default threshold of 500');
    return 500;
  }
  const size = Math.floor(window.innerHeight);
  console.log('Threshold set to:', size);
  return size;
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrollThreshold, setScrollThreshold] = useState(getScrollThreshold());
  
  useEffect(() => {
    const handleResize = () => {
      setScrollThreshold(getScrollThreshold()); // 10% of viewport height
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      if(scrollPosition > scrollThreshold) {
        const scrollAfterThreshold = scrollPosition - scrollThreshold;
        const newIndex = Math.min(Math.floor(scrollAfterThreshold / scrollThreshold), CAROUSSEL_IMAGES.length - 1);
        setActiveIndex(newIndex);
      } else {
        setActiveIndex(-1);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getCarouselClass = () => {
    if(!isScrolled) return '';
    return `slide-up slide-${activeIndex}`
  }

  return (
    <div className='page-container'>
      <div className='grid-container'>
        <nav className='navbar' role='navigation'>
          <div>
            <button>Home</button>
            <button>About</button>
          </div>
          <div>
            <button className='contact'>Email</button>
            <button className='contact'>Linkedin</button>
          </div>
        </nav>
        <div className={`hero-image ${isScrolled ? 'scrolled' : ''}`}>
          <img src={heroImage} alt="hero" />
        </div>
        <div className={`image-carousel ${getCarouselClass()}`}>
          {CAROUSSEL_IMAGES.map((image, index) => (
            <div key={image.id} className="carousel-item">
              <img src={image.src} alt={image.alt} />
              <p className='carousel-item-description'>{image.description}</p>
            </div>
          ))}
        </div>
        <div className='titles'>
          <div className="titles-div">
		        <span className={`title-span ${isScrolled ? 'scrolled' : ''}`}>Hello,</span>
		        <span className={`title-span ${isScrolled ? 'scrolled' : ''}`}>Selected</span>
          </div>
          <div className="titles-div">
            <span className={`title-span ${isScrolled ? 'scrolled' : ''}`}>I'm Inês.</span>
            <span className={`title-span ${isScrolled ? 'scrolled' : ''}`}>work</span>
          </div>
        </div>
        <p className="hero-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus veniam maiores voluptate dolorum harum? Nam hic ipsam blanditiis impedit doloremque sed, quis earum, ab suscipit quae, minus nemo numquam cumque.</p>
        <div className="bottom-icon">
          <img src={arrowIcon} alt="down-arrow" />
        </div>
      </div>
    </div>
  )
}

export default App
