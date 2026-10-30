'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const gameComponents: Record<string, React.ComponentType> = {
  'bonanza': dynamic(() => import('@/app/components/games/bonanza/ui'), {
    ssr: false,
  }),
  'dragon-strike': dynamic(() => import('@/app/components/games/dragonStrike/ui'), {
    ssr: false,
  }),
}

export default function Game({ slug }: { slug: string }) {
  const GameComponent = gameComponents[slug]

  if (!GameComponent) {
    return <div>Игра не найдена</div>
  }

  return <GameComponent />
}