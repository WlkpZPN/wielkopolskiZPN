import { useState } from "react";
import styled from "styled-components";

import FormTemplate from "../atoms/form_template";
import Select from "../atoms/form_select";
import Label from "../atoms/form_label";
import RadioContainer from "../atoms/radio_container";
import Input from "../atoms/form_input";
import FormRow from "../atoms/form_row";
import PrimaryButton from "../atoms/primary_button";
import RadioSquare from "../molecules/form_radio";
import Paragraph from "../atoms/paragraph";
import AddFile from "../molecules/add_file";
import OutlineButton from "../atoms/outline_button";
import Info from "../atoms/Info";
import ObjectName from "../atoms/object_name";
import ObjectInfo from "../molecules/object_info";
import FormHeader from "../atoms/form_header";

const ObjectForm = () => {
  return (
    <FormTemplate width="100%">
      <ObjectInfo>
        <FormHeader>Kryterium I.01 - Stadion - dostępność</FormHeader>
        <Label direction="row" htmlFor="1">
          <Input type="radio" id="1" name="seasons" value={1} />
          Jesteśmy właścicielem Stadionu
        </Label>
        <Label direction="row" htmlFor="2">
          <Input type="radio" value={2} name="seasons" id="2" />
          Posiadamy pisemną umowę z właścicielem stadionu
        </Label>
        <Paragraph>
          Umowa gwarantująca prawo do korzystania z obiektu sportowego ( tylko
          przy zaznaczeniu "posiadamy pisemną umowe")
        </Paragraph>
        <AddFile />
        <Label margin="16px 0" direction="row">
          <RadioSquare />
          Umowa gwarantuje prawo do korzystania ze stadionu przez cały sezon,w
          którym ubiegamy się o licencję
        </Label>
        <FormHeader>Kryterium I.02 Regulaminy</FormHeader>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Wewnętrzne regulaminy obiektu, w formacie nie mniejszym niż B1 (70cm
            x 100cm) rozmieszczone są przez każdym wejściem w taki sposób,by
            widzowie mogli je przeczytać przed wejściem na obiekt.
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Regulaminy zawodów piłkarskich niebędących imprezą masową w formacie
            nie mniejszym niż B1 (70cm x 100cm) rozmieszczone są przed każdym
            wejściem w taki sposób,by widzowie mogli je przeczytać
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Właściwe przepisy prawa powszechnego nakładają na Klub obowiązek
            posiadania regulaminu imprezy masowej
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Regulaminy imprezy masowej,w formacie nie mniejszym niż B1 (70cm x
            100cm) rozmieszczone są przed każdym wejściem w taki sposóv, by
            widzowie mogli je przeczytać przed wejściem na obiekt.
          </span>
        </Label>
        <FormHeader>Kryterium I.03 - Pojemność</FormHeader>
        <Label width="50%">
          Całkowita liczba indywidualnych miejsc siedzących z oparciami
          udostępniona dla publiczności
          <Input type="text" placeholder="0" />
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Miejsca siedzące spełniają wymogi indywidualnych miejsc siedzących
            zdefiniowanych w kryterium I.04
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Ilość miejsc udostępnionych dla publiczności spełnia wymogi
            ninejszego kryterium
          </span>
        </Label>
        <FormHeader>Kryterium I.04 - Indywidualne miejsca siedzące</FormHeader>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Przytwierdzone na stałe (np. do podłoża)
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Oddzielone od innych
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Wygodne (anatomicznie wyprofilowane)
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />Z oparciami o wysokości 20-30cm, mierząc od siedziska
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Wykonane z materiału trudnopalnego
          </span>
        </Label>
        <FormHeader>
          Kryterium I.05 - Miejsce dla kibiców drużyny gości
        </FormHeader>
        <Label width="50%">
          Liczba indywidualnych miejsc siedzących z oparciami w sektorze kibiców
          drużyny gości
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Procent pojemności Stadionu udostępniony kibicom gości
          <Input type="text" placeholder="0%" />
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Sektor kibiców gości mieści minimum 5% udostępnionej pojemności
            Stadionu
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Obszar oddzielony od pozostałych widzów ogrodzeniem trwałym o
            wysokości min. 2,2m z każdej ze stron oraz z możliwością utworzenia
            strefy klubowej
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Zapewniono odrębny dostęp i niezależne urządzenia sanitarne
          </span>
        </Label>
        <FormHeader>Kryterium I.06 - Pole gry</FormHeader>
        <Label width="50%">
          Rodzaj nawierzchni
          <Select>
            <option>Naturalna trawa</option>
            <option>Sztuczna trawa</option>
          </Select>
        </Label>
        <Label width="50%">
          Rodzaj nawierzchni
          <Select>
            <option>Dobry</option>
            <option>Nierówny</option>
            <option>Zły</option>
          </Select>
        </Label>
        <Label>
          Wymiar pola gry (długość x szerokość)
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input width="140px" type="text" placeholder="0 m" />{" "}
            <span style={{ margin: "0 8px" }}>x</span>
            <Input width="140px" type="text" placeholder="0 m" />
          </div>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Można na nim grać w ciągu całego sezonu rozgrywkowego
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Nawierzchnia ma kolor zielony ( widoczne w przypadku wyboru
            sztucznej murawy)
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Nawierzchnia zatwierdzona przez Wielkopolski ZPN ( w przypadku
            wyboru sztucznej murawy)
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Pole gry ma trawiaste lub pokryte sztuczną murawą pobocze pola gry o
            szerokości min. 3 m za liniami bocznymi i szerokości min. 5 m za
            liniami końcowymi pola gry
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Parametry pola gry spełniają wymogi niniejszego kryterium
          </span>
        </Label>
        <FormHeader>Kryterium I.07 - Obszar pola gry</FormHeader>
        <Label margin="24px 0 16px 0" direction="row">
          <span>
            <RadioSquare />
            Obszar pola gry jest odgrodzony od miejsc udostępnionych dla
            publiczności stabilnym ogrodzeniem o wysokości min. 1,2 m
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Ogrodzenie obszaru pola gry wyposażone jest w bramki ewakuacyjne
            pomalowane odróżniającym je od pozostałego ogrodzenia kolorem
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Tablice,bandy reklamowe lub inne przeszkody stałe znajdujące się w
            obszarze gry są usytuowane w min. odległości 3 m od linii bocznych i
            5 m od linii końcowych pola gry
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Słupki odciągów siatek na bramkach,a także słupy piłkochwytów
            znajdują się w odległości nie mniejszej niż 5 m od liniii końcowej
            gry
          </span>
        </Label>
        <FormHeader>Kryterium I.08 - Ławki w obszarze pola gry</FormHeader>
        <Label width="50%">
          Liczba miejsc siedzących na ławce dla rezerwowych
          <Input type="text" placeholder="0" />
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Ławki dla rezerwowych spełniają wymogi wynikające z niniejszego
            kryterium z uwzględnieniem właściwej ligi lub klasy rozgrywkowej
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Ławki dla rezerwowych usytuowane są w odległości nie mniejszej niż 3
            m od linii bocznej pola gry,rozstawione symetrycznie w sotsunku do
            osi pola gry i w odległości od siebie nie większej niż 30 m
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Punkt sanitarny oraz stanowisko dla min. dwóch noszowych jest
            wyznaczone i oznakowane białym krzyżem na zielonym tle
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Stanowisko dla noszowych wyposażone jest w min. jedną pare noszy z
            usztywnieniem
          </span>
        </Label>
        <FormHeader>Kryterium I.09 - Dostęp do obszaru pola gry</FormHeader>
        <Label margin="24px 0 16px 0" direction="row">
          <span>
            <RadioSquare />
            Wyjście na obszar pola gry jest osłonięte ogniotrwałym wysuwanym
            tunelem lub w inny sposób zapewniający bezpieczeństwo sędziów i
            zawodników
          </span>
        </Label>
        <Label margin="16px 0" direction="row">
          <span>
            <RadioSquare />
            Sędziowie i zawodnicy mają w czasie pobytu na Stadionie zapewnioną
            odpowiednią ochronę
          </span>
        </Label>
        <FormHeader>Kryterium I.10 - Dojazd do obszaru pola gry</FormHeader>
        <Label margin="24px 0 16px 0" direction="row">
          <span>
            <RadioSquare />
            Pojazdy pogotowia,straży pożarnej,policji itp. mają możliwość
            bezpośredniego dojazdu do obszaru pola gry
          </span>
        </Label>
        <FormHeader>Kryterium I.11 - Szatnia dla drużyny gospodarzy</FormHeader>
        <Label width="50%">
          Liczba miejsc siedzących
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba wieszaków lub szafek na odzież
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba pryszniców
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba toalet z sedesem
          <Input type="text" placeholder="0" />
        </Label>
        <Label>
          <span>
            <RadioSquare />W szatni znajduje się tablica do prezentacji taktyki
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Szatnia zawodników drużyny gospodarzy spełnia wymogi wynikające z
            niniejszego kryterium
          </span>
        </Label>
        <FormHeader>Kryterium I.12 - Szatnia dla drużyny gości</FormHeader>
        <Label width="50%">
          Liczba miejsc siedzących
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba wieszaków lub szafek na odzież
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba pryszniców
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba toalet z sedesem
          <Input type="text" placeholder="0" />
        </Label>
        <Label>
          <span>
            <RadioSquare />W szatni znajduje się tablica do prezentacji taktyki
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Szatnia zawodników drużyny gospodarzy spełnia wymogi wynikające z
            niniejszego kryterium
          </span>
        </Label>
        <FormHeader>Kryterium I.13 - Szatnia dla sędziów </FormHeader>
        <Label>
          <span>
            <RadioSquare />
            Szatnia dla sędziów jest zapewniona
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Szatnia dla sędziów oddzielona jest od szatni dla zawodników lecz w
            ich pobliżu
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />W szatni dostępne są miejsca do siedzenia, wieszaki
            lub szafki na odzież dla 4 osób
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />W szatni lub w bezpośrednim jej pobliżu dostępny jest
            min. 1 prysznic
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />W szatni lub w bezpośrednim jej pobliżu dostępna jest
            min. 1 toaleta
          </span>
        </Label>
        <FormHeader>Kryterium I.14 Parking</FormHeader>
        <Label>
          <span>
            <RadioSquare />
            Na obiekcie dostępna jest min. liczba miejsc parkingowych w strefie
            chronionej przeznaczonych dla sędziów, oficjalnych przedstawicieli i
            uczestniczących w zawodach klubów
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Min. 1 miejsce parkingowe dla autokarów
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Min. 10 miejsc parkingowych dla samochodów
          </span>
        </Label>
        <FormHeader>Kryterium I.15</FormHeader>
        <Label width="50%">
          Liczba toalet dla kobiet
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Liczba toalet dla mężczyzn
          <Input type="text" placeholder="0" />
        </Label>
        <Label width="50%">
          Standart urządzeń (czyste,jasne,higieniczne itp. )
          <Select>
            <option>Doskonały</option>
            <option>Odpowiedni</option>
            <option>Niski</option>
          </Select>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Wyposażenie do mycia (umywalki, woda, ręczniki, suszarki itp.)
          </span>
        </Label>
        <FormHeader>Kryterium I.16 - Nagłośnienie</FormHeader>
        <Label>
          <span>
            <RadioSquare />
            Stadion wyposażony jest w dobrze słyszalny w każdej częsci system
            nagłaśniający
          </span>
        </Label>
        <FormHeader>Kryterium I.17 - Oświetlenie</FormHeader>
        <Label>
          <span>
            <RadioSquare />
            Stadion wyposażony jest w oświetlenie pokrywające równomiernie cały
            obszar pola gry
          </span>
        </Label>
        WIDOCZNE TYLKO PRZY ZAZNACZENIU POWYŻSZEJ OPCJI
        <Label width="50%">
          Poziom natężenia w lx
          <Input type="text" placeholder="0 luksów" />
        </Label>
        <Label>
          Dokument poświadczający pomiar natężenia światła
          <AddFile />
        </Label>
        <FormHeader>Kryterium I.18 - Oznakowanie w strefie szatni</FormHeader>
        <Label>
          <span>
            <RadioSquare />
            Wszystkie pomieszczenia meczowe są odpowiednio i w dobrze widoczny
            sposób, oznakowane (np. szatnia drużyny gospodarzy, szatnia drużyny
            gości, sędziowie)
          </span>
        </Label>
        <FormHeader>
          Kryterium I.19 - Publiczny dostęp i wyjścia ze Stadionu
        </FormHeader>
        <Label>
          <span>
            <RadioSquare />
            Stadion wyposażony jest w ogrodzenie zewnętrzne
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Przy wejściu są oznakowane punkty kasowe i depozytowe
          </span>
        </Label>
        <Label>
          <span>
            <RadioSquare />
            Wejścia na Stadion są wyposażone w barierki kierujące lub kołowrotki
          </span>
        </Label>
        <FormHeader>
          Kryterium I.20 - Miejsca dla osób niepełnosprawnych
        </FormHeader>
        <Label>
          <span>
            <RadioSquare />
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
            width="min-content"
            color="danger"
            hoverColor="dangerDark"
          >
            Usuń
          </PrimaryButton>
          <PrimaryButton
            width="min-content"
            color="success"
            hoverColor="successDark"
          >
            Zapisz
          </PrimaryButton>
        </div>
      </ObjectInfo>
    </FormTemplate>
  );
};

export default ObjectForm;
