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
    alt: 'Sphere',
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
    return 500;
  }
  
  const viewportHeight = window.innerHeight;
  const totalScrollHeight = 4 * viewportHeight;
  const availableScroll = totalScrollHeight - viewportHeight;
  
  // Start animations after one viewport height
  const startThreshold = viewportHeight;
  
  // Distribute remaining scroll evenly across carousel items
  const remainingScroll = availableScroll - startThreshold;
  const stepSize = remainingScroll / CAROUSSEL_IMAGES.length;
  return stepSize;
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [stepSize, setStepSize] = useState(getScrollThreshold());
  
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => setStepSize(getScrollThreshold()), 100);
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
      if(scrollPosition > stepSize) {
        const scrollPositionAfterStep = scrollPosition - stepSize;
        const newIndex = Math.min(Math.floor(scrollPositionAfterStep / stepSize), CAROUSSEL_IMAGES.length - 1);
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
            <a>Home</a>
            <a>About</a>
          </div>
          <div>
            <a target='_blank' href='https://mail.google.com/mail/?view=cm&fs=1&to=mimbentes@gmail.com' className='contact'>mimbentes@gmail.com</a>
            <a target='_blank' href="https://www.linkedin.com/in/in%C3%AAs-bentes-697398215/" className='contact'>Linkedin</a>
          </div>
        </nav>
        <div className={`hero-image ${isScrolled ? 'scrolled' : ''}`}>
          <img src={heroImage} alt="hero" />
        </div>
        <div className={`image-carousel ${getCarouselClass()}`}>
          {CAROUSSEL_IMAGES.map((image, index) => (
            <div key={image.id} className="carousel-item">
              <img src={image.src} alt={image.alt} />
              <div className="carousel-item-description">
                <span>{image.alt}</span>
                <span>{image.description}</span>
              </div>
              
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
        <p className="hero-text">Here comes a three or four line description about my work philosophy and my key traits and skills as a product designer.</p>
        <div className="bottom-icon">
          <img src={arrowIcon} alt="down-arrow" />
        </div>
      </div>
    </div>
  )
}

export default App
