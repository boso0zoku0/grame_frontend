'use client'
import './ui.scss'
import {useState} from "react";
import Link from "next/link";

export default function LeftBar() {
  return (
    <div
      className='left-bar'
    >
      <Link
        href='/residence'
        className='left-bar-item'
      >
        Обитель
      </Link>
      <Link
        href='/messenger'
        className='left-bar-item'
      >
        Мессенджер
      </Link>
      <Link
        href='/interest'
        className='left-bar-item'
      >
        Интересное
      </Link>
      <Link
        href='/games'
        className='left-bar-item'
      >
        Игры
      </Link>
    </div>
  )
}