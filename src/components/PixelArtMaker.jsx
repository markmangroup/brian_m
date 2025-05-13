import React, { useState, useRef, useEffect } from 'react';
import { FaPaintBrush, FaEraser, FaLock, FaImages } from 'react-icons/fa';

const PixelArtMaker = () => {
  const [selectedColor, setSelectedColor] = useState('#00ff00');
  const [tool, setTool] = useState('brush');
  const [pixels, setPixels] = useState(Array(256).fill('#1f2937'));
  const [showGallery, setShowGallery] = useState(false);
  const [privateGallery, setPrivateGallery] = useState([]);
  const canvasRef = useRef(null);

  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ffffff', '#000000'
  ];

  // Draw pixels to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 96, 96);
    for (let i = 0; i < 256; i++) {
      ctx.fillStyle = pixels[i];
      ctx.fillRect((i % 16) * 6, Math.floor(i / 16) * 6, 6, 6);
    }
  }, [pixels]);

  // Load private gallery from localStorage
  useEffect(() => {
    const priv = JSON.parse(localStorage.getItem('pixelArtPrivateGallery') || '[]');
    setPrivateGallery(priv);
  }, []);

  // Handle pixel click
  const handlePixelClick = (i) => {
    setPixels(pixels => {
      const newPixels = [...pixels];
      newPixels[i] = tool === 'eraser' ? '#1f2937' : selectedColor;
      return newPixels;
    });
  };

  // Save to private gallery
  const savePrivate = () => {
    const priv = JSON.parse(localStorage.getItem('pixelArtPrivateGallery') || '[]');
    const dataUrl = canvasRef.current.toDataURL();
    const newArt = { image: dataUrl, created: Date.now() };
    const updated = [newArt, ...priv];
    localStorage.setItem('pixelArtPrivateGallery', JSON.stringify(updated));
    setPrivateGallery(updated);
    alert('Saved to your private gallery!');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8 flex items-center">
        <FaPaintBrush className="mr-4" /> Pixel Artist
      </h1>

      <div className="bg-gray-800/50 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
        <div className="flex space-x-4 mb-6">
          <div className="flex space-x-2">
            {colors.map(color => (
              <button
                key={color}
                className={`w-8 h-8 rounded-lg transition-transform ${
                  selectedColor === color ? 'transform scale-110 ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="border-l border-gray-600 mx-4" />

          <button
            className={`p-2 rounded-lg ${
              tool === 'brush' ? 'bg-cyan-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setTool('brush')}
          >
            <FaPaintBrush className="text-white" />
          </button>

          <button
            className={`p-2 rounded-lg ${
              tool === 'eraser' ? 'bg-cyan-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setTool('eraser')}
          >
            <FaEraser className="text-white" />
          </button>
        </div>

        <div className="grid grid-cols-16 gap-1 bg-gray-900 p-4 rounded-xl">
          {pixels.map((color, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-sm hover:opacity-75 cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => handlePixelClick(i)}
            />
          ))}
        </div>
        <canvas ref={canvasRef} width={96} height={96} style={{ display: 'none' }} />
        <div className="mt-6 flex flex-col md:flex-row gap-2 justify-end">
          <button
            className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
            onClick={savePrivate}
          >
            <FaLock />
            <span>Save to Private Gallery</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            onClick={() => setShowGallery(true)}
          >
            <FaImages />
            <span>View Gallery</span>
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
              onClick={() => setShowGallery(false)}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Your Private Gallery</h2>
            <div className="grid grid-cols-4 gap-4">
              {privateGallery.map((art, i) => (
                <img key={i} src={art.image} alt="Private Art" className="rounded-lg border border-gray-700" />
              ))}
              {privateGallery.length === 0 && <div className="text-white">No private art yet.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PixelArtMaker; 