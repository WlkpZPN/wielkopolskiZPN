import { useState } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
margin-right:16px;
`;





const Select = styled.select`

display: block;
	font-size: 14px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: .2em 1.4em .2em .8em;
	
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;
`;

const Progress = styled.div`
background-color:#E6E6E6;
width:450px;
height:25px;
border-radius:5px;
margin-top:4px;
position:relative;

&:before {
    content:'${({progress}) => `${progress}%`}';
    text-align:end;
    padding-right:10px;
    color:rgba(255,255,255,0.8);
    position:absolute;
    font-size:14px;
    display:block;
    line-height:25px;
    background:#888888;
    left:0;
    bottom:0;
    height:100%;
    width:${({progress}) => `${progress}%`};
    border-radius:5px;
}
`;
const ProgressBar = () => {
    const [progress, setProgress] = useState('20');
    return (
        <Wrapper>
            <Select name="requests" id="requests">

                <option value="zatwierdzone">Wnioski zatwierdzone</option>
                <option value="odrzucone">Wnioski odrzucone</option>
                <option value="wysłane">Wnioski wysłane</option>
                <option value="niewypełnione"> Wnioski niewypełnione</option>
            </Select>
            <Progress progress={progress}>

            </Progress>
        </Wrapper>

    )
}


export default ProgressBar;