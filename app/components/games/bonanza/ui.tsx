'use client'
import './ui.scss'
import React, {useEffect, useRef, useState} from "react";
import {setupCanvas} from "@/app/helpers/canvas";


export default function Bonanza() {
  const slotRef = useRef<HTMLCanvasElement | null>(null);
  const tabRef = useRef<HTMLCanvasElement | null>(null);
  const isSignScale = useRef(false)
  const [money, setMoney] = useState(100)


  useEffect(() => {
    return setupCanvas(slotRef.current, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#623d63';
      ctx.fillRect(0, 0, w, h);
    });
  }, []);
  useEffect(() => {
    return setupCanvas(tabRef.current, (ctx, w, h) => {
      const xL = 0
      const xC = w / 2
      const xR = w
      const yT = 0
      const yC = h / 2
      const yB = h
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(0, 0, 0, yB)
      gradient.addColorStop(0, '#96318a')
      gradient.addColorStop(0.8, '#4b2343')
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      // panel
      const paddingBetPanelX = 150
      const paddingBetPanelY = 10
      const betPanelW = 150
      const betPanelXL = paddingBetPanelX
      const betPanelXC = betPanelW / 2 + paddingBetPanelX
      const betPanelXR = betPanelW + paddingBetPanelX

      const betPanelH = yB - (paddingBetPanelY * 2)
      const betPanelYT = paddingBetPanelY
      const betPanelYC = betPanelYT + betPanelH / 2
      const betPanelYB = yB - paddingBetPanelY


      const round = 22

      ctx.beginPath()
      ctx.moveTo(betPanelXL + round, betPanelYT)
      ctx.lineTo(betPanelXL + betPanelW - round, betPanelYT)
      ctx.arcTo(betPanelXL + betPanelW, betPanelYT, betPanelXL + betPanelW, betPanelYT + round, round)
      ctx.lineTo(betPanelXL + betPanelW, betPanelYT + betPanelH - round)
      ctx.arcTo(betPanelXL + betPanelW, betPanelYT + betPanelH, betPanelXL + betPanelW - round, betPanelYT + betPanelH, round)
      ctx.lineTo(betPanelXL + round, betPanelYT + betPanelH)
      ctx.arcTo(betPanelXL, betPanelYT + betPanelH, betPanelXL, betPanelYT + betPanelH - round, round)
      ctx.lineTo(betPanelXL, betPanelYT + round)
      ctx.arcTo(betPanelXL, betPanelYT, betPanelXL + round, betPanelYT, round)

      const panelGradient = ctx.createLinearGradient(
        betPanelXC, betPanelYT,
        betPanelXC, betPanelYB
      )
      panelGradient.addColorStop(0, '#85257c')
      panelGradient.addColorStop(0.8, '#4f1048')

      ctx.fillStyle = panelGradient
      ctx.fill()

      ctx.save()
      ctx.clip()
      const shadowSize = 44
      const topShadow = ctx.createLinearGradient(0, betPanelYT, 0, betPanelYT + shadowSize)
      topShadow.addColorStop(0, '#330a30')
      topShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
      // bet panel
      ctx.fillStyle = topShadow
      ctx.fillRect(betPanelXL, betPanelYT, betPanelW, shadowSize)
      const bottomShadow = ctx.createLinearGradient(0, betPanelYB, 0, betPanelYB - shadowSize)
      bottomShadow.addColorStop(0, '#330a30')
      bottomShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = bottomShadow
      ctx.fillRect(betPanelXL, betPanelYB - shadowSize, betPanelW, shadowSize)
      const leftShadow = ctx.createLinearGradient(betPanelXL, 0, betPanelXL + shadowSize, 0)
      leftShadow.addColorStop(0, '#330a30')
      leftShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = leftShadow
      ctx.fillRect(betPanelXL, betPanelYT, shadowSize, betPanelH)
      const rightShadow = ctx.createLinearGradient(betPanelXR, 0, betPanelXR - shadowSize, 0)
      rightShadow.addColorStop(0, '#330a30')
      rightShadow.addColorStop(0.8, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = rightShadow
      ctx.fillRect(betPanelXR - shadowSize, betPanelYT, shadowSize, betPanelH)
      ctx.restore()

      ctx.font = '30px Arial'
      ctx.fillStyle = '#e8ab47'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.moveTo(betPanelXC, betPanelYC)
      ctx.fillText(money, betPanelXC, betPanelYC)
      // dots
      const betPanelDotW = 35
      const betPanelDotH = yB - (paddingBetPanelY * 2)
      const paddbetweenPanel = 5

      const betPanelDotDownXL = paddingBetPanelX - betPanelDotW - paddbetweenPanel
      const betPanelDotDownXC = paddingBetPanelX - (betPanelDotW / 2) - paddbetweenPanel
      const betPanelDotDownXR = paddingBetPanelX - paddbetweenPanel
      const betPanelDotDownYT = paddingBetPanelY
      const betPanelDotDownYC = paddingBetPanelY + (betPanelDotH / 2)
      const betPanelDotDownYB = betPanelDotH + paddingBetPanelY

      const roundDots = 5

      // dotDown
      const defaultColor = '#330a30'
      const onHoverColor = '#491342'

      function dotDownBuild(): Path2D {
        const dDP = new Path2D()
        ctx.save()
        ctx.clip()
        dDP.moveTo(betPanelDotDownXR - roundDots, betPanelDotDownYT)
        dDP.lineTo(betPanelDotDownXR - roundDots, betPanelDotDownYT)
        dDP.arcTo(betPanelDotDownXR, betPanelYT, betPanelDotDownXR, betPanelDotDownYB, roundDots)
        dDP.lineTo(betPanelDotDownXR, betPanelYB - roundDots)
        dDP.arcTo(betPanelDotDownXR, betPanelYB, betPanelDotDownXC, betPanelDotDownYB, roundDots)
        dDP.lineTo(betPanelDotDownXC + roundDots, betPanelYB)
        dDP.arcTo(betPanelDotDownXC, betPanelYB, betPanelDotDownXL, betPanelDotDownYC, roundDots)
        dDP.lineTo(betPanelDotDownXL, betPanelDotDownYC)
        dDP.arcTo(betPanelDotDownXL, betPanelDotDownYC - roundDots, betPanelDotDownXR, betPanelDotDownYT, roundDots)
        dDP.lineTo(betPanelDotDownXC, betPanelDotDownYT)
        dDP.closePath()
        ctx.restore()
        return dDP
      }

      function dotDownDraw(dDP: Path2D, color: string) {
        ctx.fillStyle = color
        ctx.lineWidth = 3
        ctx.fill(dDP)
        isSignScale.current = !isSignScale.current
        dotDownMinusDraw()

      }

      function dotDownMinusDraw() {
        // minus
        const dDMP = new Path2D()
        dDMP.moveTo(betPanelDotDownXL + 5, betPanelDotDownYC)
        dDMP.lineTo(betPanelDotDownXR - 5, betPanelDotDownYC)
        ctx.strokeStyle = 'rgba(226,226,226,0.79)'
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        dDMP.closePath()
        ctx.stroke(dDMP)
      }


      const dDP = dotDownBuild()
      dotDownDraw(dDP, defaultColor)

      if (!tabRef.current) {
        return
      }
      tabRef.current.addEventListener('mousemove', (e) => {
        if (!tabRef.current) {
          return
        }
        const dDP = dotDownBuild()
        const btnDown = tabRef.current.getBoundingClientRect()
        const currX = e.clientX - btnDown.left
        const currY = e.clientY - btnDown.top

        if (ctx.isPointInPath(dDP, currX, currY)) {
          dotDownDraw(dDP, onHoverColor)

        } else {
          dotDownDraw(dDP, defaultColor)
        }
      })
      tabRef.current.addEventListener('click', (e) => {
        if (!tabRef.current) {
          return
        }
        const dDP = dotDownBuild()
        const btnDown = tabRef.current.getBoundingClientRect()
        const currX = e.clientX - btnDown.left
        const currY = e.clientY - btnDown.top

        if (ctx.isPointInPath(dDP, currX, currY)) {
          setMoney(prev => prev + 10)
        } else {
          // проверяем «минус»
          const dDMP = new Path2D()
          dDMP.moveTo(betPanelDotDownXL + 5, betPanelDotDownYC)
          dDMP.lineTo(betPanelDotDownXR - 5, betPanelDotDownYC)
          if (ctx.isPointInStroke(dDMP, currX, currY)) {
            setMoney(prev => prev - 10)
          }
        }
      })
      //dotUp
      const betPanelDotUpXL = betPanelXR + paddbetweenPanel
      const betPanelDotUpXC = betPanelXR + paddbetweenPanel + (betPanelDotW / 2)
      const betPanelDotUpXR = betPanelXR + paddbetweenPanel + betPanelDotW
      const betPanelDotUpYT = paddingBetPanelY
      const betPanelDotUpYC = paddingBetPanelY + (betPanelDotH / 2)
      const betPanelDotUpYB = betPanelDotH + paddingBetPanelY

      ctx.beginPath()
      ctx.moveTo(betPanelDotUpXL, betPanelDotUpYT)
      ctx.lineTo(betPanelDotUpXL, betPanelDotUpYT)
      ctx.arcTo(betPanelDotUpXC, betPanelDotUpYT, betPanelDotUpXR, betPanelDotUpYC, roundDots)
      ctx.lineTo(betPanelDotUpXR, betPanelDotUpYC - roundDots)
      ctx.arcTo(betPanelDotUpXR, betPanelDotUpYC, betPanelDotUpXC, betPanelDotUpYB, roundDots)
      ctx.lineTo(betPanelDotUpXC + roundDots, betPanelDotUpYB)
      ctx.arcTo(betPanelDotUpXC, betPanelDotUpYB, betPanelDotUpXL, betPanelDotUpYB, roundDots)
      ctx.lineTo(betPanelDotUpXL + roundDots, betPanelDotUpYB)
      ctx.arcTo(betPanelDotUpXL, betPanelDotUpYB, betPanelDotUpXL, betPanelDotUpYT, roundDots)
      ctx.closePath()
      ctx.strokeStyle = 'rgba(8,8,21,0.94)'
      ctx.lineWidth = 3
      ctx.stroke()
      // plus
      ctx.save()
      // фигура не симметрична, поэтому пришлось смещать координату чтобы визуально в центре + был
      ctx.translate(-1, 0)
      ctx.beginPath()
      ctx.moveTo(betPanelDotUpXL + roundDots, betPanelDotUpYC)
      ctx.lineTo(betPanelDotUpXR - roundDots, betPanelDotUpYC)
      ctx.moveTo(betPanelDotUpXC, betPanelDotUpYC)
      ctx.lineTo(betPanelDotUpXC, betPanelDotUpYT + roundDots * 4)
      ctx.lineTo(betPanelDotUpXC, betPanelDotUpYB - roundDots * 4)
      ctx.strokeStyle = 'rgba(226,226,226,0.79)'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()


    });
  }, []);


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