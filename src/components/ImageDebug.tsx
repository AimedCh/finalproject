import React, { useState } from 'react';

interface ImageDebugProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageDebug: React.FC<ImageDebugProps> = ({ src, alt, className = '' }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  const handleLoad = () => {
    setStatus('loaded');
    console.log('✅ Image loaded successfully:', src);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setStatus('error');
    const errorMsg = `Failed to load: ${src}`;
    setError(errorMsg);
    console.error('❌ Image failed to load:', src, e);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Status indicator */}
      <div className="absolute top-2 left-2 z-10">
        {status === 'loading' && (
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Loading...
          </div>
        )}
        {status === 'loaded' && (
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">
            ✅ Loaded
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            ❌ Error
          </div>
        )}
      </div>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error message */}
      {status === 'error' && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-100 border border-red-300 text-red-700 text-xs p-2 rounded">
          {error}
        </div>
      )}

      {/* Debug info */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs p-1 rounded">
        {src.split('/').pop()}
      </div>
    </div>
  );
};

export default ImageDebug;
