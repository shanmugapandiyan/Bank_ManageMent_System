import './globals.css'

export const metadata = {
  title: 'NeoBank - Your Trusted Banking Partner',
  description: 'Modern banking made simple with NeoBank',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}