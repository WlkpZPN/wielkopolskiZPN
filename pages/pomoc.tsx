//components
import prisma from "../middleware/prisma";
import { protectedClientRoute } from "../middleware/protectedClient";
import ClientLayout from "../components/organisms/client_layout";
import Paragraph from "../components/atoms/paragraph";
import PrimaryButton from "../components/atoms/primary_button";

const Pomoc = ({ authData, faq }) => {
  return (
    <ClientLayout clubData={authData} view="Pomoc">
      <h1>Pomoc / FAQ</h1>
      <Paragraph style={{color:'black'}}>O co chcesz zapytać ?</Paragraph>
    </ClientLayout>
  );
};

export const getServerSideProps = protectedClientRoute(
  async (context, data) => {
    const faq = await prisma.frequently_asked_questions.findMany();
    return {
      props: {
        authData: data,
        faq: faq,
      },
    };
  }
);

export default Pomoc;
