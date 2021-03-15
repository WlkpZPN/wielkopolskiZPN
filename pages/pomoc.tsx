//components
import { protectedClientRoute } from "../middleware/protectedClient";
import ClientLayout from "../components/organisms/client_layout";

const Pomoc = ({ authData }) => {
  return (
    <ClientLayout clubData={authData} view="Pomoc">
      <h1>Pomoc / FAQ</h1>
    </ClientLayout>
  );
};

export const getServerSideProps = protectedClientRoute((context, data) => {
  return {
    props: {
      authData: data,
    },
  };
});

export default Pomoc;
