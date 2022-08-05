import { useNavigate, useParams } from "react-router-dom"
import { goToMainPage } from "../router/cordinator"
import axios from "axios"
import { BASE_URL } from "../constants/BaseUrl"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 100vh;
`

const Display = styled.div`
border: 1px solid;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;

h4{
    margin: 10px;
}

h3{
    margin-top: 10px;
}
`

const Header = styled.header`
background-color: black;
color: white;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 50px;

button{
    height: 100%;
    width: 150px;
    border: none;
    background-color: black;
    color: white;

    :hover{
        background-color: rgba(22, 22, 22, 0.993);
        cursor: pointer;
    }
}
`

const Footer = styled.footer`
background-color: black;
color: white;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`

const SelectButton = styled.button`
background-color: transparent;
border: none;
`

const Item = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
border: 1px solid;
width: 90%;
height: 30px;
margin: 10px;
background-color: ${props => props.select? "gray" : "white"};
cursor: ${props => props.select? "arrow" : "pointer"};
:hover{
    background-color: gray;
}
`

export const Enquete = (props)=>{
    const [message,setMessage] = useState()
    const [selection,setSelection] = useState(false)
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
    
    const vote = (option)=>{
        axios.put(`${BASE_URL}/enquete/vote/${id}?vote=${option}`)
        .then(res=>{
            setSelection(true)
            localStorage.setItem(`${id}`, selection)
            setMessage("Obrigado por votar!")
        }).catch(error=>{
            const errorMessage = error.response.data
            alert(errorMessage)

        })
    }

    useEffect(()=>{
        getEnqueteDetails()
        if(localStorage.getItem(`${id}`)){
            setSelection(localStorage.getItem(`${id}`))
            setMessage("Voce já votou nesse tópico")
        }
    },[])

    useEffect(()=>{
        getEnqueteDetails()
    },[selection])

    const activeSelection = currEnquete && currEnquete.options.map((item)=>{
        return (
            <Item select={false} onClick={()=>{vote(item.option)}}>
                <SelectButton>{item.option}</SelectButton>
                <p>votos: {item.votes}</p>
            </Item>
        )
    })

    const inactiveSelection = currEnquete && currEnquete.options.map((item)=>{
        return (
            <Item select={true}>
                <SelectButton>{item.option}</SelectButton>
                <p>votos: {item.votes}</p>
            </Item>
        )
    })

    const DateModule = ()=>{

        const startDate = new Date(String(currEnquete.endDate)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        const endDate = new Date(currEnquete.startDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        return (
            <div>
                <h3>Início da enquete: {startDate.slice(0,8)} às {startDate.slice(10,16)}</h3>
                <h3>fim da enquete: {endDate.slice(0,8)} às {endDate.slice(10,16)}</h3>
            </div>
        )
    }
    
    return(

        <Container>
            <Header>
                <h1>Enquetes</h1>
                <button onClick={()=> {goToMainPage(nav)}}>main page</button>
            </Header>
            <Display>
                <h1>{currEnquete && currEnquete.title}</h1>
                {currEnquete && DateModule()}
                <h4>Status da Enquete: {currEnquete && currEnquete.status}</h4>
                {selection? <h3>{message}</h3>:<p></p>}
                {selection? inactiveSelection : activeSelection}
            </Display>
            <Footer>
                <h1>Teste Signo Soluções Web</h1>
            </Footer>
        </Container>
    )
}