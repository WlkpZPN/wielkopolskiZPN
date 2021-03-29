import styled from 'styled-components'
import {useRouter} from 'next/router';


const Wrapper = styled.div``;

const Custom404 = () => {
    return <Wrapper><p>Strona której szukasz nie istnieje</p></Wrapper>;
}


export default Custom404;