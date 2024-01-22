import React, { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react';

const Generator = () => {
    
    const [length,setLength] = useState(6);
    const [numAllow,setNum] = useState(false);
    const [symAllow,setSym] = useState(false);
    const [pass,setPass] = useState('');

    const passwordRef = useRef(null);

    const generate = useCallback(()=>{
      let Password=""
      let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllow) str+="1234567890"
      if(symAllow) str+="@#%*&^/?><!$()_+"
      for(let i=0;i<length;i++){
        const numbi=Math.floor(Math.random()*str.length+1)
        Password+=str.charAt(numbi)
      }
      setPass(Password)
    },[length,numAllow,symAllow])

    useEffect(()=>{
      generate()
    },[length,numAllow,symAllow])

    const copypass = () =>{
      window.navigator.clipboard.writeText(pass)
      passwordRef.current.select()
   }

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-14 bg-slate-800'>
        <h1 className='flex justify-center text-white my-1 mx-2'>Password Generator</h1>
        <div className='flex shadow rounded-full overflow-hidden mb-4 mt-3'>
            <input type="text"
            value={pass}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
           <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypass}>Copy</button>
 
        </div>
        <div className="text-white flex flex-wrap gap-2 text-sm ml-4">
            <input
            type="range"
            min={6}
            max={20}
            step={1}
            defaultValue={6}
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
             />
             <label htmlFor="number">Length : {length}</label>
             <div className='flex items-center gap-x-1'>
              <input
               type="checkbox" 
               defaultValue={numAllow}
               onChange={()=>{
                setNum((prev)=>!prev)
               }}
               className='cursor-pointer'
              />
              <label htmlFor="num">Numbers</label>
             </div>
             <div className='flex items-center gap-x-1'>
              <input
               type="checkbox" 
               defaultValue={symAllow}
               onChange={()=>{
                setSym((prev)=>!prev)
               }}
               className='cursor-pointer'
              />
              <label htmlFor="symb">Charaters</label>
             </div>
        </div>
        <div className="flex justify-center">
          <button
           className='text-white outline-none rounded-lg bg-blue-600 px-2 py-1 mt-3' onClick={generate} >Generate</button>
        </div>
    </div>
    </>
  )
}

export default Generator
