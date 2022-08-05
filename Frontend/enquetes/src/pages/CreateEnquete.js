import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { OptionDisplay } from "../components/OptionDisplay"
import { BASE_URL } from "../constants/BaseUrl"
import { goToMainPage } from "../router/cordinator"


const Container = styled.div`
min-height: 100vh;
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

h1{
    margin-left: 10px;
}
`

const FormButton = styled.button`
    width: 91%;
    height: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
`

const Form = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid;
padding: 10px;
width: 90%;

    input{
        width: 90%;
        height: 30px;
        margin: 5px;
        border: 1px solid;
    }
`

const Options = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
border: 1px solid;
margin-top: 5px;
`

const DateTime = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 91%;

div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
}

h3{
    width: 50px;
}
`

const Section = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`

export const CreateEnquete = () => {
    const [title, setTitle] = useState()
    const [dateStartDate, setDateStartDate] = useState()
    const [dateEndDate, setDateEndDate] = useState()
    const [timeStartDate, setTimeStartDate] = useState()
    const [timeEndDate, setTimeEndDate] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [options, setOptions] = useState([])
    const [optionTitle, setOptionTitle] = useState()
    const nav = useNavigate()

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDateStartDate = (e) => {
        setDateStartDate(e.target.value)
    }

    const onChangeTimeStartDate = (e) => {
        setTimeStartDate(e.target.value)
    }

    const onChangeDateEndDate = (e) => {
        setDateEndDate(e.target.value)
    }

    const onChangeTimeEndDate = (e) => {
        setTimeEndDate(e.target.value)
    }

    const onChangeOptionTitle = (e) => {
        setOptionTitle(e.target.value)
    }

    const addOption = (e) => {
        e.preventDefault()
        const newArray = [...options, optionTitle]
        setOptions(newArray)
    }

    const removeOption = (i) => {
        let newArray = [...options]
        newArray.splice(i,1)
        setOptions(newArray)
    }

    const createEnquete = () => {
        
        setStartDate(new Date(`${dateStartDate} ${timeStartDate}`))
        setEndDate(new Date(`${dateEndDate} ${timeEndDate}`))

        const BODY = {
            title,
            startDate,
            endDate,
            options
        }

        axios.post(`${BASE_URL}/enquete/create`,BODY)
        .then(res=>{
            console.log(res.data.message)
            goToMainPage(nav)
        }).catch(error=>{
            alert(error.response.data)
        })

    }

    const optionsList = options && options.map((item,i) => {
        return <OptionDisplay
            title={item}
            remove={removeOption}
            index={i}
        />
    })

    useEffect(()=>{
        setOptionTitle("")
    },[options])

    return (
        <Container>
            <Header>
                <h1>Enquetes</h1>
                <button onClick={() => { goToMainPage(nav) }}>Voltar</button>
            </Header>
            <Section>
                <Form>
                    <h1> Crie sua Enquete </h1>
                    <input value={title} onChange={onChangeTitle} placeholder="Título" />
                    <DateTime>
                        <h3>inicio</h3>
                        <div>
                            <input value={dateStartDate} onChange={onChangeDateStartDate} type={"date"}/>
                            <input value={timeStartDate} onChange={onChangeTimeStartDate} type={"time"}/>
                        </div>
                    </DateTime>
                    <DateTime>
                        <h3>fim</h3>
                        <div>
                            <input value={dateEndDate} onChange={onChangeDateEndDate} type={"date"}/>
                            <input value={timeEndDate} onChange={onChangeTimeEndDate} type={"time"}/>
                        </div>
                    </DateTime>
                    <Options>
                        <p>{"escreva as opções ( no mínimo 3)"}</p>
                        <input value={optionTitle} onChange={onChangeOptionTitle} placeholder="Nome da opção" />
                        {optionsList}
                        <FormButton onClick={addOption}> Adicionar Opção </FormButton>
                    </Options>
                    <FormButton onClick={createEnquete}> Criar Enquete </FormButton>
                </Form>
            </Section>
            <Footer>
                <h1>Teste Signo Soluções Web</h1>
            </Footer>
        </Container>
    )
}
