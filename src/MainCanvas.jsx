import React, { useRef, useEffect, useState, useCallback } from 'react'
import GrowingCircle from './GrowingCircle';

const MainCanvas = ({ ...props }) => {

  const canvasRef = useRef(null);

  const [circles, setCircles] = useState([]);
  const hue = useRef(null);
  const mousePos = useRef(null);

  /**
   * draw all the things
   */
  const renderStuff = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawBackground(context, hue.current);
    drawCircles(context, circles);
  }, [circles]);

  useEffect(() => {
    renderStuff();
  }, [renderStuff]);

  /**
   * update state of all the things
   */
  const tick = useCallback(() => {
    hue.current = (hue.current + 1) % 360;
    setCircles(circles => circles.filter(circle => circle.tick()));
  }, [])

  // run main tick loop
  useEffect(() => {
    console.log('setting interval')
    const interval = setInterval(() => {
      tick();
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, [tick]);

  // spawn a new GrowingCircle every period
  useEffect(() => {
    const interval = setInterval(() => {
      if (mousePos.current) {
        console.log(`spawning circle at ${mousePos.current.x}, ${mousePos.current.y}`);
        const newCircle = new GrowingCircle(
          getForegroundColor(hue.current),
          mousePos.current.x,
          mousePos.current.y,
          5,
          1000
        );
        setCircles(circles => [...circles, newCircle]);
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current;
    //report the mouse position on click
    canvas.addEventListener("mousemove", (evt) => {
      const newMousePos = getMousePos(canvas, evt);
      mousePos.current = newMousePos;
    }, false);
    canvas.addEventListener("mouseout", (evt) => {
      mousePos.current = null;
    }, false);
  }, [])

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} {...props} />
}

const getBackgroundColor = (hue) => {
  return `hsl(${hue}, 80%, 50%)`;
}

const getForegroundColor = (hue) => {
  return `hsl(${(hue + 180) % 360}, 80%, 50%)`;
}

const drawBackground = (context, hue) => {
  context.fillStyle = getBackgroundColor(hue);
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

/**
 * draw all the circles.
 * @param {CanvasRenderingContext2D} context 
 * @param {Array<GrowingCircle>} circles
 */
const drawCircles = (context, circles) => {
  for (const circle of circles) {
    // if (circle.needsRender()) {
    circle.render(context);
    // }
  }
}

/**
 * Get mouse position relative to a canvas event
 * @param {*} canvas 
 * @param {*} evt 
 * @returns 
 */
const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

export default MainCanvas