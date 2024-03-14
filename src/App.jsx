import { useEffect, useState,useRef, useReducer } from 'react'
import { useCallback } from 'react'


function App() {  

  // first aapde number allow karvana ke char allow karvana ke and password aapde rakhvo na rakhvo aeni value set kari didhi
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")


  // useRef hook
  const passwordRef = useRef(null) 

  // ek method lidhi and aema string banavi didhi if number allowed hoy to number add kari do and char allowed hoy to char add kari do
  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed) str = str + "0123456789"
      if(charAllowed) str = str + "!@#$%^&*-_+=[]{}~`"

      for(let i=1; i<=length; i++){
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)  // konsi index par aapko char chahiye ye mil jayega 
      }
      setPassword(pass) // aama value set thay jase 
  },[length,numberAllowed,charAllowed,setPassword]) // yaha hum optimize ki bat kar rahe he

  // ek method banavi copy btn mate
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()  // je reference pass karyo ae select karva mate
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])  // cop

  // aa hook page load thay tyare call thay and if aapde je dependencies aapi cche aema thi kai chhedchhad kari , kai pan change karyu to pachi ae pharithi re run thay jase
  useEffect(()=> {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator]) // yaha in chizo me koi bhi chhedchad ho to re render kardo


  return (
    <>
      {/* <h1 className='text-4xl text-center text-white'>Passoword Generator</h1> */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-700'>
          <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type='text' value={password} className='outline-none w-full py-1 px-3 m-3 rounded-md' placeholder='password' readOnly ref={passwordRef}// pass karyu aapde
              />

              <button  onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 m-3 rounded-md'>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
                <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
                  <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numberAllowed} id='numberINput' onChange={() => {
                    setNumberAllowed((prev) => !prev);
              }}  
              />
               <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type='checkbox' defaultChecked={charAllowed} id='characterInput' onChange={()=>{
                  setCharAllowed((prev) => !prev); // callback ma previous value je pan hoy aeni aagad not lagi gayu so false nu true kari didhu if aapde direct j true lakhi deta ahiya to aapde checkbox par click kariye ke na kariye ae always true j rehtu
              }}
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
