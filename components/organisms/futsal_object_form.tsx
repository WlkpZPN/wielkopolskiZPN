import { useState, useContext, useEffect } from "react";
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
import { validateFutsalObject } from "../../middleware/stepValidation";
import ObjectInfo from "../molecules/object_info";
import FormHeader from "../atoms/form_header";
import Fieldset from "../atoms/fieldset";
import ErrorMessage from "../atoms/error_message";

import AddFacilityFilesWrapper from "./add_facility_files_wrapper";
import ZipCodeInput from "../atoms/zip_code_input";

import NumericInput from "../atoms/numeric_input";
import RadioButton from "../atoms/radio_button";

const FutsalForm = ({ readOnly, objectIndex }) => {
  const [error, setError] = useState({ step: null, text: "" });

  const [extraField, setExtraField] = useState({ visible: false, text: "" });
  const context = useContext(ApplicationContext);
  const data = context.formData.stepFour.futsal_facilities[objectIndex];

  const { deleteFacility } = context;

  const fileData = data.application_attachments;
  console.log("futsal form", data);
  const handleChange = context.handleFutsalChange;
  const handleObjectSave = (e) => {
    e.preventDefault();

    const { valid, step, text } = validateFutsalObject(data);

    if (!valid) {
      setError({
        step: step,
        text: text,
      });
      return;
    }

    context.addFutsalFacility();
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
              <ErrorMessage>{error.text}</ErrorMessage>
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
          </Label>
          <FormRow>
            <Label>
              Kod pocztowy
              <ZipCodeInput
                value={data.postal_code}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "postal_code")
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
          <FormHeader>Kryterium I.01 - Hala sportowa - dostępność</FormHeader>
          {error.step === 1 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label width="max-content" direction="row" htmlFor="1">
            <RadioButton
              checked={data.I01_1 === true}
              onChange={(e) => handleChange(true, objectIndex, "I01_1")}
              id="1"
              name="seasons"
              value={1}
            >
              Jesteśmy właścicielem Hali sportowej
            </RadioButton>
            <Info
              text="Oświadczamy, że nasz klub posiada powyższy obiekt sportowy/obiekty sportowe umożliwiający/e rozgrywanie meczów w ramach rozgrywek klubowych, który/e spełnia/ją wszystkie minimalne wymagania określone w niniejszych.

Dla każdego wymienionego obiektu sportowego należy uzupełnić informację dotyczącą obiektu sportowego.
"
            />
          </Label>
          <Label width="max-content" direction="row" htmlFor="1">
            <RadioButton
              checked={data.I01_1 === true}
              onChange={(e) => handleChange(false, objectIndex, "I01_1")}
              id="1"
              name="seasons"
              value={1}
            >
              Posiadamy pisemną umowę z właścicielem stadionu
            </RadioButton>
            <Info
              text="Oświadczamy, że nasz klub posiada powyższy obiekt sportowy/obiekty sportowe umożliwiający/e rozgrywanie meczów w ramach rozgrywek klubowych, który/e spełnia/ją wszystkie minimalne wymagania określone w niniejszych.

Dla każdego wymienionego obiektu sportowego należy uzupełnić informację dotyczącą obiektu sportowego.
"
            />
          </Label>

          {data.I01_1 === false ? (
            <>
              {" "}
              <Paragraph>
                Umowa gwarantująca prawo do korzystania z obiektu sportowego
              </Paragraph>
              {/* <AddFacilityFilesWrapper
                files={fileData}
                category="I01_agreement"
                text={null}
              /> */}
              <Label pointer margin="16px 0" direction="row">
                <RadioSquare
                  value={data.I01_2}
                  handleChange={() =>
                    handleChange(!data.I01_2, objectIndex, "I01_2")
                  }
                />
                Umowa gwarantuje prawo do korzystania z obiektu przez cały
                sezon,w którym ubiegamy się o licencję
              </Label>
            </>
          ) : null}

          <FormHeader>Kryterium I.02 Regulaminy</FormHeader>
          {error.step === 2 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label pointer margin="24px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I02_2}
                handleChange={() =>
                  handleChange(!data.I02_1, objectIndex, "I02_2")
                }
              />
              Wewnętrzne regulaminy obiektu, w formacie nie mniejszym niż B1
              (70cm x 100cm) rozmieszczone są przez każdym wejściem w taki
              sposób,by widzowie mogli je przeczytać przed wejściem na obiekt.
              Regulaminy zawodów piłkarskich niebędących imprezą masową w
              formacie nie mniejszym niż B1 (70cm x 100cm) rozmieszczone są
              przed każdym wejściem w taki sposób,by widzowie mogli je
              przeczytać. Właściwe przepisy prawa powszechnego nakładają na Klub
              obowiązek posiadania regulaminu imprezy masowej. Regulaminy
              imprezy masowej,w formacie nie mniejszym niż B1 (70cm x 100cm)
              rozmieszczone są przed każdym wejściem w taki sposób, by widzowie
              mogli je przeczytać przed wejściem na obiekt.
            </span>
          </Label>
          <FormHeader>Kryterium I.02 Widownia (Fakultatywne)</FormHeader>
          <Label width="max-content">
            <span>Całkowita ilość miejsc</span>
            <NumericInput
              value={data.I02_audience_capacity}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I02_audience_capacity"
                )
              }
              suffix={null}
              placeholder="0"
            />
          </Label>
          <Label width="max-content">
            <span>ilość wejść/wyjść na widownię</span>
            <NumericInput
              value={data.I02_audicence_entrance}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I02_audicence_entrance"
                )
              }
              suffix={null}
              placeholder="0"
            />
          </Label>

          <FormHeader>Kryterium I.03 - Oświetlenie </FormHeader>
          {error.step === 3 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label width="max-content">
            <span>Oświetlenie boiskaw LUX</span>
            <NumericInput
              value={data.I03_lighting}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I03_lighting")
              }
              suffix="lx"
              placeholder="0"
            />
          </Label>

          <FormHeader>Kryterium I.04 - Wymiary boiska</FormHeader>
          {error.step === 4 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label>
            Wymiar boiska (dł x szer.)
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "max-content",
              }}
            >
              <NumericInput
                value={data.I04_length}
                onChange={(e) =>
                  handleChange(e.target.rawValue, objectIndex, "I04_length")
                }
                suffix="m"
                placeholder="0"
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I04_width}
                onChange={(e) =>
                  handleChange(e.target.rawValue, objectIndex, "I04_width")
                }
                suffix="m"
                placeholder="0"
              />
            </div>
          </Label>
          <Label>
            <span>Odległości od linii bocznej do banerów reklamowych</span>
            <NumericInput
              value={data.I04_1}
              onChange={(e) =>
                handleChange(e.target.rawValue, objectIndex, "I04_1")
              }
              suffix="m"
              placeholder="0"
            />
          </Label>
          <Label>
            <span>Odległość od linii bocznej do widowni</span>
            <NumericInput
              value={data.I04_2}
              onChange={(e) =>
                handleChange(e.target.rawValue, objectIndex, "I04_2")
              }
              suffix="m"
              placeholder="0"
            />
          </Label>
          <Label>
            <span>
              Odległość linii końcowej do siatki/piłkochwytów za bramką
            </span>
            <NumericInput
              value={data.I04_3}
              onChange={(e) =>
                handleChange(e.target.rawValue, objectIndex, "I04_3")
              }
              suffix="m"
              placeholder="0"
            />
          </Label>

          <FormHeader>Kryterium I.05 - Boisko</FormHeader>
          {error.step === 5 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label width="50%">
            Kolor główny
            <Input
              value={data.I05_primary_color}
              onChange={(e) => {
                handleChange(e.target.value, objectIndex, "I05_primary_color");
              }}
            />
          </Label>
          <Label width="50%">
            Drugi kolor
            <Input
              value={data.I05_secondary_color}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I05_secondary_color")
              }
            />
          </Label>
          <Label width="50%">
            Materiał
            <Input
              value={data.I05_material}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I05_material")
              }
            />
          </Label>
          <Label pointer margin="24px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I05_lines}
                handleChange={() =>
                  handleChange(!data.I05_lines, objectIndex, "I05_lines")
                }
              />
              Linie do inncyh dyscyplin
            </span>
          </Label>
          <Label width="50%">
            Jaka dyscyplina?
            <Input
              value={data.I05_dyscyplines}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I05_dyscyplines")
              }
            />
          </Label>

          <FormHeader>Kryterium I.06 - Bramki</FormHeader>
          {error.step === 6 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label width="50%">
            Materiał na bramki
            <Input
              value={data.I06_material}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I06_material")
              }
            />
          </Label>
          <Label width="50%">
            Kolor bramek
            <Input
              value={data.I06_color}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I06_color")
              }
            />
          </Label>

          <Label margin="24px 0" direction="row">
            <span>
              <RadioSquare
                value={data.base}
                handleChange={(e) =>
                  handleChange(!data.base, objectIndex, "is_invalid_field")
                }
              />
              Bramki są przytwierdzone do podłoża
            </span>
          </Label>

          <FormHeader>Kryterium I.07 - Strefa zmian</FormHeader>
          {error.step === 7 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}

          <Label>
            Ilość miejsc na pierwszej połowie
            <NumericInput
              value={data.I07_first_half_capacity}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I07_first_half_capacity"
                )
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Ilość miejsc na drugiej połowie
            <NumericInput
              value={data.I07_second_half_capacity}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I07_second_half_capacity"
                )
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label pointer margin="24px 0 16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I07_table}
                handleChange={() =>
                  handleChange(!data.I07_1, objectIndex, "I07_table")
                }
              />
              Stolik
            </span>
          </Label>

          <FormHeader>Kryterium I.08 - Zegar boiskowy</FormHeader>
          {error.step === 8 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label>
            Rodzaj zegara boiskowego
            <Select
              value={data.I08_clock}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I08_clock")
              }
            >
              <option value="analogowy">analogowy</option>
              <option value="cyfrowy">cyfrowy</option>
            </Select>
          </Label>

          <Label>
            Ilość tablic z wynikami
            <NumericInput
              value={data.I08_scoreboards}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I08_scoreboards")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Rodzaj nagłośnienia
            <Select
              value={data.I08_sound}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I08_sound")
              }
            >
              <option value="stałe">stałe</option>
              <option value="przenośne">przenośne</option>
            </Select>
          </Label>
          <FormHeader>Kryterium I.09 - Szatnie</FormHeader>
          {error.step === 9 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}

          <h3> Szatnie dla zawodników gospodarzy</h3>
          <Label>
            Wymiary
            <span style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I09_length}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I09_length")
                }
                placeholder={null}
                suffix={null}
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I09_width}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I09_width")
                }
                placeholder={null}
                suffix={null}
              />
            </span>
          </Label>
          <Label>
            Ilość sanitariatów
            <NumericInput
              value={data.I09_hygine}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I09_hygine")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Ilość pryszniców
            <NumericInput
              value={data.I09_showers}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I09_showers")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <h3>Szatnie dla zawodników gości </h3>
          <Label>
            Wymiary
            <span style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I09_quest_length}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I09_quest_length")
                }
                placeholder={null}
                suffix={null}
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I09_quest_width}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I09_quest_width")
                }
                placeholder={null}
                suffix={null}
              />
            </span>
          </Label>
          <Label>
            Ilość sanitariatów
            <NumericInput
              value={data.I09_quest_hygine}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I09_quest_hygine")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Ilość pryszniców
            <NumericInput
              value={data.I09_quest_showers}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I09_quest_showers")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label pointer margin="24px 0 16px 0" direction="row">
            <span>
              <RadioSquare
                value={data.I09_exit}
                handleChange={() =>
                  handleChange(!data.I10_1, objectIndex, "I09_exit")
                }
              />
              Z obu szatni jest bezpośrednie wyjście na pole gry
            </span>
          </Label>

          <FormHeader>Kryterium I.10 - Szatnie dla sędziów</FormHeader>
          {error.step === 10 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label>
            Wymiary
            <span style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I10_width}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I10_width")
                }
                placeholder={null}
                suffix={null}
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I10_length}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I10_length")
                }
                placeholder={null}
                suffix={null}
              />
            </span>
          </Label>
          <Label>
            Ilość sanitariatów
            <NumericInput
              value={data.I10_hygine}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I10_hygine")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Ilość pryszniców
            <NumericInput
              value={data.I10_showers}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I10_showers")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>

          <FormHeader>Kryterium I.11 - Ogrzewanie obiektu</FormHeader>
          {error.step === 11 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label>
            Jakie jest ogrzewanie obiektu:
            <Select
              value={data.I11_heating}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I11_heating")
              }
            >
              <option value="brak">brak</option>
              <option value="tradycyjne">tradycyjne</option>
              <option value="grzejnikowe">grzejnikowe</option>
              <option value="powietrzne">powietrzne</option>
              <option value="gazowe">gazowe</option>
            </Select>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I11_air_conditioning}
                handleChange={() =>
                  handleChange(
                    !data.I11_air_conditioning,
                    objectIndex,
                    "I11_air_conditioning"
                  )
                }
              />
              Na hali dostępna jest klimatyzacja
            </span>
          </Label>

          <FormHeader>Kryterium I.12 - Serwis medyczny</FormHeader>
          {error.step === 12 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}

          <Label pointer>
            <span>
              <RadioSquare
                value={data.I12_stretcher}
                handleChange={() =>
                  handleChange(
                    !data.I12_stretcher,
                    objectIndex,
                    "I12_stretcher"
                  )
                }
              />
              Na zawodach sportowych są dostępne nosze
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I12_medical_service}
                handleChange={() =>
                  handleChange(
                    !data.I12_medical_service,
                    objectIndex,
                    "I12_medical_service"
                  )
                }
              />
              Na zawodach sportowych znajduje sięopieka medyczna
            </span>
          </Label>
          <FormHeader>Kryterium I.13 - Serwis dla prasy </FormHeader>
          {error.step === 13 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label>
            Ilość miejsc dla prasy
            <NumericInput
              value={data.I13_capacity}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I13_capacity")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_internet_access}
                handleChange={() =>
                  handleChange(
                    !data.I13_internet_access,
                    objectIndex,
                    "I13_internet_access"
                  )
                }
              />
              Dostęp dla prasy do internetu
            </span>
          </Label>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I13_separate_press}
                handleChange={() =>
                  handleChange(
                    !data.I13_separate_press,
                    objectIndex,
                    "I13_separate_press"
                  )
                }
              />
              Oddzielne pomieszczenie dla konferencji prasowej
            </span>
          </Label>
          <Label>
            <span>
              Oddzielne miejsce dla fotografów i telewizji (jeśli jest - wskaż)
              <Info
                text={
                  "np. na trybunie widowni, na balkonie, na piętrze oddzielone od widowni"
                }
              />
            </span>
            <Input
              type="text"
              value={data.I13_separate_media}
              handleChange={(e) =>
                handleChange(e.target.value, objectIndex, "I13_separate_media")
              }
            />
          </Label>

          <FormHeader>Kryterium I.14 Reklamy i bandy reklamowe</FormHeader>
          {error.step === 14 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <span style={{ display: "flex" }}>
            <h3>
              Jaki system reklamy używany jest na hali sportowej podczas zawodów
              sportowych?
            </h3>
            <Info text={"Wpisz ilość oraz zbliżone wymiary w metrach"} />
          </span>
          <Label pointer>
            <span>
              <RadioSquare
                value={data.I14_fixed}
                handleChange={() =>
                  handleChange(!data.I14_fixed, objectIndex, "I14_fixed")
                }
              />
              Stałe bandy
            </span>
          </Label>
          <Label>
            Ilość
            <NumericInput
              value={data.I14_fixed_quantity}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I14_fixed_quantity")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Wymiary
            <span style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I14_fixed_length}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I14_fixed_length")
                }
                placeholder={null}
                suffix={"m"}
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I14_fixed_width}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I14_fixed_width")
                }
                placeholder={null}
                suffix={"m"}
              />
            </span>
          </Label>

          <Label pointer>
            <span>
              <RadioSquare
                value={data.I14_moving}
                handleChange={() =>
                  handleChange(!data.I14_moving, objectIndex, "I14_moving")
                }
              />
              Bandy obrotowe
            </span>
          </Label>
          <Label>
            Ilość
            <NumericInput
              value={data.I14_moving_quantity}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I14_moving_quantity")
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Wymiary
            <span style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I14_moving_width}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I14_moving_width")
                }
                placeholder={null}
                suffix={null}
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I14_moving_length}
                onChange={(e) =>
                  handleChange(e.target.value, objectIndex, "I14_moving_length")
                }
                placeholder={null}
                suffix={null}
              />
            </span>
          </Label>

          <Label pointer>
            <span>
              <RadioSquare
                value={data.I14_electric}
                handleChange={() =>
                  handleChange(!data.I14_electric, objectIndex, "I14_electric")
                }
              />
              Bandy elektroniczne
            </span>
          </Label>
          <Label>
            Ilość
            <NumericInput
              value={data.I14_electric_quantity}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  objectIndex,
                  "I14_electric_quantity"
                )
              }
              placeholder={null}
              suffix={null}
            />
          </Label>
          <Label>
            Wymiary
            <span style={{ display: "flex", alignItems: "center" }}>
              <NumericInput
                value={data.I14_electric_width}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    objectIndex,
                    "I14_electric_width"
                  )
                }
                placeholder={null}
                suffix={null}
              />
              <span style={{ margin: "0 8px", marginBottom: "-8px" }}>x</span>
              <NumericInput
                value={data.I14_electric_length}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    objectIndex,
                    "I14_electric_length"
                  )
                }
                placeholder={null}
                suffix={null}
              />
            </span>
          </Label>

          <FormHeader>
            Kryterium I.15 - Miejsca parkingowe wokół hali
          </FormHeader>
          {error.step === 15 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}
          <Label width="50%">
            Ilość miejc parkingowych wokół hali sportowej
            <NumericInput
              value={data.I15_parking_spots}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I15_parking_spots")
              }
              suffix=""
              placeholder="0"
            />
          </Label>
          <Label width="50%">
            W tym ilość miejsc dla osób funkcyjnych (sędziów, działaczy)
            <NumericInput
              value={data.I15_special_spots}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I15_special_spots")
              }
              suffix=""
              placeholder="0"
            />
          </Label>

          <FormHeader>Kryterium I.16 - Służby porządkowe</FormHeader>
          {error.step === 16 ? (
            <>
              <ErrorMessage>{error.text}</ErrorMessage>{" "}
            </>
          ) : null}

          <Label width="50%">
            <span>
              Ilość osób służ porządkowych w czasie zawodów
              <Info text={"Osoby upoważnionie, odpowiednio oznaczone"} />
            </span>
            <NumericInput
              value={data.I16_service}
              onChange={(e) =>
                handleChange(e.target.value, objectIndex, "I16_service")
              }
              suffix=""
              placeholder="0"
            />
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
              width="max-content"
              color="danger"
              hoverColor="dangerDark"
              onClick={() => deleteFacility(data)}
            >
              Usuń
            </PrimaryButton>
            <PrimaryButton
              type="submit"
              width="max-content"
              color="success"
              hoverColor="successDark"
              onClick={handleObjectSave}
            >
              Zapisz obiekt
            </PrimaryButton>
          </div>
        </Fieldset>
      </ObjectInfo>
    </FormTemplate>
  );
};

export default FutsalForm;
