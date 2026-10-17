import type {Metadata} from 'next';
import './globals.css';
import './admin.css';
import './public-v4.css';
export const metadata:Metadata={title:'Wales · වේල්ස් උසස් අධ්‍යාපන ආයතනය',description:'Wales Higher Education Centre, Rawathawatta, Moratuwa. Teachers, classes and locations.',icons:{icon:'/logo.png'}};
export const viewport={width:'device-width',initialScale:1,themeColor:'#123e2d'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="si"><body>{children}</body></html>}
