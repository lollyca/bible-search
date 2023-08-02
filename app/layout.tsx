
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bible Search',
  description: 'Search a keyword and find a verse',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body>
          <div className="row m-0 p-0 h-25">
            <img style={{ objectFit: "cover", height: "300px" }} src="/banner.jpeg" alt="" />
          </div>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
