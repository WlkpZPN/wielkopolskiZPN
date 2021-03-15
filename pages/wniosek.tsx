import styled from "styled-components";
import { protectedClientRoute } from "../middleware/protectedClient";

const Wniosek = () => {
  return <h1>Wniosek</h1>;
};

export const getServerSideProps = protectedClientRoute((context, data) => {
  return {
    props: {
      authData: data,
    },
  };
});

export default Wniosek;
