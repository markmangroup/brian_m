import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';

export default function MatrixRain({ 
  style = {}, 
  zIndex = 0, 
  intensity = 1,
  fontSize = 18,
  speed = 1 
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { currentTheme, getCurrentColors } = useTheme();

  // Detect mobile devices and tab visibility
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));
    };

    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Adjust parameters based on device and theme
    const adjustedFontSize = isMobile ? Math.max(fontSize * 0.7, 12) : fontSize;
    const adjustedIntensity = isMobile ? intensity * 0.5 : intensity;
    const adjustedSpeed = isMobile ? speed * 0.7 : speed;
    
    let columns = Math.floor(width / adjustedFontSize);
    let drops = Array(columns).fill(1);
    
    // Theme-aware character sets and colors
    const getCharacterSet = () => {
      switch (currentTheme) {
        case 'witcher':
          return 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        case 'nightcity':
          return '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF[]{}()<>*&^%$#@!';
        default: // matrix
          return 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      }
    };

    const getThemeColors = () => {
      const currentColors = getCurrentColors();
      if (currentColors) {
        return {
          primary: currentColors.textPrimary,
          fade: currentColors.primary + '80', // Add transparency
          background: currentColors.primary + '20'
        };
      }
      // Fallback colors
      return {
        primary: '#00FF41',
        fade: '#00000080',
        background: '#00000020'
      };
    };

    const chars = getCharacterSet();
    const colors = getThemeColors();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / adjustedFontSize);
      drops = Array(columns).fill(1);
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
      // Skip drawing if tab is not visible or on mobile with low battery
      if (!isTabVisible) {
        return;
      }

      // Reduce intensity when tab is inactive or on mobile
      const currentIntensity = isTabVisible ? adjustedIntensity : adjustedIntensity * 0.3;
      
      // Background fade effect
      ctx.fillStyle = colors.fade;
      ctx.fillRect(0, 0, width, height);
      
      // Set font and color
      ctx.font = `${adjustedFontSize}px monospace`;
      ctx.fillStyle = colors.primary;
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > (1 - currentIntensity)) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * adjustedFontSize;
          const y = drops[i] * adjustedFontSize;
          
          // Add glow effect for certain themes
          if (currentTheme === 'nightcity') {
            ctx.shadowColor = colors.primary;
            ctx.shadowBlur = 10;
          }
          
          ctx.fillText(text, x, y);
          
          // Reset shadow
          ctx.shadowBlur = 0;
          
          // Reset drop position with theme-specific probability
          const resetProbability = currentTheme === 'witcher' ? 0.98 : 0.975;
          if (drops[i] * adjustedFontSize > height && Math.random() > resetProbability) {
            drops[i] = 0;
          }
          
          drops[i] += adjustedSpeed;
        }
      }
    }

    function animate() {
      draw();
      // Reduce frame rate when tab is not visible
      const delay = isTabVisible ? 0 : 200;
      animationRef.current = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [currentTheme, getCurrentColors, isTabVisible, isMobile, intensity, fontSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex,
        ...style,
      }}
      width={typeof window !== 'undefined' ? window.innerWidth : 800}
      height={typeof window !== 'undefined' ? window.innerHeight : 600}
      aria-hidden="true"
    />
  );
} 
