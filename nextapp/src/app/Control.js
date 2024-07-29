"use client"
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'  

export function Control(){
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    function onDelete(){
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res=>res.json())
        .then(result=>{
            router.push('/')
            router.refresh();
        }) 
    }
    return(
        <ul>
            <li><Link href="/create">Create</Link></li>
            {id ? 
            <>
                <li><Link href={`/update/${id}`}>Update</Link></li>
                <li><input type="button" value="delete" onClick={onDelete} /></li>
            </> : null}
          </ul>
    )
  }