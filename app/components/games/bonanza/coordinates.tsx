export interface TabPanelProps {
  tabXL: number
  tabXC: number
  tabXR: number
  tabYT: number
  tabYC: number
  tabYB: number
  paddingBetPanelX: number
  paddingBetPanelY: number
  betPanelW: number
  betPanelXL: number
  betPanelXC: number
  betPanelXR: number
  betPanelH: number
  betPanelYT: number
  betPanelYC: number
  betPanelYB: number
  round: number
  betPanelDotW: number
  betPanelDotH: number
  paddbetweenPanel: number
  betPanelDotUpXL: number
  betPanelDotUpXC: number
  betPanelDotUpXR: number
  betPanelDotUpYT: number
  betPanelDotUpYC: number
  betPanelDotUpYB: number
  roundDots: number
  defaultColorTabDots: string
  onHoverColorTabDots: string
  betPanelDotDownXL: number
  betPanelDotDownXC: number
  betPanelDotDownXR: number
  betPanelDotDownYT: number
  betPanelDotDownYC: number
  betPanelDotDownYB: number

}

export default function tabPanelCoord(
  w: number,
  h: number,
): TabPanelProps {
  //
  const tabXL = 0
  const tabXC = w / 2
  const tabXR = w
  const tabYT = 0
  const tabYC = h / 2
  const tabYB = h
  // panel
  const paddingBetPanelX = 150
  const paddingBetPanelY = 10
  const betPanelW = 150
  const betPanelXL = paddingBetPanelX
  const betPanelXC = betPanelW / 2 + paddingBetPanelX
  const betPanelXR = betPanelW + paddingBetPanelX

  const betPanelH = tabYB - (paddingBetPanelY * 2)
  const betPanelYT = paddingBetPanelY
  const betPanelYC = betPanelYT + betPanelH / 2
  const betPanelYB = tabYB - paddingBetPanelY
  const round = 22

  // dots
  const betPanelDotW = 35
  const betPanelDotH = tabYB - (paddingBetPanelY * 2)
  const paddbetweenPanel = 5
  const roundDots = 5
  // dot up
  const betPanelDotUpXL = betPanelXR + paddbetweenPanel
  const betPanelDotUpXC = betPanelXR + paddbetweenPanel + (betPanelDotW / 2)
  const betPanelDotUpXR = betPanelXR + paddbetweenPanel + betPanelDotW
  const betPanelDotUpYT = paddingBetPanelY
  const betPanelDotUpYC = paddingBetPanelY + (betPanelDotH / 2)
  const betPanelDotUpYB = betPanelDotH + paddingBetPanelY
  const defaultColorTabDots = '#330a30'
  const onHoverColorTabDots = '#491342'
  // dot down
  const betPanelDotDownXL = paddingBetPanelX - betPanelDotW - paddbetweenPanel
  const betPanelDotDownXC = paddingBetPanelX - (betPanelDotW / 2) - paddbetweenPanel
  const betPanelDotDownXR = paddingBetPanelX - paddbetweenPanel
  const betPanelDotDownYT = paddingBetPanelY
  const betPanelDotDownYC = paddingBetPanelY + (betPanelDotH / 2)
  const betPanelDotDownYB = betPanelDotH + paddingBetPanelY

  return {
    tabXL, tabXC, tabXR, tabYT, tabYC, tabYB,
    paddingBetPanelX, paddingBetPanelY,
    betPanelW, betPanelXL, betPanelXC, betPanelXR,
    betPanelH, betPanelYT, betPanelYC, betPanelYB,
    round, betPanelDotUpXL,
    betPanelDotUpXC,
    betPanelDotUpXR,
    betPanelDotUpYT,
    betPanelDotUpYC,
    betPanelDotUpYB,
    roundDots,
    defaultColorTabDots,
    onHoverColorTabDots,
    betPanelDotDownXL,
    betPanelDotDownXC,
    betPanelDotDownXR,
    betPanelDotDownYT,
    betPanelDotDownYC,
    betPanelDotDownYB,
    betPanelDotW,
    betPanelDotH,
    paddbetweenPanel,

  }

}