"use client"
import { useRouter } from "next/navigation"; 
export default function Create(){
    const router = useRouter();
    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            fetch(`http://localhost:9999/topics/`,{
                method:"POST",
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
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea type="text" name="body" placeholder="body" />
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}