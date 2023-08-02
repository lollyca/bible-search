
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bible Search',
  description: 'Search a keyword and find a verse',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-100">
      <ThemeProvider theme={theme}>
        <body className="h-100">
          <img style={{ objectFit: "cover", height: "25%", width: "100%" }} src="/banner.jpeg" alt="" />
          {children}
            <Footer />
        </body>
      </ThemeProvider>
    </html>
  )
}
