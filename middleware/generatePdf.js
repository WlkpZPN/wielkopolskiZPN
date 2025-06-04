import {
  PDFDocument,
  StandardFonts,
  rgb,
  rgba,
  degrees,
  TextAlignment,
} from "pdf-lib";
import download from "downloadjs";
import fontKit from "@pdf-lib/fontkit";
import { createSeasons } from "../middleware/utils";
export const generatePdf = async (clubData, date = null, dwn = true) => {
  console.log(clubData);
  const supervisionType = clubData.applications[0].supervision_type;
  const application = clubData.applications[0];
  let leauge = "";
  switch (clubData.leauge) {
    case "iv liga":
      leauge = "IV ligii";
      break;
    case "v liga":
      leauge = "V ligii";
      break;
    case "klasa okręgowa":
      leauge = "Klasy Okręgowej";
      break;
    case "klasa a":
    case "klasa b":
      leauge = "Klasy A/B";
      break;
    case "młodzież":
      leauge = "ligii młodzieżowej";
      break;
    case "futsal":
      leauge = "futsalu";
      break;
    case "ligi kobiece":
      leauge = "ligii kobiecej";
      break;
  }

  const issueDate =
    date ||
    application.histories
      .find((history) => history.status_id === 8 || history.status_id === 10)
      .created_at.split(",")[0];
  // const currentSeason = `${new Date().getFullYear()}/${(
  //   new Date().getFullYear() + 1
  // )
  //   .toString()
  //   .substring(2)}`;

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontKit);
  const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";
  const fontBytes = await fetch(url).then((res) => res.arrayBuffer());
  //const [fontRef, fontObj] = await pdfDoc.embedFont(fontBytes);
  const fontBytes2 = await fetch(
    "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf"
  ).then((res) => res.arrayBuffer());
  const page = pdfDoc.addPage();
  //const [boldRef, boldObj] = await pdfDoc.embedFont(fontBytes2);

  const regular = await pdfDoc.embedFont(fontBytes);
  const bold = await pdfDoc.embedFont(fontBytes2);

  const backgroundUrl =
    "/api/view?path=licencja-tlo.png";

  const backgroundBytes = await fetch(backgroundUrl).then((res) =>
    res.arrayBuffer()
  );

  const pngBackground = await pdfDoc.embedPng(backgroundBytes);
  const scaleBackground = pngBackground.scale(0.6);

  const logoBytes = await fetch(
    "/api/view?path=wzpn_logo.png"
  ).then((res) => res.arrayBuffer());

  const pngLogo = await pdfDoc.embedPng(logoBytes);
  const scaledLogo = pngLogo.scale(0.7);

  page.drawImage(pngBackground, {
    x: 230,
    y: 350,
    width: scaleBackground.width,
    height: scaleBackground.height,
  });

  page.drawImage(pngLogo, {
    x: 230,
    y: 750,
    width: scaledLogo.width,
    height: scaledLogo.height,
  });

  page.drawText(
    "Decyzja Komisji ds. Licencji Klubowych \n Wielkopolskiego Związku Piłki Nożnej",
    {
      //x: 170,
      x: 180,
      y: 710,
      font: bold,
      lineHeight: 20,
      size: 14,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("z dnia", {
    x: 280,
    y: 640,
    size: 10,
    color: rgb(0, 0, 0),
    font: regular,
  });

  page.drawText(issueDate, {
    x: 255,
    y: 610,
    size: 14,
    // color: rgb(18, 104, 179),
    color: rgb(0.07, 0.4, 0.7),
    font: bold,
  });

  page.drawText("w sprawie przyznania licencji nr", {
    x: 225,
    y: 580,
    size: 10,
    color: rgb(0, 0, 0),
    font: regular,
  });

  page.drawText(application.internal_id, {
    x: 257,
    y: 550,
    size: 14,
    // color: rgb(18, 104, 179),
    color: rgb(0.07, 0.4, 0.7),
    font: bold,
  });

  page.drawText("dla klubu", {
    x: 270,
    y: 520,
    size: 10,
    color: rgb(0, 0, 0),
    font: regular,
  });
  const form = pdfDoc.getForm();
  const textField = form.createTextField("club.info");
  const textField2 = form.createTextField("license.info");
  const textField3 = form.createTextField("facilities.names");
  textField.setText(
    `${clubData.name.replace(/\n/g, " ")} ${clubData.address.replace(
      /\n/g,
      " "
    )}`
  );

  textField.addToPage(page, {
    x: 100,
    y: 450,
    font: bold,
    height: 60,
    width: 400,
    textColor: rgb(0.07, 0.4, 0.7),
    borderColor: rgb(1, 1, 1),
    // backgroundColor: rgb(1, 1, 1),
  });

  //const field = form.getTextField("club.info");
  textField.enableMultiline();
  textField.enableReadOnly();
  textField.setFontSize(12);
  textField.defaultUpdateAppearances(bold);
  textField.setAlignment(TextAlignment.Center);
  textField.updateAppearances(bold);

  if (clubData.leauge != "futsal") {
    page.drawText("Na podstawie uchwały", {
      x: 50,
      y: 440,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });

    page.drawText("Nr V/2020", {
      x: 155,
      y: 440,
      font: regular,
      size: 10,
      color: rgb(0.07, 0.4, 0.7),
    });

    page.drawText("z dnia", {
      x: 205,
      y: 440,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });

    page.drawText(" 30 kwietnia 2021 r.", {
      x: 232,
      y: 440,
      font: regular,
      size: 10,
      color: rgb(0.07, 0.4, 0.7),
    });

    page.drawText(" w sprawie ustalenia szczegółowych kryteriów ", {
      x: 320,
      y: 440,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      "licencyjnych dla klubów IV ligi i klas niższych Wielkopolskiego ZPN na",
      {
        x: 50,
        y: 425,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(` sezon ${clubData.applications[0].seasons} `, {
      x: 362,
      y: 425,
      font: regular,
      size: 10,
      color: rgb(0.07, 0.4, 0.7),
    });

    page.drawText(`następnie po`, {
      x: 50,
      y: 410,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      "rozpatrzeniu wniosku wraz z załącznikami i uzupełnieniami  Komisja ds. Licencji Klubowych",
      {
        x: 110,
        y: 410,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );
    page.drawText("postanowiła:", {
      x: 50,
      y: 395,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });
  } else {
    page.drawText(
      "Na podstawie uchwały Komisji ds. Nagłych Wielkopolskiego ZPN Nr 57/2021 z dnia 20 października",
      {
        x: 50,
        y: 440,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(
      `2021 r. w sprawie ustalenia szczegółowych kryteriów licencyjnych dla klubów III ligi futsalu mężczyzn`,
      {
        x: 50,
        y: 425,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(
      `oraz II ligi futsalu kobiet Wielkopolskiego ZPN na sezon 2021/2022 i następne po rozpatrzeniu`,
      {
        x: 50,
        y: 410,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(
      "wniosku wraz z załącznikami i uzupełnieniami Komisja ds. Licencji Klubowych",
      {
        x: 50,
        y: 395,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );
    page.drawText("postanowiła:", {
      x: 50,
      y: 380,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });
  }

  page.drawText(
    `1. Przyznać licencję upoważniającą Klub do udziału w rozgrywkach o mistrzostwo ${leauge}`,
    {
      x: 50,
      y: 360,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    }
  );
  let position = { x: 295, y: 345 };
  if (application.number_of_seasons === "2" && application.statuses.id === 10) {
    position = {
      x: 350,
      y: 345,
    };
  }

  page.drawText(
    `piłki nożnej w sezonach rozgrywkowych ${clubData.applications[0].seasons} `,
    {
      x: 60,
      y: 345,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    }
  );
  if (application.status_id === 10) {
    page.drawText(`z nadzorem ${supervisionType}m`, {
      x: position.x,
      y: position.y,
      font: regular,
      size: 10,
      color: rgb(0.07, 0.4, 0.7),
    });
  }
  //${application.sport_facilities[0].name}
  // page.drawText(
  //   `2. Mecze w roli gospodarza rozgrywane będą na obiektach: ${application.sport_facilities[0].name}\n${application.sport_facilities[0].address}`,
  //   {
  //     x: 50,
  //     y: 310,
  //     font: regular,
  //     size: 10,
  //     color: rgb(0, 0, 0),
  //   }
  // );

  let objectsNames = [];
  if (clubData.leauge == "futsal") {
    application.futsal_facilities.forEach((object, index, arr) => {
      if (object.name) {
        objectsNames.push(`${object.name} ${object.address || ""}`);
      }
    });
  } else {
    application.sport_facilities.forEach((object, index, arr) => {
      if (object.name) {
        objectsNames.push(
          `${object.name} ${object.address || ""}, ${object.city} \n`
        );
      }
    });
  }

  // page.drawText(`${objectsNames.join(", ")}`, {
  //   x: 50,
  //   y: 295,
  //   font: regular,
  //   size: 10,
  //   color: rgb(0, 0, 0),
  // });

  textField3.setText(
    `2. Mecze w roli gospodarza rozgrywane będą na obiektach: \n ${objectsNames.join(
      ", "
    )}`
  );

  textField3.addToPage(page, {
    x: 50,
    y: 280,
    font: regular,
    textColor: rgb(0, 0, 0),
    borderColor: rgb(1, 1, 1),
    height: 50,
    width: 500,
  });

  textField3.enableMultiline();
  textField3.enableReadOnly();
  textField3.setFontSize(10);
  textField3.defaultUpdateAppearances(regular);
  textField3.setAlignment(TextAlignment.Left);
  textField3.updateAppearances(regular);

  if (application.status_id === 10) {
    textField2.setText(`Uzasadnienie: \n${application.reject_reason}`);

    textField2.addToPage(page, {
      x: 50,
      y: 180,
      font: regular,
      textColor: rgb(0, 0, 0),
      borderColor: rgb(1, 1, 1),
      height: 100,
      width: 500,
    });

    textField2.enableMultiline();
    textField2.enableReadOnly();
    textField2.setFontSize(10);
    textField2.defaultUpdateAppearances(regular);
    textField2.setAlignment(TextAlignment.Left);
    textField2.updateAppearances(regular);
  } else {
    page.drawText(
      "Ad.1. W związku ze spełnieniem wymogów wyżej wymienionych przepisów licencyjnych PZPN",
      {
        x: 50,
        y: 250,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );
    page.drawText(
      `oraz wydaniem licencji zgodnie z wnioskiem klubu, odstępuje się od uzasadnienia niniejszej uchwały.`,
      {
        x: 50,
        y: 235,
        font: regular,
        size: 10,
        color: rgb(0, 0, 0),
      }
    );
  }

  page.drawText("Otrzymują:", {
    x: 50,
    y: 85,
    font: bold,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Wnioskodawca", {
    x: 50,
    y: 70,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Wydział Gier i Ewidencji", {
    x: 50,
    y: 55,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Wielkopolskiego ZPN", {
    x: 50,
    y: 40,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  const stampBytes = await fetch(
    "/api/view?path=pieczatka.png"
  ).then((res) => res.arrayBuffer());

  const stampPng = await pdfDoc.embedPng(stampBytes);
  const scaledStamp = pngLogo.scale(0.4);

  const signBytes = await fetch(
    "/api/view?path=podpis_marek.png"
  ).then((res) => res.arrayBuffer());

  const signPng = await pdfDoc.embedPng(signBytes);
  const scaledSign = pngLogo.scale(0.7);

  const sign2Bytes = await fetch(
    "/api/view?path=Podpis2.png"
  ).then((res) => res.arrayBuffer());

  const sign2Png = await pdfDoc.embedPng(sign2Bytes);
  const scaledSign2 = pngLogo.scale(0.7);

  page.drawImage(stampPng, {
    x: 100,
    y: 90,
    width: 80,
    height: 80,
  });

  page.drawImage(signPng, {
    x: 200,
    y: 100,
    width: scaledSign.width - 20,
    height: scaledSign.height,
  });

  page.drawImage(sign2Png, {
    x: 380,
    y: 100,
    width: scaledSign2.width - 20,
    height: scaledSign2.height,
  });

  page.drawText(
    "Sekretarz \nKomisji ds.Licencji Klubowych \nMarek Grochowski",
    {
      x: 200,
      font: regular,
      size: 10,
      y: 70,
      lineHeight: 15,
    }
  );

  page.drawText(
    "Przewodniczący \nKomisji ds.Licencji Klubowych \nGrzegorz Grocki",
    {
      x: 380,
      font: regular,
      size: 10,
      y: 70,
      lineHeight: 15,
    }
  );
  page.drawLine({
    start: { x: 200, y: 90 },
    end: { x: 335, y: 90 },
    thickness: 1,
    color: rgb(0.07, 0.4, 0.7),
  });

  page.drawLine({
    start: { x: 380, y: 90 },
    end: { x: 515, y: 90 },
    thickness: 1,
    color: rgb(0.07, 0.4, 0.7),
  });

  const baseString = await pdfDoc.save();

  if (dwn) {
    download(baseString, "licencja.pdf", "application/pdf");
  } else {
    return baseString;
  }
};
