import styled from 'styled-components';



const IconButton = styled.p`
display:flex;
justify-content:center;
font-weight:bold;
color:${({ theme }) => theme.primary};
width:min-content;
transition:all .2s;
font-size:15px;
white-space:nowrap;
align-items:center;
cursor:pointer;
& svg {
    height:20px;
    margin-right:6px;
}

&:hover {
    color:${({theme}) => theme.primaryLight}
}
`;


export default IconButton;