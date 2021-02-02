import styled from 'styled-components';



const IconButton = styled.p`
display:flex;
justify-content:center;
font-weight:bold;
color:${({ theme }) => theme.primary};
width:min-content;
transition:all .2s;
cursor:pointer;
& svg {
    width:30px;
}

&:hover {
    color:${({theme}) => theme.primaryLight}
}
`;


export default IconButton;