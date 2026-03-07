import './globals.css'
import NavBar from '@/components/ui/NavBar'

export const metadata = {
  title: 'AcePoint',
  description: 'The Strava for Padel',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white pb-24">
        {children}
        <NavBar />
      </body>
    </html>
  )
}
