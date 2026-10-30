import "./globals.scss";
import './layout.scss'
import TopBar from "@/app/components/topBar/ui";
import LeftBar from "@/app/components/leftBar/ui";
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
}
export default function RootLayout({children}: LayoutProps<"/">) {

  return (
    <html lang="ru">
    <body>
    <div className='content'>
      <TopBar/>
      <LeftBar/>
      <div
        >
        {children}
      </div>
      <footer className='footer'>

      </footer>
    </div>
    </body>
    </html>
  );
}
