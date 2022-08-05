import { useEffect, useState } from "react"
import styled from "styled-components"

const Display = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 90%;

button{
    width: 30px;
    height: 30px;
}
`

export const OptionDisplay = (props)=>{
    const [index, setIndex] = useState()

    useEffect(()=>{
        setIndex(props.index)
    },[])

    return(
        <Display>
            <p>{props.title}</p>
            <button onClick={()=>{props.remove(index)}}> X </button>
        </Display>
    )
}