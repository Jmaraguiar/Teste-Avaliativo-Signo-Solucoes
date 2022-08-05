import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { EnqueteDisplay } from "../components/EnqueteDisplay"
import { BASE_URL } from "../constants/BaseUrl"
import { goToCriarEnquete } from "../router/cordinator"

const Container = styled.div`
height: 100vh;
`

const Footer = styled.footer`
background-color: black;
color: white;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
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

const Section = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
`



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
        startDate = {item.startDate}
        endDate = {item.endDate}
        totalVotes={item.totalVotes}
        />
    })

    return(
        <Container>
            <Header>
                <h1>Enquetes</h1>
                <button onClick={()=>{goToCriarEnquete(nav)}}>Criar Enquete</button>
            </Header>
            <Section>
                {(enqueteList && enqueteList[0] == undefined)? <h1>Nenhuma enquete cadastrada</h1> : enqueteList}
            </Section>
            <Footer>
                <h1>Teste Signo Soluções Web</h1>
            </Footer>
        </Container>
    )
}