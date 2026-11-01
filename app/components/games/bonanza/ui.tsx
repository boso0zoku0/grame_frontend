'use client'
import './ui.scss'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {setupCanvas} from "@/app/helpers/canvas";
import tabPanelCoord from "@/app/components/games/bonanza/coordinates";


export default function Bonanza() {
  const slotRef = useRef<HTMLCanvasElement | null>(null);
  const tabRef = useRef<HTMLCanvasElement | null>(null);
  const buttonsRef = useRef<CanvasButton[]>([])
  const dotDownPath = useRef<Path2D | null>(null)
  const dotUpPath = useRef<Path2D | null>(null)
  const dotDownMinusPath = useRef<Path2D | null>(null)
  const dotUpPlusPath = useRef<Path2D | null>(null)
  const isSignScale = useRef(false)
  const money = useRef(100)

  interface CanvasButton {
    path: Path2D
    defaultColor: string
    hoverColor: string
    isHovered: boolean
    onClick?: () => void
    draw: (ctx: CanvasRenderingContext2D) => void
  }

  function createButton(
    path: Path2D,
    defaultColor: string,
    hoverColor: string,
    onClick?: () => void
  ): CanvasButton {
    return {
      path,
      defaultColor,
      hoverColor,
      isHovered: false,
      onClick,
      draw(ctx) {
        ctx.fillStyle = this.isHovered ? this.hoverColor : this.defaultColor
        ctx.fill(this.path)
      },
    }
  }


  useEffect(() => {
    return setupCanvas(slotRef.current, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#623d63';
      ctx.fillRect(0, 0, w, h);
    });
  }, []);

  const drawFn = useCallback((ctx, w, h) => {
    const c = tabPanelCoord(w, h)

    if (!tabRef.current) {
      return;
    }
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath()
    const gradient = ctx.createLinearGradient(0, 0, 0, c.tabYB)
    gradient.addColorStop(0, '#96318a')
    gradient.addColorStop(0.8, '#4b2343')
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    const dotDown = dotDownBuild()
    const dotDownMinus = dotDownMinusBuild()
    const dotUp = dotUpBuild()
    const dotUpPlus = dotUpPlusBuild()
    dotDownPath.current = dotDown
    dotUpPath.current = dotUp
    dotDownMinusPath.current = dotDownMinus
    dotUpPlusPath.current = dotUpPlus
    dotDownDraw(dotDown, c.defaultColorTabDots)
    dotUpDraw(dotUp, c.defaultColorTabDots)
    dotDownMinusDraw(dotDownMinus)
    dotUpPlusDraw(dotUpPlus)


    ctx.beginPath()
    ctx.moveTo(c.betPanelXL + c.round, c.betPanelYT)
    ctx.lineTo(c.betPanelXL + c.betPanelW - c.round, c.betPanelYT)
    ctx.arcTo(c.betPanelXL + c.betPanelW, c.betPanelYT, c.betPanelXL + c.betPanelW, c.betPanelYT + c.round, c.round)
    ctx.lineTo(c.betPanelXL + c.betPanelW, c.betPanelYT + c.betPanelH - c.round)
    ctx.arcTo(c.betPanelXL + c.betPanelW, c.betPanelYT + c.betPanelH, c.betPanelXL + c.betPanelW - c.round, c.betPanelYT + c.betPanelH, c.round)
    ctx.lineTo(c.betPanelXL + c.round, c.betPanelYT + c.betPanelH)
    ctx.arcTo(c.betPanelXL, c.betPanelYT + c.betPanelH, c.betPanelXL, c.betPanelYT + c.betPanelH - c.round, c.round)
    ctx.lineTo(c.betPanelXL, c.betPanelYT + c.round)
    ctx.arcTo(c.betPanelXL, c.betPanelYT, c.betPanelXL + c.round, c.betPanelYT, c.round)

    const panelGradient = ctx.createLinearGradient(
      c.betPanelXC, c.betPanelYT,
      c.betPanelXC, c.betPanelYB
    )
    panelGradient.addColorStop(0, '#85257c')
    panelGradient.addColorStop(0.8, '#4f1048')

    ctx.fillStyle = panelGradient
    ctx.fill()

    ctx.save()
    ctx.clip()
    const shadowSize = 44
    const topShadow = ctx.createLinearGradient(0, c.betPanelYT, 0, c.betPanelYT + shadowSize)
    topShadow.addColorStop(0, '#330a30')
    topShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
    // bet panel
    ctx.fillStyle = topShadow
    ctx.fillRect(c.betPanelXL, c.betPanelYT, c.betPanelW, shadowSize)
    const bottomShadow = ctx.createLinearGradient(0, c.betPanelYB, 0, c.betPanelYB - shadowSize)
    bottomShadow.addColorStop(0, '#330a30')
    bottomShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = bottomShadow
    ctx.fillRect(c.betPanelXL, c.betPanelYB - shadowSize, c.betPanelW, shadowSize)
    const leftShadow = ctx.createLinearGradient(c.betPanelXL, 0, c.betPanelXL + shadowSize, 0)
    leftShadow.addColorStop(0, '#330a30')
    leftShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = leftShadow
    ctx.fillRect(c.betPanelXL, c.betPanelYT, shadowSize, c.betPanelH)
    const rightShadow = ctx.createLinearGradient(c.betPanelXR, 0, c.betPanelXR - shadowSize, 0)
    rightShadow.addColorStop(0, '#330a30')
    rightShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = rightShadow
    ctx.fillRect(c.betPanelXR - shadowSize, c.betPanelYT, shadowSize, c.betPanelH)
    ctx.restore()

    ctx.font = '30px Arial'
    ctx.fillStyle = '#e8ab47'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.moveTo(c.betPanelXC, c.betPanelYC)
    ctx.fillText(money.current, c.betPanelXC, c.betPanelYC)

    function dotDownBuild(): Path2D {
      const p = new Path2D()
      p.moveTo(c.betPanelDotDownXR - c.roundDots, c.betPanelDotDownYT)
      p.lineTo(c.betPanelDotDownXR - c.roundDots, c.betPanelDotDownYT)
      p.arcTo(c.betPanelDotDownXR, c.betPanelYT, c.betPanelDotDownXR, c.betPanelDotDownYB, c.roundDots)
      p.lineTo(c.betPanelDotDownXR, c.betPanelYB - c.roundDots)
      p.arcTo(c.betPanelDotDownXR, c.betPanelYB, c.betPanelDotDownXC, c.betPanelDotDownYB, c.roundDots)
      p.lineTo(c.betPanelDotDownXC + c.roundDots, c.betPanelYB)
      p.arcTo(c.betPanelDotDownXC, c.betPanelYB, c.betPanelDotDownXL, c.betPanelDotDownYC, c.roundDots)
      p.lineTo(c.betPanelDotDownXL, c.betPanelDotDownYC)
      p.arcTo(c.betPanelDotDownXL, c.betPanelDotDownYC - c.roundDots, c.betPanelDotDownXR, c.betPanelDotDownYT, c.roundDots)
      p.lineTo(c.betPanelDotDownXC, c.betPanelDotDownYT)
      p.closePath()
      return p
    }

    function dotDownDraw(path: Path2D | null, color: string) {
      if (!ctx || !path) {
        return;
      }
      ctx.fillStyle = color
      ctx.strokeStyle = '#905296'
      ctx.lineWidth = 3
      ctx.fill(path)
      ctx.stroke(path)
      isSignScale.current = !isSignScale.current

    }

    function dotDownMinusBuild() {
      const p = new Path2D()
      p.moveTo(c.betPanelDotDownXL + 5, c.betPanelDotDownYC)
      p.lineTo(c.betPanelDotDownXR - 5, c.betPanelDotDownYC)
      return p
    }

    function dotDownMinusDraw(path: Path2D) {
      ctx.strokeStyle = 'rgba(226,226,226,0.79)'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      path.closePath()
      ctx.stroke(path)
    }

    function dotUpBuild() {
      const p = new Path2D()
      p.moveTo(c.betPanelDotUpXL, c.betPanelDotUpYT)
      p.lineTo(c.betPanelDotUpXL, c.betPanelDotUpYT)
      p.arcTo(c.betPanelDotUpXC, c.betPanelDotUpYT, c.betPanelDotUpXR, c.betPanelDotUpYC, c.roundDots)
      p.lineTo(c.betPanelDotUpXR, c.betPanelDotUpYC - c.roundDots)
      p.arcTo(c.betPanelDotUpXR, c.betPanelDotUpYC, c.betPanelDotUpXC, c.betPanelDotUpYB, c.roundDots)
      p.lineTo(c.betPanelDotUpXC + c.roundDots, c.betPanelDotUpYB)
      p.arcTo(c.betPanelDotUpXC, c.betPanelDotUpYB, c.betPanelDotUpXL, c.betPanelDotUpYB, c.roundDots)
      p.lineTo(c.betPanelDotUpXL + c.roundDots, c.betPanelDotUpYB)
      p.arcTo(c.betPanelDotUpXL, c.betPanelDotUpYB, c.betPanelDotUpXL, c.betPanelDotUpYT, c.roundDots)
      p.closePath()
      return p
    }

    function dotUpDraw(path: Path2D, color: string) {
      ctx.fillStyle = color
      ctx.strokeStyle = '#905296'
      ctx.lineWidth = 3
      ctx.fill(path)
      ctx.stroke(path)
    }

    function dotUpPlusBuild() {
      const p = new Path2D()
      p.moveTo(c.betPanelDotUpXL + (c.roundDots), c.betPanelDotUpYC)
      p.lineTo(c.betPanelDotUpXR - c.roundDots, c.betPanelDotUpYC)
      p.moveTo(c.betPanelDotUpXC, c.betPanelDotUpYC)
      p.lineTo(c.betPanelDotUpXC, c.betPanelDotUpYT + c.roundDots * 4)
      p.lineTo(c.betPanelDotUpXC, c.betPanelDotUpYB - c.roundDots * 4)
      return p
    }

    function dotUpPlusDraw(path: Path2D) {
      ctx.strokeStyle = 'rgba(226,226,226,0.79)'
      ctx.lineWidth = 3
      ctx.stroke(path)
    }

    const upPath = dotUpBuild()
    const downPath = dotDownBuild()
    if (!upPath || !downPath) return

    // buttonsRef.current = [
    //   createButton(upPath, c.defaultColorTabDots, c.onHoverColorTabDots, () => setMoney(m => m + 10)),
    //   createButton(downPath, c.defaultColorTabDots, c.onHoverColorTabDots, () => setMoney(m => m - 10)),
    // ]

    if (!tabRef.current) {
      return
    }
    const handleMouseMoveDots = (e: MouseEvent) => {
      if (!tabRef.current || !dotDownPath.current || !dotUpPath.current) {
        return
      }
      const btnDown = tabRef.current.getBoundingClientRect()
      const currX = e.clientX - btnDown.left
      const currY = e.clientY - btnDown.top
      // const isDotDownHover = ctx.isPointInPath(dotDownPath.current, currX, currY)
      // const isDotUpHover = ctx.isPointInPath(dotUpPath.current, currX, currY)

      if (ctx.isPointInPath(dotDownPath.current, currX, currY)) {
        dotDownDraw(dotDownPath.current, c.onHoverColorTabDots)
        dotDownMinusDraw(dotDownMinus)

      } else {
        dotDownDraw(dotDownPath.current, c.defaultColorTabDots)
        dotDownMinusDraw(dotDownMinus)
      }
      if (ctx.isPointInPath(dotUpPath.current, currX, currY)) {
        dotUpDraw(dotUpPath.current, c.onHoverColorTabDots)
        dotUpPlusDraw(dotUpPlus)

      } else {
        dotUpDraw(dotUpPath.current, c.defaultColorTabDots)
        dotUpPlusDraw(dotUpPlus)
      }
    }

    const handleClickDots = (e: MouseEvent) => {
      if (!tabRef.current) {
        return
      }
      const btnDown = tabRef.current.getBoundingClientRect()
      const currX = e.clientX - btnDown.left
      const currY = e.clientY - btnDown.top
      const isDotDownActive = ctx.isPointInPath(dotDownPath.current, currX, currY)
      const isDotUpActive = ctx.isPointInPath(dotUpPath.current, currX, currY)

      if (isDotDownActive) {
        money.current = money.current - 100
      }
      if (isDotUpActive) {
        money.current = money.current + 100
      }
      console.log(money.current)
    }

    tabRef.current.addEventListener('click', handleClickDots)
    tabRef.current.addEventListener('mousemove', handleMouseMoveDots)
    return () => {
      if (!tabRef.current) {
        return
      }
      tabRef.current.removeEventListener('click', handleClickDots);
      tabRef.current.removeEventListener('mousemove', handleMouseMoveDots)
    }

  }, [money.current])

  useEffect(() => {
    return setupCanvas(tabRef.current, drawFn)
  }, [])

  return (
    <div className='bonanza'>
      <canvas className='slot-b' ref={slotRef}/>
      <canvas className='tab-b' ref={tabRef}/>
    </div>
  );
}
// ctx.save()
//       ctx.clip()
//
//       const cx = (betPanelDotDownXL + betPanelDotDownXR) / 2
//       const cy = (betPanelYT + betPanelYB) / 2
//       const scale = 1
//
//       ctx.translate(cx, cy)
//       ctx.scale(scale, scale)
//       ctx.translate(-cx, -cy)
//
//       ctx.beginPath()
//       ctx.moveTo(betPanelDotDownXR - roundDots, betPanelYT)
//       ctx.lineTo(betPanelDotDownXR - roundDots, betPanelYT)
//       ctx.arcTo(betPanelDotDownXR, betPanelYT, betPanelDotDownXR, betPanelYB, roundDots)
//       ctx.lineTo(betPanelDotDownXR, betPanelYB - roundDots)
//       ctx.arcTo(betPanelDotDownXR, betPanelYB, betPanelDotDownXC, betPanelYB, roundDots)
//       ctx.lineTo(betPanelDotDownXC + roundDots, betPanelYB)
//       ctx.arcTo(betPanelDotDownXC, betPanelYB, betPanelDotDownXL, betPanelYC, roundDots)
//       ctx.lineTo(betPanelDotDownXL, betPanelYC)
//       ctx.arcTo(betPanelDotDownXL, betPanelYC - roundDots, betPanelDotDownXR, betPanelYT, roundDots)
//       ctx.lineTo(betPanelDotDownXC, betPanelYT)
//       ctx.closePath()
//
//       ctx.strokeStyle = 'rgba(208,193,193,0.79)'
//       ctx.lineWidth = 1
//       ctx.stroke()
//
//       ctx.restore()