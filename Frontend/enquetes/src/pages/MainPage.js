import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { goToDetailPage, goToMainPage } from "../router/cordinator"

export const MainPage = (props)=>{
    const id = "abc"
    const nav = useNavigate()
    return(
        <div>
        <h1> Main Page </h1>
        <button onClick={() =>{goToDetailPage(nav,id)}}>detail</button>
    </div>
    )
}