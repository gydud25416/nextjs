 import Link from "next/link";
import "./globals.css";  
import { Control } from "./Control";
  
export const metadata = {
  title: "Web tutorials",
  description: "hyjang NextJS Tutorials",
};
 
export default async function RootLayout({ children }) { 
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {cache:'no-store'})
  const topics = await resp.json(); 
  return (
    <html>
      <body>
        <h1><Link href="/">Web</Link></h1>
        <ol>
          {topics.map((topics)=>{
            return <li key={topics.id}><Link href={`/read/${topics.id}`}>{topics.title}</Link></li>
          })} 
        </ol>
        {children}
        <Control/>
        </body>
    </html>
  );
}
