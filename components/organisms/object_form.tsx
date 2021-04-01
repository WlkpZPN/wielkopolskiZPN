import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ApplicationContext } from "./club_application";
import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";

import Input from "../atoms/input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";

import Info from "../atoms/Info";

import ObjectInfo from "../molecules/object_info";
import FormHeader from "../atoms/form_header";
import Fieldset from "../atoms/fieldset";
import ErrorMessage from "../atoms/error_message";
import AddFilesWrapper from "./add_files_wrapper";
import ZipCodeInput from "../atoms/zip_code_input";
import NummericInput from "../atoms/numeric_input";
import NumericInput from "../atoms/numeric_input";
const ObjectForm = ({ readOnly, objectIndex }) => {
  const router = useRouter();
  const [error, setError] = useState({ step: null, text: "" });
  const [state, setState] = useState(false);
  const context = useContext(ApplicationContext);
  const data = context.formData.stepFour.sport_facilities[objectIndex];
  const {
    handleObjectFileChange,
    handleObjectFileDelete,
    deleteFacility,
  } = context;
  // console.log(context);
  const objectFiles =
    context.formData.stepFour.sport_facilities[objectIndex]
      ?.applications_attachments;
  // console.log(objectFiles);
  const getCategoryFiles = (category) => {
    return objectFiles.filter((file) => file.category === category);
  };

  const setFiles = (id, file, category) => {
    handleObjectFileChange(id, file, file.name, category, objectIndex);
    setState(!state);
  };

  const handleDelete = (index, id, category) => {
    handleObjectFileDelete(index, id, category);
    setState(!state);
  };
  //console.log(data);
  const handleChange = context.handleObjectChange;
  const handleObjectSave = (e) => {
    e.preventDefault();

    // // check all required fields
    // if (!data.name || !data.address || !data.post_code || !data.city) {
    //   setError({ step: 0, text: "Proszę wpisać nazwę oraz adres obiektu" });
    //   window.scrollTo(0, 0);
    //   return;
    // }

    // if (!data.I01_1 || !data.I01_2) {
    //   setError({ step: 1, text: "Proszę zaznaczyć wszystkie pola formularza" });
    //   return;
    // }

    // if (!data.I02_1 || !data.I02_2 || !data.I02_3 || !data.I02_4) {
    //   setError({ step: 2, text: "Proszę zaznaczyć wszystkie pola formularza" });

    //   return;
    // }

    // if (!data.I03_1 || !data.I03_2 || !data.I03_total_capacity) {
    //   setError({
    //     step: 3,
    //     text: "Proszę podać liczbę miejsc oraz zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I04_1 ||
    //   !data.I04_2 ||
    //   !data.I04_3 ||
    //   !data.I04_4 ||
    //   !data.I04_5
    // ) {
    //   setError({
    //     step: 4,
    //     text: "Proszę zaznaczyć wszystkie pola formularza",
    //   });
    //   return;
    // }

    // if (
    //   !data.I05_number_of_seats_for_quests ||
    //   !data.I05_percentage_of_seats_for_guests ||
    //   !data.I05_1 ||
    //   !data.I05_2
    // ) {
    //   setError({
    //     step: 5,
    //     text:
    //       "Proszę podać liczbę miejsc,procent pojemności oraz zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I06_type ||
    //   !data.I06_condition ||
    //   !data.I06_width ||
    //   !data.I06_length ||
    //   !data.I06_1 ||
    //   !data.I06_4 ||
    //   !data.I06_5
    // ) {
    //   setError({
    //     step: 6,
    //     text:
    //       "Proszę określić rodzaj i stan nawierzchni oraz zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (data.I06_type === "sztuczna" && (!data.I06_2 || !data.I06_3)) {
    //   setError({
    //     step: 6,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (!data.I07_1 || !data.I07_2 || !data.I07_3 || !data.I07_4) {
    //   setError({
    //     step: 7,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I08_number_of_seats_on_the_bench ||
    //   !data.I08_1 ||
    //   !data.I08_2 ||
    //   !data.I08_3 ||
    //   !data.I08_4
    // ) {
    //   setError({
    //     step: 8,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (!data.I09_1 || !data.I09_2) {
    //   setError({
    //     step: 9,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (!data.I10_1) {
    //   setError({
    //     step: 10,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I11_number_of_seats ||
    //   !data.I11_number_of_hangers_or_lockers ||
    //   !data.I11_number_of_showers ||
    //   !data.I11_number_of_toilets ||
    //   !data.I11_1 ||
    //   !data.I11_2
    // ) {
    //   setError({
    //     step: 11,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I12_number_of_seats ||
    //   !data.I12_number_of_hangers_or_lockers ||
    //   !data.I12_number_of_showers ||
    //   !data.I12_number_of_toilets ||
    //   !data.I12_1 ||
    //   !data.I12_2
    // ) {
    //   setError({
    //     step: 12,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I13_1 ||
    //   !data.I13_2 ||
    //   !data.I13_3 ||
    //   !data.I13_4 ||
    //   !data.I13_5
    // ) {
    //   setError({
    //     step: 13,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (!data.I14_1 || !data.I14_2 || !data.I14_3) {
    //   setError({
    //     step: 14,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (
    //   !data.I15_number_of_toilets_for_women ||
    //   !data.I15_number_of_toilets_for_men ||
    //   !data.I15_standard ||
    //   !data.I15_1
    // ) {
    //   setError({
    //     step: 15,
    //     text:
    //       "Proszę podać liczbe toalet,podać standard oraz potwierdzić posiadanie wyposażenia do mycia",
    //   });
    //   return;
    // }

    // if (!data.I16_1) {
    //   setError({
    //     step: 16,
    //     text: "Proszę potwierdzić posiadanie systemu nagłaśniającego",
    //   });
    //   return;
    // }

    // if (!data.I17_1) {
    //   setError({
    //     step: 17,
    //     text: "Proszę potwierdzić posiadanie oświetlenia na obiekcie",
    //   });
    //   return;
    // }

    // if (data.I17_1) {
    //   if (!data.I17_intensity_level) {
    //     setError({
    //       step: 17,
    //       text: "Proszę podać poziom natężenia oświetlenia",
    //     });
    //     return;
    //   }
    // }

    // if (!data.I18_1) {
    //   setError({
    //     step: 18,
    //     text: "Proszę potwierdzić oznakowanie szatni",
    //   });
    //   return;
    // }

    // if (!data.I19_1 || !data.I19_2 || !data.I19_3) {
    //   setError({
    //     step: 19,
    //     text: "Proszę zaznaczyć wszystkie pola",
    //   });
    //   return;
    // }

    // if (!data.I20_1) {
    //   setError({
    //     step: 20,
    //     text:
    //       " Proszę potwierdzić posiadanie miejsc dla niepełnosprawnych na obiekcie",
    //   });
    //   return;
    // }

    // save object to form state

    console.log("all goood");
    context.addSportFacility();
  };
  return (
    <FormTemplate
      onChange={() => setError({ step: null, text: "" })}
      width="100%"
      onSubmit={(e) => e.preventDefault()}
    >
      <Fieldset disabled={readOnly}>
        <div style={{ maxWidth: "800px" }}>
          {error.step === 0 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label>
            Nazwa obiektu sportowego
            <Input
              value={data.name}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "name")
              }
              type="text"
            />
            <Info />
          </Label>
          <Label>
            Adres obiektu sportowego
            <Input
              value={data.address}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "address")
              }
              type="text"
            />
            <Info />
          </Label>
          <FormRow>
            <Label>
              Kod pocztowy
              <ZipCodeInput
                value={data.post_code}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "post_code")
                }
              />
            </Label>
            <Label>
              Miasto
              <Input
                value={data.city}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "city")
                }
                type="text"
              ></Input>
            </Label>
          </FormRow>
        </div>
      </Fieldset>
      <ObjectInfo>
        <Fieldset disabled={readOnly}>
          <FormHeader>Kryterium I.01 - Stadion - dostępność</FormHeader>
          <Label direction="row" htmlFor="1">
            <Input
              checked={data.I01_1 === true}
              onChange={(e) => handleChange(true, objectIndex, "I01_1")}
              type="radio"
              id="1"
              name="seasons"
              value={1}
            />
            Jesteśmy właścicielem Stadionu
          </Label>
          <Label direction="row" htmlFor="2">
            <Input
              checked={data.I01_1 === false}
              onChange={(e) => handleChange(false, objectIndex, "I01_1")}
              type="radio"
              value={0}
              name="seasons"
              id="2"
            />
            Posiadamy pisemną umowę z właścicielem stadionu
          </Label>
          {data.I01_1 ? null : (
            <>
              {" "}
              <Paragraph>
                Umowa gwarantująca prawo do korzystania z obiektu sportowego
              </Paragraph>
              <AddFilesWrapper
                deleteFile={(id) =>
                  handleDelete(objectIndex, id, "I01_agreement")
                }
                fileData={getCategoryFiles("I01_agreement")}
                setFiles={(id, file) => setFiles(id, file, "I01_agreement")}
              />
              <Label pointer margin="16px 0" direction="row">
                <RadioSquare
                  value={data.I01_2}
                  handleChange={() =>
                    handleChange(!data.I01_2, objectIndex, "I01_2")
                  }
                />
                Umowa gwarantuje prawo do korzystania ze stadionu przez cały
                sezon,w którym ubiegamy się o licencję
              </Label>
            </>
          )}

          <FormHeader>Kryterium I.02 Regulaminy</FormHeader>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I02_1}
                handleChange={() =>
                  handleChange(!data.I02_1, objectIndex, "I02_1")
                }
              />
              Wewnętrzne regulaminy obiektu, w formacie nie mniejszym niż B1
              (70cm x 100cm) rozmieszczone są przez każdym wejściem w taki
              sposób,by widzowie mogli je przeczytać przed wejściem na obiekt.
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I02_2}
                handleChange={() =>
                  handleChange(!data.I02_2, objectIndex, "I02_2")
                }
              />
              Regulaminy zawodów piłkarskich niebędących imprezą masową w
              formacie nie mniejszym niż B1 (70cm x 100cm) rozmieszczone są
              przed każdym wejściem w taki sposób,by widzowie mogli je
              przeczytać
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I02_3}
                handleChange={() =>
                  handleChange(!data.I02_3, objectIndex, "I02_3")
                }
              />
              Właściwe przepisy prawa powszechnego nakładają na Klub obowiązek
              posiadania regulaminu imprezy masowej
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I02_4}
                handleChange={() =>
                  handleChange(!data.I02_4, objectIndex, "I02_4")
                }
              />
              Regulaminy imprezy masowej,w formacie nie mniejszym niż B1 (70cm x
              100cm) rozmieszczone są przed każdym wejściem w taki sposóv, by
              widzowie mogli je przeczytać przed wejściem na obiekt.
            </span>
          </Label>
          <FormHeader>Kryterium I.03 - Pojemność</FormHeader>
          <Label width="50%">
            Całkowita liczba indywidualnych miejsc siedzących z oparciami
            udostępniona dla publiczności
            <NumericInput
              value={data.I03_total_capacity}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I03_total_capacity")
              }
              suffix={null}
              placeholder="0"
            />
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I03_1}
                handleChange={() =>
                  handleChange(!data.I03_1, objectIndex, "I03_1")
                }
              />
              Miejsca siedzące spełniają wymogi indywidualnych miejsc siedzących
              zdefiniowanych w kryterium I.04
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I03_2}
                handleChange={() =>
                  handleChange(!data.I03_2, objectIndex, "I03_2")
                }
              />
              Ilość miejsc udostępnionych dla publiczności spełnia wymogi
              ninejszego kryterium
            </span>
          </Label>
          <FormHeader>
            Kryterium I.04 - Indywidualne miejsca siedzące
          </FormHeader>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I04_1}
                handleChange={() =>
                  handleChange(!data.I04_1, objectIndex, "I04_1")
                }
              />
              Przytwierdzone na stałe (np. do podłoża)
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I04_2}
                handleChange={() =>
                  handleChange(!data.I04_2, objectIndex, "I04_2")
                }
              />
              Oddzielone od innych
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I04_3}
                handleChange={() =>
                  handleChange(!data.I04_3, objectIndex, "I04_3")
                }
              />
              Wygodne (anatomicznie wyprofilowane)
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I04_4}
                handleChange={() =>
                  handleChange(!data.I04_4, objectIndex, "I04_4")
                }
              />
              Z oparciami o wysokości 20-30cm, mierząc od siedziska
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I04_5}
                handleChange={() =>
                  handleChange(!data.I04_5, objectIndex, "I04_5")
                }
              />
              Wykonane z materiału trudnopalnego
            </span>
          </Label>
          <FormHeader>
            Kryterium I.05 - Miejsce dla kibiców drużyny gości
          </FormHeader>
          <Label width="50%">
            Liczba indywidualnych miejsc siedzących z oparciami w sektorze
            kibiców drużyny gości
            <NumericInput
              value={data.I05_number_of_seats_for_guests}
              onChange={(e) => {
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I05_number_of_seats_for_guests"
                );
              }}
              suffix={null}
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Procent pojemności Stadionu udostępniony kibicom gości
            <NumericInput
              value={data.I05_percentage_of_seats_for_guests}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I05_percentage_of_seats_for_guests"
                )
              }
              suffix="%"
              placeholder="0%"
            />
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I05_2}
                handleChange={() =>
                  handleChange(!data.I05_2, objectIndex, "I05_2")
                }
              />
              Obszar oddzielony od pozostałych widzów ogrodzeniem trwałym o
              wysokości min. 2,2m z każdej ze stron oraz z możliwością
              utworzenia strefy klubowej
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I05_3}
                handleChange={() =>
                  handleChange(!data.I05_3, objectIndex, "I05_3")
                }
              />
              Zapewniono odrębny dostęp i niezależne urządzenia sanitarne
            </span>
          </Label>
          <FormHeader>Kryterium I.06 - Pole gry</FormHeader>
          <Label width="50%">
            Rodzaj nawierzchni
            <Select
              value={data.I06_type}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I06_type")
              }
            >
              <option value="naturalna">Naturalna trawa</option>
              <option value="sztuczna">Sztuczna trawa</option>
            </Select>
          </Label>
          <Label width="50%">
            Stan nawierzchni boiska
            <Select
              value={data.I06_condition}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I06_condition")
              }
            >
              <option value="dobry">Dobry</option>
              <option value="nierówny">Nierówny</option>
              <option value="zły">Zły</option>
            </Select>
          </Label>
          <Label>
            Wymiar pola gry (długość x szerokość)
            <div style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I06_length}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I06_length")
                }
                suffix="m"
                placeholder="0 m"
              />{" "}
              <span style={{ margin: "0 8px" }}>x</span>
              <NumericInput
                value={data.I06_width}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I06_width")
                }
                suffix="m"
                placeholder="0 m"
              />
            </div>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I06_1}
                handleChange={() =>
                  handleChange(!data.I06_1, objectIndex, "I06_1")
                }
              />
              Można na nim grać w ciągu całego sezonu rozgrywkowego
            </span>
          </Label>
          {data.I06_type === "sztuczna" ? (
            <>
              {" "}
              <Label pointer margin="16px 0" direction="row">
                <span>
                  <RadioSquare
                    value={data.I06_2}
                    handleChange={() =>
                      handleChange(!data.I06_2, objectIndex, "I06_2")
                    }
                  />
                  Nawierzchnia ma kolor zielony ( widoczne w przypadku wyboru
                  sztucznej murawy)
                </span>
              </Label>
              <Label pointer margin="16px 0" direction="row">
                <span>
                  <RadioSquare
                    value={data.I06_3}
                    handleChange={() =>
                      handleChange(!data.I06_3, objectIndex, "I06_3")
                    }
                  />
                  Nawierzchnia zatwierdzona przez Wielkopolski ZPN ( w przypadku
                  wyboru sztucznej murawy)
                </span>
              </Label>
            </>
          ) : null}
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I06_4}
                handleChange={() =>
                  handleChange(!data.I06_4, objectIndex, "I06_4")
                }
              />
              Pole gry ma trawiaste lub pokryte sztuczną murawą pobocze pola gry
              o szerokości min. 3 m za liniami bocznymi i szerokości min. 5 m za
              liniami końcowymi pola gry
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I06_5}
                handleChange={() =>
                  handleChange(!data.I06_5, objectIndex, "I06_5")
                }
              />
              Parametry pola gry spełniają wymogi niniejszego kryterium
            </span>
          </Label>
          <FormHeader>Kryterium I.07 - Obszar pola gry</FormHeader>
          <Label pointer margin="24px 0 16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I07_1}
                handleChange={() =>
                  handleChange(!data.I07_1, objectIndex, "I07_1")
                }
              />
              Obszar pola gry jest odgrodzony od miejsc udostępnionych dla
              publiczności stabilnym ogrodzeniem o wysokości min. 1,2 m
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I07_2}
                handleChange={() =>
                  handleChange(!data.I07_2, objectIndex, "I07_2")
                }
              />
              Ogrodzenie obszaru pola gry wyposażone jest w bramki ewakuacyjne
              pomalowane odróżniającym je od pozostałego ogrodzenia kolorem
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I07_3}
                handleChange={() =>
                  handleChange(!data.I07_3, objectIndex, "I07_3")
                }
              />
              Tablice,bandy reklamowe lub inne przeszkody stałe znajdujące się w
              obszarze gry są usytuowane w min. odległości 3 m od linii bocznych
              i 5 m od linii końcowych pola gry
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I07_4}
                handleChange={() =>
                  handleChange(!data.I07_4, objectIndex, "I07_4")
                }
              />
              Słupki odciągów siatek na bramkach,a także słupy piłkochwytów
              znajdują się w odległości nie mniejszej niż 5 m od liniii końcowej
              gry
            </span>
          </Label>
          <FormHeader>Kryterium I.08 - Ławki w obszarze pola gry</FormHeader>
          <Label width="50%">
            Liczba miejsc siedzących na ławce dla rezerwowych
            <NumericInput
              value={data.I08_number_of_seats_on_the_bench}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I08_number_of_seats_on_the_bench"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I08_1}
                handleChange={() =>
                  handleChange(!data.I08_1, objectIndex, "I08_1")
                }
              />
              Ławki dla rezerwowych spełniają wymogi wynikające z niniejszego
              kryterium z uwzględnieniem właściwej ligi lub klasy rozgrywkowej
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I08_2}
                handleChange={() =>
                  handleChange(!data.I08_2, objectIndex, "I08_2")
                }
              />
              Ławki dla rezerwowych usytuowane są w odległości nie mniejszej niż
              3 m od linii bocznej pola gry,rozstawione symetrycznie w sotsunku
              do osi pola gry i w odległości od siebie nie większej niż 30 m
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I08_3}
                handleChange={() =>
                  handleChange(!data.I08_3, objectIndex, "I08_3")
                }
              />
              Punkt sanitarny oraz stanowisko dla min. dwóch noszowych jest
              wyznaczone i oznakowane białym krzyżem na zielonym tle
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I08_4}
                handleChange={() =>
                  handleChange(!data.I08_4, objectIndex, "I08_4")
                }
              />
              Stanowisko dla noszowych wyposażone jest w min. jedną pare noszy z
              usztywnieniem
            </span>
          </Label>
          <FormHeader>Kryterium I.09 - Dostęp do obszaru pola gry</FormHeader>
          <Label pointer margin="24px 0 16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I09_1}
                handleChange={() =>
                  handleChange(!data.I09_1, objectIndex, "I09_1")
                }
              />
              Wyjście na obszar pola gry jest osłonięte ogniotrwałym wysuwanym
              tunelem lub w inny sposób zapewniający bezpieczeństwo sędziów i
              zawodników
            </span>
          </Label>
          <Label pointer margin="16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I09_2}
                handleChange={() =>
                  handleChange(!data.I09_2, objectIndex, "I09_2")
                }
              />
              Sędziowie i zawodnicy mają w czasie pobytu na Stadionie zapewnioną
              odpowiednią ochronę
            </span>
          </Label>
          <FormHeader>Kryterium I.10 - Dojazd do obszaru pola gry</FormHeader>
          <Label pointer margin="24px 0 16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I10_1}
                handleChange={() =>
                  handleChange(!data.I10_1, objectIndex, "I10_1")
                }
              />
              Pojazdy pogotowia,straży pożarnej,policji itp. mają możliwość
              bezpośredniego dojazdu do obszaru pola gry
            </span>
          </Label>
          <FormHeader>
            Kryterium I.11 - Szatnia dla drużyny gospodarzy
          </FormHeader>
          <Label width="50%">
            Liczba miejsc siedzących
            <NumericInput
              value={data.I11_number_of_seats}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I11_number_of_seats")
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba wieszaków lub szafek na odzież
            <NumericInput
              value={data.I11_number_of_hangers_or_lockers}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I11_number_of_hangers_or_lockers"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba pryszniców
            <NumericInput
              value={data.I11_number_of_showers}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I11_number_of_showers"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba toalet z sedesem
            <NumericInput
              value={data.I11_number_of_toilets}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I11_number_of_toilets"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I11_1}
                handleChange={() =>
                  handleChange(!data.I11_1, objectIndex, "I11_1")
                }
              />
              W szatni znajduje się tablica do prezentacji taktyki
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I11_2}
                handleChange={() =>
                  handleChange(!data.I11_2, objectIndex, "I11_2")
                }
              />
              Szatnia zawodników drużyny gospodarzy spełnia wymogi wynikające z
              niniejszego kryterium
            </span>
          </Label>
          <FormHeader>Kryterium I.12 - Szatnia dla drużyny gości</FormHeader>
          <Label width="50%">
            Liczba miejsc siedzących
            <NumericInput
              value={data.I12_number_of_seats}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I12_number_of_seats")
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba wieszaków lub szafek na odzież
            <NumericInput
              value={data.I12_number_of_hangers_or_lockers}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I12_number_of_hangers_or_lockers"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba pryszniców
            <NumericInput
              value={data.I12_number_of_showers}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I12_number_of_showers"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba toalet z sedesem
            <NumericInput
              value={data.I12_number_of_toilets}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I12_number_of_toilets"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I12_1}
                handleChange={() =>
                  handleChange(!data.I12_1, objectIndex, "I12_1")
                }
              />
              W szatni znajduje się tablica do prezentacji taktyki
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I12_2}
                handleChange={() =>
                  handleChange(!data.I12_2, objectIndex, "I12_2")
                }
              />
              Szatnia zawodników drużyny gospodarzy spełnia wymogi wynikające z
              niniejszego kryterium
            </span>
          </Label>
          <FormHeader>Kryterium I.13 - Szatnia dla sędziów </FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_1}
                handleChange={() =>
                  handleChange(!data.I13_1, objectIndex, "I13_1")
                }
              />
              Szatnia dla sędziów jest zapewniona
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_2}
                handleChange={() =>
                  handleChange(!data.I13_2, objectIndex, "I13_2")
                }
              />
              Szatnia dla sędziów oddzielona jest od szatni dla zawodników lecz
              w ich pobliżu
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_3}
                handleChange={() =>
                  handleChange(!data.I13_3, objectIndex, "I13_3")
                }
              />
              W szatni dostępne są miejsca do siedzenia, wieszaki lub szafki na
              odzież dla 4 osób
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_4}
                handleChange={() =>
                  handleChange(!data.I13_4, objectIndex, "I13_4")
                }
              />
              W szatni lub w bezpośrednim jej pobliżu dostępny jest min. 1
              prysznic
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_5}
                handleChange={() =>
                  handleChange(!data.I13_5, objectIndex, "I13_5")
                }
              />
              W szatni lub w bezpośrednim jej pobliżu dostępna jest min. 1
              toaleta
            </span>
          </Label>
          <FormHeader>Kryterium I.14 Parking</FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I14_1}
                handleChange={() =>
                  handleChange(!data.I14_1, objectIndex, "I14_1")
                }
              />
              Na obiekcie dostępna jest min. liczba miejsc parkingowych w
              strefie chronionej przeznaczonych dla sędziów, oficjalnych
              przedstawicieli i uczestniczących w zawodach klubów
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I14_2}
                handleChange={() =>
                  handleChange(!data.I14_2, objectIndex, "I14_2")
                }
              />
              Min. 1 miejsce parkingowe dla autokarów
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I14_3}
                handleChange={() =>
                  handleChange(!data.I14_3, objectIndex, "I14_3")
                }
              />
              Min. 10 miejsc parkingowych dla samochodów
            </span>
          </Label>
          <FormHeader>Kryterium I.15</FormHeader>
          <Label width="50%">
            Liczba toalet dla kobiet
            <NumericInput
              value={data.I15_number_of_toilets_for_women}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I15_number_of_toilets_for_women"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Liczba toalet dla mężczyzn
            <NumericInput
              value={data.I15_number_of_toilets_for_men}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I15_number_of_toilets_for_men"
                )
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            Standart urządzeń (czyste,jasne,higieniczne itp. )
            <Select
              value={data.I15_standard}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I15_standard")
              }
            >
              <option value="Doskonały">Doskonały</option>
              <option value="Odpowiedni">Odpowiedni</option>
              <option value="Niski">Niski</option>
            </Select>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I15_1}
                handleChange={() =>
                  handleChange(!data.I15_1, objectIndex, "I15_1")
                }
              />
              Wyposażenie do mycia (umywalki, woda, ręczniki, suszarki itp.)
            </span>
          </Label>
          <FormHeader>Kryterium I.16 - Nagłośnienie</FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I16_1}
                handleChange={() =>
                  handleChange(!data.I16_1, objectIndex, "I16_1")
                }
              />
              Stadion wyposażony jest w dobrze słyszalny w każdej częsci system
              nagłaśniający
            </span>
          </Label>
          <FormHeader>Kryterium I.17 - Oświetlenie</FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I17_1}
                handleChange={() =>
                  handleChange(!data.I17_1, objectIndex, "I17_1")
                }
              />
              Stadion wyposażony jest w oświetlenie pokrywające równomiernie
              cały obszar pola gry
            </span>
          </Label>
          {data.I17_1 ? (
            <>
              <Label width="50%">
                Poziom natężenia oświetlenia w lx
                <NumericInput
                  value={data.I17_intensity_level}
                  onChange={(e) =>
                    handleChange(
                      data.I17_intensity_level,
                      objectIndex,
                      "I17_intensity_level "
                    )
                  }
                  suffix="lx"
                  placeholder="0 luksów"
                />
              </Label>
              <Label>
                Dokument poświadczający pomiar natężenia światła
                <AddFilesWrapper
                  deleteFile={(id) =>
                    handleDelete(objectIndex, id, "I17_intensity_document")
                  }
                  fileData={getCategoryFiles("I17_intensity_document")}
                  setFiles={(id, file) =>
                    setFiles(id, file, "I17_intensity_document")
                  }
                />
              </Label>{" "}
            </>
          ) : null}

          <FormHeader>Kryterium I.18 - Oznakowanie w strefie szatni</FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I18_1}
                handleChange={() =>
                  handleChange(!data.I18_1, objectIndex, "I18_1")
                }
              />
              Wszystkie pomieszczenia meczowe są odpowiednio i w dobrze widoczny
              sposób, oznakowane (np. szatnia drużyny gospodarzy, szatnia
              drużyny gości, sędziowie)
            </span>
          </Label>
          <FormHeader>
            Kryterium I.19 - Publiczny dostęp i wyjścia ze Stadionu
          </FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I19_1}
                handleChange={() =>
                  handleChange(!data.I19_1, objectIndex, "I19_1")
                }
              />
              Stadion wyposażony jest w ogrodzenie zewnętrzne
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I19_2}
                handleChange={() =>
                  handleChange(!data.I19_2, objectIndex, "I19_2")
                }
              />
              Przy wejściu są oznakowane punkty kasowe i depozytowe
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I19_3}
                handleChange={() =>
                  handleChange(!data.I19_3, objectIndex, "I19_3")
                }
              />
              Wejścia na Stadion są wyposażone w barierki kierujące lub
              kołowrotki
            </span>
          </Label>
          <FormHeader>
            Kryterium I.20 - Miejsca dla osób niepełnosprawnych
          </FormHeader>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I20_1}
                handleChange={() =>
                  handleChange(!data.I20_1, objectIndex, "I20_1")
                }
              />
              Stadion wyposażony jest w min. 3 miejsca dla widzów
              niepełnosprawnych, w szczególności dla osób poruszających się na
              wózkach inwalidzkich i ich opiekunów
            </span>
          </Label>
          <div
            style={{
              fontWeight: "bold",
              display: "grid",
              gridGap: "16px",
              width: "min-content",
              gridTemplateColumns: "auto auto",
            }}
          >
            <PrimaryButton
              type="button"
              width="min-content"
              color="danger"
              hoverColor="dangerDark"
              onClick={() => deleteFacility(data)}
            >
              Usuń
            </PrimaryButton>
            <PrimaryButton
              type="submit"
              width="min-content"
              color="success"
              hoverColor="successDark"
              onClick={handleObjectSave}
            >
              Zapisz
            </PrimaryButton>
          </div>
        </Fieldset>
      </ObjectInfo>
    </FormTemplate>
  );
};

export default ObjectForm;
