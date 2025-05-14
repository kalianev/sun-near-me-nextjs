import { useState, useEffect } from 'react';
import Image from 'next/image';

const PhotoCycle = () => {
  const images = [
    '/photo-cycle/shaswot-bhandari-bbim6oYQ0Fk-unsplash.jpg',
    '/photo-cycle/alice-donovan-rouse-UweNcthlmDc-unsplash.jpg',
    '/photo-cycle/bolun-yan-0u54iuIZx-U-unsplash.jpg',
    '/photo-cycle/jasper-boer-1fUu0dratoM-unsplash.jpg',
    '/photo-cycle/francois-olwage-hzj3riWUaaw-unsplash.jpg',
    '/photo-cycle/kartik-gada-eXEQyNNAvs8-unsplash.jpg',
    '/photo-cycle/javier-miranda-nuQDpvBqlWo-unsplash.jpg',
    '/photo-cycle/benjamin-patin-HqKJs8ocv60-unsplash.jpg',
    '/photo-cycle/fabian-struwe-4cloovdyuvw-unsplash.jpg',
    '/photo-cycle/neenu-vimalkumar-JWJDwzM58PQ-unsplash.jpg',
    '/photo-cycle/stefano-alemani-Gb_7hOjMa3s-unsplash.jpg',
    '/photo-cycle/barth-bailey-f3a694V2LRA-unsplash.jpg',
    '/photo-cycle/mateusz-bajdak-mJlHnJfrlNc-unsplash.jpg',
    '/photo-cycle/malhaar-kale-TRy_sAlcEgc-unsplash.jpg',
    '/photo-cycle/alex-braga-Cbwmy0_qsu0-unsplash.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px] relative overflow-hidden">
      <div
        className="w-full h-full transition-opacity duration-500 ease-in-out"
        style={{ opacity: 1 }}
      >
        <Image
          src={images[currentIndex]}
          alt={`Cycling image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default PhotoCycle; 