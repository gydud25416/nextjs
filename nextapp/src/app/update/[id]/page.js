"use client"
import { useParams, useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
export default function Update(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const params = useParams();
    const id = params.id;
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`)
        .then(res=>res.json())
        .then(result=>{ 
            setTitle(result.title);
            setBody(result.body);
        })
    },[])
    const router = useRouter();
    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({title, body})}
            )
            .then(res => res.json())
            .then(result=>{ 
                const lastid = result.id;
                router.push(`/read/${lastid}`);
                router.refresh();
            })
        }}>
            <p>
                <input type="text" value={title} name="title" placeholder="title" onChange={e=>setTitle(e.target.value)} />
            </p>
            <p>
                <textarea type="text" value={body} name="body" placeholder="body" onChange={e=>setBody(e.target.value)}  />
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    )
}