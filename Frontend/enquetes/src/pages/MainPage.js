import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EnqueteDisplay } from "../components/EnqueteDisplay"
import { BASE_URL } from "../constants/BaseUrl"
import { goToDetailPage, goToMainPage } from "../router/cordinator"

export const MainPage = (props)=>{
    const [enquetes,setEnquetes] = useState()
    const nav = useNavigate()


    const getEnquetes = ()=>{
        axios.get(`${BASE_URL}/enquete/getAll`)
        .then(res=>{
            setEnquetes(res.data.enquetes)
        }).catch(error=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        getEnquetes()
    },[])

    const enqueteList = enquetes && enquetes.map((item)=>{
        return <EnqueteDisplay
        key={item.id}
        id={item.id}
        title={item.title}
        totalVotes={item.totalVotes}
        />
    })

    return(
        <div>
            <h1> Main Page </h1>
            {enqueteList}
        </div>
    )
}