import { useRouter } from "next/router";
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const redirect = ()=>{
    const isLoggedIn:boolean = localStorage.getItem("userId") != null && localStorage.getItem("token") != null
    if(isLoggedIn){
      router.push("/vocab")
    }else{
      router.push("/login")
    }
  }

  useEffect(()=>{
    redirect()
  },[])
}
