"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import arrowIcon from './assets/arrow.svg';
import heroImage from './assets/gradient.svg';
import sphere from './assets/sphere.svg';
import './App.css';

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
  },
  {
    id: 4,
    alt: 'Image 2',
    description: 'Description for Image 2',
    src: sphere,
  },
  {
    id: 5,
    alt: 'Image 2',
    description: 'Description for Image 2',
    src: sphere,
  }
];

const NAV_ITEMS = ['Home', 'About'] as const;
const SCROLL_THRESHOLD = 10;

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <div className={`image-carousel ${isScrolled ? 'visible' : ''}`}>
          {CAROUSSEL_IMAGES.map((image, index) => (
            <div key={image.id} className={`carousel-item ${index === 0 && isScrolled ? 'slide-up' : ''}`}>
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
        <p className={`hero-text ${isScrolled ? 'scrolled' : ''}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus veniam maiores voluptate dolorum harum? Nam hic ipsam blanditiis impedit doloremque sed, quis earum, ab suscipit quae, minus nemo numquam cumque.</p>
        <div className="bottom-icon">
          <img src={arrowIcon} alt="down-arrow" />
        </div>
      </div>
    </div>
  )
}

export default App
