import { BrowserRouter , Route , Routes } from "react-router-dom"
import { Posts } from "./pokemonsList"
import { Post } from "./pokemon"

const AppRoutes = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Posts/>}/>
            <Route exact path='/pokemon/:id' element={<Post/>}/>
        </Routes>
    </BrowserRouter>
    )
    
}

export {AppRoutes}