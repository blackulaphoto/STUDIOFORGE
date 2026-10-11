import type { Metadata } from 'next';
export const metadata: Metadata={title:'StudioForge — Production desk',description:'Your creative production workspace: scripts, visual bibles, storyboards and reference assets.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
