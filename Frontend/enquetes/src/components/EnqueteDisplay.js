
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { goToDetailPage } from "../router/cordinator"
const Display = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid;
margin: 20px;
`

export const EnqueteDisplay = (props)=>{
    const nav = useNavigate()

    return(

        <Display onClick={()=>{goToDetailPage(nav,props.id)}}>
            <h1>{props.title}</h1>
            <h1>votos: {props.totalVotes}</h1>
        </Display>
    )
}