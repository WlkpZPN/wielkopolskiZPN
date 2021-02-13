import styled from "styled-components";

//utils
import { protectedClientRoute } from "../middleware/protectedClient";

//components
import PrimaryButton from "../components/atoms/primary_button";
import ClientLayout from "../components/organisms/client_layout";
import StepBox from "../components/atoms/step_box";
import FormTemplate from "../components/atoms/form_template";
import FormInput from "../components/atoms/form_input";
import Select from "../components/atoms/form_select";
const Content = styled.div`
  padding: 16px 0;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.h1`
  margin-bottom: 16px;
`;

const StepsContainer = styled.div`
  display: flex;
`;
const Home = () => {
  return (
    <ClientLayout>
      <Content>
        <Header>Złóż wniosek licencyjny</Header>
        <StepsContainer>
          <StepBox
            completed={true}
            number="1"
            active={false}
            text="Podstawowe dane"
            helperText="Wybór klasy rozgrywkowej"
          />
          <StepBox
            completed={false}
            number="2"
            active={true}
            text="Prawo"
            helperText="Kryteria prawne"
          />
          <StepBox
            completed={false}
            number="3"
            active={false}
            text="Sport"
            helperText="Kryteria sportowe"
          />
          <StepBox
            completed={false}
            number="4"
            active={false}
            text="Obiekty"
            helperText="Kryteria infrastrukturalne"
          />
          <StepBox
            completed={false}
            number="5"
            active={false}
            text="Finanse"
            helperText="Kryteria finansowe"
          />
          <StepBox
            completed={false}
            number="6"
            active={false}
            text="Personel"
            helperText="kryteria personalne"
          />
          <StepBox
            completed={false}
            number="7"
            active={false}
            text="Załączniki"
            helperText="Załącz dokumenty"
          />
        </StepsContainer>
        <FormTemplate>
          <Select>
            <option>IV liga</option>
            <option>III liga</option>
            <option>II liga</option>
            <option>I liga</option>
          </Select>
        </FormTemplate>
      </Content>
    </ClientLayout>
  );
};

export default Home;
