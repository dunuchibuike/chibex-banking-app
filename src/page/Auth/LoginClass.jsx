import React from 'react'
import { useState } from 'react'
const LoginClass = () => {
  
  const [ showText, setShowText] = useState ()

  

  

  return (
    <div>
      <div>
        <p>Password</p>
        
      <form action="password">
        <input type="password" 
         name='' id=''
         onClick={()=>setShowText(!showText)}
         onBlur={()=>setShowText(!showText)}
        
         />

         {showText == true &&
         
         <div>
          <p> must have eight digits</p>
          <p> must contain uppercase</p>
          <p> must contain lowercase</p>
          <p> add special characters</p>
          <p> must contain numbers</p>
         </div>
         }
         
      </form>
    </div>
    </div>
  )
}

export default LoginClass
