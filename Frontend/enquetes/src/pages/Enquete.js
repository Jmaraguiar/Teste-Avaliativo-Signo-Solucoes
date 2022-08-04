import { useNavigate } from "react-router-dom"
import { goToMainPage } from "../router/cordinator"

export const Enquete = (props)=>{

    const nav = useNavigate()

    return(

        <div>
            <h1> Enquete </h1>
            <button onClick={()=> {goToMainPage(nav)}}>main page</button>
        </div>
    )
}