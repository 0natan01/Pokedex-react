import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import { themes } from "../../context/theme-context";
import { Button } from "../Button/button";


export const ThemeTogglerButton = () => {
   
    const { theme , setTheme } = useContext(ThemeContext)
    
    return (
        <>
            <Button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>Alterar/Tema</Button>
        </>
    )
}


// export const ThemeTogglerButton = () => {
//   const {  theme , setTheme  } = useContext(ThemeContext);

//   return (
//     <>
//       <Button
//         onClick={() =>
//           setTheme(theme === themes.light ? themes.dark : themes.light)
//         }
//       >
//         Alterar Tema
//       </Button>
//     </>
//   );
