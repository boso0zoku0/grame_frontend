import './ui.scss'
import {GamesInterface} from "@/app/components/games/interfaces";
import Link from "next/link";

export default function Games() {
  const games: GamesInterface[] = [
    {
      id: 1,
      name: 'Bonanza',
      url: 'bonanza'
    },
    {
      id: 2,
      name: 'Dragon Strike',
      url: 'dragon-strike'
    }
  ]

  return (
    <div className='games-g'>
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/games/${game.url}`}
          className='game-g'
        >
          <div className='game-name-g'>{game.name}</div>
        </Link>
      ))}
    </div>
  )
}