import { useState } from "react";


  
const InputSelectPoke = () => {
    const [busca , setBusca] = useState('')
   
    
    return (
        <>
            <input type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)}
             placeholder="find the pokemon" className="input-search"></input>
        </>
        
    )
}

export default InputSelectPoke