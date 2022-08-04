import { useNavigate, useParams } from "react-router-dom"
import { goToMainPage } from "../router/cordinator"
import axios from "axios"
import { BASE_URL } from "../constants/BaseUrl"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Container = styled.div`

`

const Display = styled.div`
border: 1px solid;
`

export const Enquete = (props)=>{
    const [currOption,setCurrOption] = useState()
    const [currEnquete,setCurrEnquete] = useState()
    const {id} = useParams()
    const nav = useNavigate()

    const getEnqueteDetails = ()=>{
        axios.get(`${BASE_URL}/enquete/getEnquete/${String(id)}`)
        .then(res=>{
            setCurrEnquete(res.data.enquete)
        }).catch(error=>{
            console.log(error.message)
        })
    }

    const onChangeOption = (e)=>{
        setCurrOption(e.target.value)
        console.log(currOption)
    }
    
    const confirmVote = ()=>{
        axios.put(`${BASE_URL}/enquete/vote/${id}?vote=${currOption}`)
        .then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getEnqueteDetails()
    },[])


    console.log(currEnquete)
    return(

        <Container>
            <Display>
                <h1>{currEnquete && currEnquete.title}</h1>
                <select onChange={onChangeOption}>
                    {currEnquete && currEnquete.options.map((item)=>{
                        return <option value={item.option}>{item.option}</option>
                    })}
                </select>
                <button onClick={confirmVote}>confirmar voto</button>
            </Display>
            <button onClick={()=> {goToMainPage(nav)}}>main page</button>
        </Container>
    )
}