import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import { themes } from "../../context/theme-context";
import { Button } from "../Button/button";


export const ThemeTogglerButton = () => {
   
    const { theme , handleThemeChange } = useContext(ThemeContext)
    
    return (
        <>
            <Button onClick={() => handleThemeChange(theme === themes.light ? themes.dark : themes.light)}>Alterar/Tema</Button>
        </>
    )
}
