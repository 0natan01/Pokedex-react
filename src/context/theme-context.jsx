import { createContext, useEffect, useState } from "react";


export const themes = {
    light: {
        color: '#0d1717',
        background: '#ffffff',
        border: '#0d1717 '
    }, 
    dark: {
        color: '#ffffff',
        background: '#0c0c0c',
        border: '#ffffff',
        cardBackground: '#565656'
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme , setTheme ] = useState(themes.light)

    useEffect(() => {
        const currentTheme = JSON.parse(localStorage.getItem("theme"))
        if(currentTheme){
            setTheme(currentTheme)
        }
    },[])


    const handleThemeChange = (theme) => {
        setTheme(theme)
        localStorage.setItem("theme" , JSON.stringify(theme))
    }
    return (
        <ThemeContext.Provider value={{theme , handleThemeChange}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

