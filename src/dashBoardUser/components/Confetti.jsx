import React, { useEffect } from 'react';

let confetti = []

const Confetti = () => {

  useEffect(() => {
    
    for (let index = 0; index < 20; index++) {

      if ( confetti.length >= 20 ) return

      const newConfetti = {
        left: `${Math.random() * 98}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`,
        transform: `rotate(${Math.random() * 360}deg)`,
      };
      confetti.push(newConfetti)
    }

  }, [])
  
  return (
    <div className="confetti-container">
      {confetti.map((confetto, index) => (
        <div
          key={index}
          className="confetto"
          style={confetto}
        />
      ))}
    </div>
  );
};

export default Confetti;
