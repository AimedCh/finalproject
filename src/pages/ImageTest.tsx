import React from 'react';
import ImageDebug from '../components/ImageDebug';
import { assetUrl } from '../utils/assetUrl';

const ImageTest: React.FC = () => {
  const airpodsImages = [
    { src: assetUrl('img/imgAirPods/airpods4.jpeg'), alt: 'AirPods 4' },
    { src: assetUrl('img/imgAirPods/airpods43.jpeg'), alt: 'AirPods 4 ANC' },
    { src: assetUrl('img/imgAirPods/airpodspro3.jpeg'), alt: 'AirPods Pro 3' },
    { src: assetUrl('img/imgAirPods/airpodsmax.png'), alt: 'AirPods Max' }
  ];

  const rentalImages = [
    { src: assetUrl('img/imgAlquieres/habitacion1.png'), alt: 'Habitación 1' },
    { src: assetUrl('img/imgAlquieres/habitacion2.png'), alt: 'Habitación 2' },
    { src: assetUrl('img/imgAlquieres/habitacion3.png'), alt: 'Habitación 3' },
    { src: assetUrl('img/imgAlquieres/habitacion4.png'), alt: 'Habitación 4' },
    { src: assetUrl('img/imgAlquieres/mostaganem.jpg'), alt: 'Mostaganem' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Image Debug Test</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">📱 AirPods Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {airpodsImages.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <ImageDebug
                  src={image.src}
                  alt={image.alt}
                  className="h-48"
                />
                <div className="p-3">
                  <p className="text-sm font-medium">{image.alt}</p>
                  <p className="text-xs text-gray-500">{image.src}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🏠 Rental Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {rentalImages.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <ImageDebug
                  src={image.src}
                  alt={image.alt}
                  className="h-48"
                />
                <div className="p-3">
                  <p className="text-sm font-medium">{image.alt}</p>
                  <p className="text-xs text-gray-500">{image.src}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🎥 Video Test</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <video
              src={assetUrl('img/imgAlquieres/mosta4k.mp4')}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 object-cover"
              onError={(e) => {
                console.error('Video failed to load:', e);
              }}
              onLoadedData={() => {
                console.log('Video loaded successfully');
              }}
            />
            <div className="p-3">
              <p className="text-sm font-medium">Mostaganem Video</p>
              <p className="text-xs text-gray-500">/img/imgAlquieres/mosta4k.mp4</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Debug Instructions</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check browser console for error messages</li>
            <li>• Verify network tab shows successful image loads</li>
            <li>• Green checkmarks = images loaded successfully</li>
            <li>• Red X marks = images failed to load</li>
            <li>• Check if images are being served from correct path</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageTest;
