
import { useNavigate} from "react-router-dom"
import styled from "styled-components"
import { goToDetailPage } from "../router/cordinator"

const Display = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid;
margin: 10px;
width: 80%;

.title{
    margin: 15px;
}

.votes{
    margin-bottom: 10px;
    margin-top: 5px;
}

:hover{
    background-color: gray;
    cursor: pointer;
}
`

export const EnqueteDisplay = (props)=>{
    const nav = useNavigate()

    const DateModule = ()=>{

        const startDate = new Date(String(props.endDate)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        const endDate = new Date(props.startDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        return (
            <div>
                <h3>Início da enquete: {startDate.slice(0,8)} às {startDate.slice(10,16)}</h3>
                <h3>fim da enquete: {endDate.slice(0,8)} às {endDate.slice(10,16)}</h3>
            </div>
        )
    }

    return(

        <Display onClick={()=>{goToDetailPage(nav,props.id)}}>
            <h1 className="title">{props.title}</h1>
            <h1>{DateModule()}</h1>
            <h1 className="votes">Total de votos: {props.totalVotes}</h1>
        </Display>
    )
}