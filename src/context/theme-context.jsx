import { createContext, useState } from "react";

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
    return (
        <ThemeContext.Provider value={{theme , setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}


// import { createContext, useState } from "react";

// export const themes = {
//     light: {
//         color: '#000',
//         background:  '#fff'
//     },
//     dark: {
//         color: '#fff',
//         background: '#000'
//     }
// }

// export const ThemeContext = createContext({})

// export const ThemeProvider = (props) => {

//     const [ theme , setTheme] = useState(themes.light)
//     console.log(theme);
    
//     return (
//         <ThemeContext.Provider value={{theme , setTheme}}>
//             {props.children}
//         </ThemeContext.Provider>
//     )
// }
