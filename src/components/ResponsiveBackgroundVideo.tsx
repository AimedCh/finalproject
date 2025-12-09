import React, { useState, useRef, useEffect } from 'react';

interface ResponsiveBackgroundVideoProps {
  mobileSrc: string;
  tabletSrc: string;
  desktopSrc: string;
  posterSrc: string;
  className?: string;
}

const ResponsiveBackgroundVideo: React.FC<ResponsiveBackgroundVideoProps> = ({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  posterSrc,
  className = ''
}) => {
  const [videoSrc, setVideoSrc] = useState(desktopSrc);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine appropriate video source based on screen size
  useEffect(() => {
    const updateVideoSource = () => {
      const width = window.innerWidth;
      
      if (width <= 768) {
        setVideoSrc(mobileSrc);
      } else if (width <= 1024) {
        setVideoSrc(tabletSrc);
      } else {
        setVideoSrc(desktopSrc);
      }
    };

    updateVideoSource();
    window.addEventListener('resize', updateVideoSource);
    return () => window.removeEventListener('resize', updateVideoSource);
  }, [mobileSrc, tabletSrc, desktopSrc]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleError = () => {
      setHasError(true);
      setIsVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Background image fallback */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${posterSrc})`,
          zIndex: hasError || !isVideoLoaded ? 1 : 0
        }}
      />

      {/* Video element */}
      {!hasError && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: isVideoLoaded && isPlaying ? 2 : 0 }}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />
      )}
    </div>
  );
};

export default ResponsiveBackgroundVideo;