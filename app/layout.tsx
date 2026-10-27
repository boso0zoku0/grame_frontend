import "./globals.scss";
import './layout.scss'
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body className='body-styles'>{children}</body>
    </html>
  );
}
