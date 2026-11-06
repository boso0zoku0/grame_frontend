'use client'
import './ui.scss'
import React, {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {setupCanvas} from "@/app/helpers/canvas";
import tabPanelCoord, {TabPanelProps} from "@/app/components/games/bonanza/coordinates";
import {
  dotDownBuild,
  dotDownDraw, dotDownMinusBuild,
  dotDownMinusDraw, dotUpBuild,
  dotUpDraw, dotUpPlusBuild,
  dotUpPlusDraw
} from "@/app/components/games/bonanza/utils";

export default function Bonanza() {
  const slotRef = useRef<HTMLCanvasElement | null>(null);
  const tabRef = useRef<HTMLCanvasElement | null>(null);
  const dotDownPath = useRef<Path2D | null>(null)
  const dotUpPath = useRef<Path2D | null>(null)
  const dotDownMinusPath = useRef<Path2D | null>(null)
  const dotUpPlusPath = useRef<Path2D | null>(null)
  const money = useRef(100)
  const [isRefresh, setRefresh] = useState(false)


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
    const dotDown = dotDownBuild(c)
    const dotDownMinus = dotDownMinusBuild(c)
    const dotUp = dotUpBuild(c)
    const dotUpPlus = dotUpPlusBuild(c)
    dotDownPath.current = dotDown
    dotUpPath.current = dotUp
    dotDownMinusPath.current = dotDownMinus
    dotUpPlusPath.current = dotUpPlus
    dotDownDraw(ctx, dotDown, c.defaultColorTabDots)
    dotUpDraw(ctx, dotUp, c.defaultColorTabDots)
    dotDownMinusDraw(ctx, dotDownMinus)
    dotUpPlusDraw(ctx, dotUpPlus)


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
    ctx.fillText(money.current, c.betPanelXC, c.betPanelYC)

    ctx.font = 'bold 20px Arial'
    ctx.fillStyle = '#d734bd'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('BET', c.betPanelXC, c.betPanelYB)
    //
    const tabWinW = (c.tabXR / 3) - (c.paddingBetPanelY * 2)
    const tabWinH = c.tabYB - c.paddingBetPanelY + 3
    const tabWinXL = c.tabXR / 3
    const tabWinXC = (c.tabXR / 3) + (tabWinW / 2)
    const tabWinXR = (c.tabXR / 3) + tabWinW
    const tabWinYT = c.tabYT + c.paddingBetPanelY
    const tabWinYB = c.tabYB - 9
    const tabWinYC = c.tabYC
    // тут описывал корону которая сверх будет
    const topCoronaW = 35
    const topCoronaXL = tabWinXC - topCoronaW
    const topCoronaXC = tabWinXC
    const topCoronaXR = tabWinXC + topCoronaW
    const topCoronaYT = tabWinYT - topCoronaW
    const topCoronaYC = tabWinYT
    const topCoronaYB = tabWinYT + topCoronaW
    //
    const padC = 3
    const coronaH = (c.tabYB / 3) - (padC * 2)
    const coronaW = 25
    const outShapePadd = 1


    //
    const outShapeXL = tabWinXL - (coronaW / 2)
    const outShapeXR = tabWinXL + (coronaW / 2)
    const outShapeXC = (outShapeXL + outShapeXR) / 2
    const outShapeYT = c.tabYC - (coronaH / 2) - outShapePadd
    const outShapeYC = c.tabYC
    const outShapeYB = c.tabYC + (coronaH / 2) + outShapePadd
    // outline shape
    const olsPadHigh = 7
    const olsPadMid = 4
    const olsXL = outShapeXL - olsPadMid
    const olsXR = tabWinXL
    const olsYT = outShapeYT - olsPadHigh
    const olsYC = outShapeYC
    const olsYB = outShapeYB + olsPadHigh


    const liftCor = outShapeYT - outShapeYC
    const outShapeW = outShapeXR
    const outShapeH = outShapeYB
    //
    const l = (x, y) => ctx.lineTo(x, y)
    // panel
    ctx.beginPath()
    ctx.moveTo(tabWinXL+10, tabWinYT)
    ctx.arcTo(tabWinXR, tabWinYT, tabWinXR, tabWinYB, 10)
    ctx.arcTo(tabWinXR, tabWinYB, tabWinXL, tabWinYB, 10)
    ctx.arcTo(tabWinXL, tabWinYB, tabWinXL, tabWinYT, 10)
    ctx.arcTo(tabWinXL, tabWinYT, tabWinXL+10, tabWinYT, 10)
    // ctx.moveTo(tabWinXL, tabWinYT)
    // ctx.lineTo(tabWinXL, tabWinYC - 20)

    // glowCircleXL
    ctx.save()
    ctx.scale(1, 2);
    const gCXL = (tabWinXL + tabWinXC) / 2
    const gCXR = (tabWinXR + tabWinXC) / 2
    const gCXC = (gCXL + gCXR) / 2
    const gCYC = tabWinYB + 400
    const gCRadius = (outShapeXR - outShapeXL) * 22;
    const panelWinGradient = ctx.createRadialGradient(
      gCXC, gCYC, 0,
      gCXC, gCYC, gCRadius
    )

    panelWinGradient.addColorStop(0, '#d77cc4')
    panelWinGradient.addColorStop(0.5, '#d5d5d5')
    panelWinGradient.addColorStop(0.6, '#c02ea1')
    panelWinGradient.addColorStop(1, '#2a0c2a')
    ctx.strokeStyle = '#d0aa39'
    ctx.fillStyle = panelWinGradient
    ctx.lineWidth = '7'
    ctx.stroke()
    ctx.fill()
    ctx.restore()

    // jewel
    ctx.save();
    ctx.translate(-9, 0);
    ctx.beginPath()
    ctx.moveTo(outShapeXL, outShapeYC)
    ctx.quadraticCurveTo(outShapeXC, outShapeYC + liftCor * 2, outShapeXR, outShapeYC)
    ctx.quadraticCurveTo(outShapeXC, outShapeYC - liftCor * 2, outShapeXL, outShapeYC)
    const g = ctx.createLinearGradient(
      outShapeXL, outShapeYB,
      outShapeXR, outShapeYT
    )
    g.addColorStop(0, '#ba48be')
    g.addColorStop(0.5, '#550d56')
    ctx.strokeStyle = '#d0aa39'
    ctx.fillStyle = '#550d56'
    ctx.lineWidth = 1
    ctx.fill()
    ctx.stroke()
    ctx.restore()

    // outline
    ctx.beginPath()
    ctx.moveTo(olsXR, olsYT)
    ctx.lineTo(olsXL, olsYC)
    ctx.lineTo(olsXR, olsYB)
    // ctx.lineTo(olsXR, olsYB)
    ctx.strokeStyle = '#d0aa39'
    ctx.lineWidth = '7'
    // ctx.stroke()
    // ctx.restore()


  }, [])

  useEffect(() => {
    const tab = tabRef.current
    const ctx = tab?.getContext('2d')

    if (!tab || !ctx) return
    const rect = tab.getBoundingClientRect()
    const c = tabPanelCoord(rect.width, rect.height)
    const dotDown = dotDownBuild(c)
    const dotDownMinus = dotDownMinusBuild(c)
    const dotUp = dotUpBuild(c)
    const dotUpPlus = dotUpPlusBuild(c)
    dotDownPath.current = dotDown
    dotUpPath.current = dotUp
    dotDownMinusPath.current = dotDownMinus
    dotUpPlusPath.current = dotUpPlus
    dotDownDraw(ctx, dotDown, c.defaultColorTabDots)
    dotUpDraw(ctx, dotUp, c.defaultColorTabDots)
    dotDownMinusDraw(ctx, dotDownMinus)
    dotUpPlusDraw(ctx, dotUpPlus)


    const handleMouseMoveDots = (e: MouseEvent) => {
      if (!tabRef.current || !dotDownPath.current || !dotUpPath.current) {
        return
      }
      const btnDown = tabRef.current.getBoundingClientRect()
      const currX = e.clientX - btnDown.left
      const currY = e.clientY - btnDown.top
      const isDotDownHover = ctx.isPointInPath(dotDownPath.current, currX, currY)
      const isDotUpHover = ctx.isPointInPath(dotUpPath.current, currX, currY)

      if (isDotDownHover) {
        dotDownDraw(ctx, dotDownPath.current, c.onHoverColorTabDots)
        dotDownMinusDraw(ctx, dotDownMinus)

      } else {
        dotDownDraw(ctx, dotDownPath.current, c.defaultColorTabDots)
        dotDownMinusDraw(ctx, dotDownMinus)
      }
      if (isDotUpHover) {
        dotUpDraw(ctx, dotUpPath.current, c.onHoverColorTabDots)
        dotUpPlusDraw(ctx, dotUpPlus)

      } else {
        dotUpDraw(ctx, dotUpPath.current, c.defaultColorTabDots)
        dotUpPlusDraw(ctx, dotUpPlus)
      }
    }

    const handleClickDots = (e: MouseEvent) => {
      const down = dotDownPath.current
      const up = dotUpPath.current

      if (!down || !up) {
        return
      }
      const btnDown = tab.getBoundingClientRect()
      const currX = e.clientX - btnDown.left
      const currY = e.clientY - btnDown.top
      const isDotDownActive = ctx.isPointInPath(down, currX, currY)
      const isDotUpActive = ctx.isPointInPath(up, currX, currY)

      if (isDotDownActive) {
        money.current = money.current - 100
        setRefresh(prev => !prev)

      }
      if (isDotUpActive) {
        money.current = money.current + 100
        setRefresh(prev => !prev)
      }
      console.log(money.current)
    }

    tab.addEventListener('click', handleClickDots)
    tab.addEventListener('mousemove', handleMouseMoveDots)
    return () => {
      tab.removeEventListener('click', handleClickDots);
      tab.removeEventListener('mousemove', handleMouseMoveDots)
    }
  }, []);
  useEffect(() => {
    return setupCanvas(tabRef.current, drawFn)
  }, [isRefresh])

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