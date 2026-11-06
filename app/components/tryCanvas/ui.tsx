'use client'
import {useEffect, useRef} from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const m = (x,y) => ctx.moveTo(x,y)
    const l = (x,y) => ctx.lineTo(x,y)
    const at = (x1, y1, x2, y2, r) => ctx.arcTo(x1, y1, x2, y2, r)
    const jXL = 100
    const jXR = 150
    const jXC = (jXR + jXL) / 2
    const jYT = 100
    const jYB = 150
    const jYC = (jYT + jYB) / 2
    m(jXL, jYC)
    at(jXL + 5, jYC - 5, jXC, jYT, 3)
    l(jXC, jYT)
    ctx.strokeStyle = 'black'
    ctx.stroke()

  }, []);

  return (

    <div className='try-canvas'>
      <canvas ref={canvasRef} width={300} height={300}></canvas>
    </div>
  )
}