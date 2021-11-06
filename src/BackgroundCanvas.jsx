import React, { useRef, useEffect, useState } from 'react'

const BackgroundCanvas = props => {

  const canvasRef = useRef(null);

  const [hue, setHue] = useState(0);
  const getColor = () => {
    return 'hsl(hue, 80, 50)';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    //Our first draw
    context.fillStyle = getColor();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, [hue]);

  setInterval(() => {
    setHue((hue + 1) % 256);
    console.log(hue);
  }, 10)

  return <canvas ref={canvasRef} {...props} />
}

export default BackgroundCanvas