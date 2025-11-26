import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/button/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './FloatingCardsGrid.css';

const FloatingCardsGrid = ({ images = [] }) => {
  const navigate = useNavigate();
  const [cardPositions, setCardPositions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize positions
  useEffect(() => {
    if (images.length > 0) {
      const shuffled = Array.from({ length: images.length }, (_, i) => i).sort(
        () => Math.random() - 0.5
      );
      setCardPositions(shuffled);
    }
  }, [images.length]);

  // Shuffle every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCardPositions((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Grid positions for desktop/tablet
  const getGridPositions = () => {
    if (isMobile) {
      return images.map(() => ({ width: 90, height: 90 }));
    } else if (window.innerWidth < 1024) {
      return [
        { x: 0, y: 0, width: 100, height: 120 },
        { x: 110, y: 0, width: 90, height: 120 },
        { x: 210, y: 20, width: 100, height: 90 },
        { x: 320, y: 0, width: 90, height: 110 },
        { x: 10, y: 130, width: 90, height: 100 },
        { x: 120, y: 150, width: 100, height: 100 },
        { x: 240, y: 120, width: 100, height: 110 },
        { x: 360, y: 140, width: 90, height: 100 },
      ];
    } else {
      return [
        { x: 0, y: 0, width: 120, height: 120 },
        { x: 140, y: 0, width: 100, height: 150 },
        { x: 260, y: 20, width: 130, height: 110 },
        { x: 410, y: 0, width: 110, height: 140 },
        { x: 20, y: 160, width: 110, height: 130 },
        { x: 160, y: 180, width: 120, height: 120 },
        { x: 310, y: 150, width: 130, height: 140 },
        { x: 460, y: 170, width: 110, height: 130 },
      ];
    }
  };

  const gridPositions = getGridPositions();

  const handleGalleryClick = () => {
    navigate('/about#gallery-section');
  };

  return (
    <div className="floating-cards-container">
      <div className={`floating-layout ${isMobile ? 'mobile-layout' : ''}`}>
        {cardPositions.map((imageIndex, position) => {
          if (position >= gridPositions.length) return null;
          const gridPos = gridPositions[position];
          const image = images[imageIndex];
          return (
            <motion.div
              key={position}
              className="floating-card"
              layout
              animate={{
                width: gridPos.width,
                height: gridPos.height,
                ...(isMobile ? {} : { x: gridPos.x, y: gridPos.y }),
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.6,
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <img src={image} alt={`Card ${position}`} />
            </motion.div>
          );
        })}
      </div>

      {/* View Gallery Button */}
      <div className="floating-gallery-button">
        <Button variant="secondary" onClick={handleGalleryClick}>
          View Gallery <FaArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default FloatingCardsGrid;
