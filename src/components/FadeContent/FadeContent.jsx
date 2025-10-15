import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FadeContent.css';

const FadeContent = ({
  children,
  delay = 0,
  duration = 0.6,
  className = ''
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 20
    });

    // Animate in
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'power3.out'
    });
  }, [delay, duration]);

  return (
    <div ref={elementRef} className={`fade-content ${className}`}>
      {children}
    </div>
  );
};

export default FadeContent;
