import Game from "@/app/components/game/game"

interface GamePageProps {
  params: Promise<{ slug: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params
  return <Game slug={slug} />
}