
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
        <body className="h-100 d-flex flex-column overflow-hidden">
          <div>
            <img className="w-100" style={{ objectFit: 'cover', height: '25vh' }} src="/banner.jpeg" alt="" />
          </div>
          <div style={{ flex: '2' }} className="overflow-hidden">
            {children}
          </div>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
