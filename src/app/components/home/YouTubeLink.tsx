'use client'

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from '../../../../public/logo.svg';

export default function LinkYoutube(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const refreshPage = () => {
      setLoading(true);
      router.push('api/google/callback');
      router.refresh();
    }

    return (
        <div className="flex flex-1 w-full justify-center flex-col items-center">
          <div className="w-1/2">
            <img src={logo} alt="logo-large"/>
          </div>
          <div className="mt-10">
            <button onClick={refreshPage} className="btn btn-primary rounded">
              <p className="font-medium">
                {(loading) ? <span className="loading loading-spinner"/> : 'Link Youtube account'}
                </p>
            </button>
          </div>
        </div>
    );
    
}