import './globals.css'

export const metadata = {
  title: 'AcePoint',
  description: 'The Strava for Padel',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
