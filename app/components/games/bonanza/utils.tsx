import {TabPanelProps} from "@/app/components/games/bonanza/coordinates";

export function dotDownDraw(ctx: CanvasRenderingContext2D | null, path: Path2D | null, color: string) {
    if (!ctx || !path) {
      return;
    }
    ctx.fillStyle = color
    ctx.strokeStyle = '#905296'
    ctx.lineWidth = 3
    ctx.fill(path)
    ctx.stroke(path)
  }

  export function dotUpDraw(ctx: CanvasRenderingContext2D, path: Path2D, color: string) {
    ctx.fillStyle = color
    ctx.strokeStyle = '#905296'
    ctx.lineWidth = 3
    ctx.fill(path)
    ctx.stroke(path)
  }

  export function dotDownMinusDraw(ctx: CanvasRenderingContext2D, path: Path2D) {
    ctx.strokeStyle = 'rgba(226,226,226,0.79)'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    path.closePath()
    ctx.stroke(path)
  }

  export function dotUpPlusDraw(ctx: CanvasRenderingContext2D, path: Path2D) {
    ctx.strokeStyle = 'rgba(226,226,226,0.79)'
    ctx.lineWidth = 3
    ctx.stroke(path)
  }

  export function dotDownBuild(c: TabPanelProps): Path2D {
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


  export function dotDownMinusBuild(c: TabPanelProps) {
    const p = new Path2D()
    p.moveTo(c.betPanelDotDownXL + 5, c.betPanelDotDownYC)
    p.lineTo(c.betPanelDotDownXR - 5, c.betPanelDotDownYC)
    return p
  }

  export function dotUpBuild(c: TabPanelProps) {
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

  export function dotUpPlusBuild(c: TabPanelProps) {
    const p = new Path2D()
    p.moveTo(c.betPanelDotUpXL + (c.roundDots), c.betPanelDotUpYC)
    p.lineTo(c.betPanelDotUpXR - c.roundDots, c.betPanelDotUpYC)
    p.moveTo(c.betPanelDotUpXC, c.betPanelDotUpYC)
    p.lineTo(c.betPanelDotUpXC, c.betPanelDotUpYT + c.roundDots * 4)
    p.lineTo(c.betPanelDotUpXC, c.betPanelDotUpYB - c.roundDots * 4)
    return p
  }