import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Slidebar from '@/Components/Slidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToastProvider from '@/providers/ToasterProvider'
import getSongsByUserid from '@/actions/getSongsByUserId'
import Player from '@/Components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'


const Font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shelbys Music',
  description: 'Listen to Music With Shelbys Music ',
}

export const revalidate = 0;

export default  async  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserid();

  const products = await getActiveProductsWithPrices();
   

  return (
    <html lang="en">
      <body className={Font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
          
            <ModalProvider products={products} />
            <Slidebar songs={userSongs}>
             {children}
           </Slidebar>
           <Player/>
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
