'use client'
import {RefObject, useEffect} from "react";

export default function initCanvas({canvasRef}: { canvasRef: RefObject<HTMLCanvasElement | null> }) {
  if (!canvasRef.current) {
    return
  }
  const initial = canvasRef.current;
  if (!initial) return;
  const ctx = initial.getContext('2d');
  if (!ctx) return;
  return canvasRef.current.getContext('2d');

}

export function setupCanvas(canvas, drawFn) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;      // CSS-пиксели
    const height = rect.height;

    if (width === 0 || height === 0) return;

    const bufferWidth = Math.round(width * dpr);   // ← вычисляем ЗДЕСЬ
    const bufferHeight = Math.round(height * dpr);

    if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
      canvas.width = bufferWidth;
      canvas.height = bufferHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    drawFn(ctx, width, height);   // ← рисуем с CSS-размерами
  };

  resize();   // первый вызов
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  return () => observer.disconnect();
}