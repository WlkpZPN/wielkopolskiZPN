import { PDFDocument, StandardFonts, rgb, rgba, degrees, scale } from "pdf-lib";
import download from "downloadjs";
import fontKit from "@pdf-lib/fontkit";

export const generatePdf = async (clubData, date = null, dwn = true) => {
  const application = clubData.applications[0];
  let leauge = "";
  switch (clubData.leauge) {
    case "IV liga":
      leauge = "IV ligii";
      break;
    case "V liga":
      leauge = "V ligii";
      break;
    case "Klasa okręgowa":
      leauge = "Klasy Okręgowej";
      break;
    case "Klasa A":
    case "Klasa B":
      leauge = "Klasy A/B";
      break;
    case "młodzież":
      leauge = "ligii młodzieżowej";
      break;
  }
  const issueDate =
    date ||
    application.histories
      .find((history) => history.status_id === 8 || history.status_id === 10)
      .created_at.split(",")[0];
  const currentSeason = `${new Date().getFullYear()}/${(
    new Date().getFullYear() + 1
  )
    .toString()
    .substring(2)}`;

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
    "https://pdf.fra1.digitaloceanspaces.com/licencja-tlo.png";

  const backgroundBytes = await fetch(backgroundUrl).then((res) =>
    res.arrayBuffer()
  );

  const pngBackground = await pdfDoc.embedPng(backgroundBytes);
  const scaleBackground = pngBackground.scale(0.7);

  const logoBytes = await fetch(
    "https://pdf.fra1.digitaloceanspaces.com/wzpn_logo.png"
  ).then((res) => res.arrayBuffer());

  const pngLogo = await pdfDoc.embedPng(logoBytes);
  const scaledLogo = pngLogo.scale(0.8);

  page.drawImage(pngBackground, {
    x: 190,
    y: 230,
    width: scaleBackground.width,
    height: scaleBackground.height,
  });

  page.drawImage(pngLogo, {
    x: 230,
    y: 730,
    width: scaledLogo.width,
    height: scaledLogo.height,
  });

  page.drawText(
    "Decyzja Komisji ds. Licencji Klubowych \n Wielkopolskiego Związku Piłki Nożej",
    {
      //x: 170,
      x: 180,
      y: 690,
      font: bold,
      lineHeight: 20,
      size: 14,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("z dnia", {
    x: 280,
    y: 620,
    size: 10,
    color: rgb(0, 0, 0),
    font: regular,
  });

  page.drawText(issueDate, {
    x: 255,
    y: 590,
    size: 14,
    // color: rgb(18, 104, 179),
    color: rgb(0.07, 0.4, 0.7),
    font: bold,
  });

  page.drawText("w sprawie przyznania licencji nr", {
    x: 225,
    y: 560,
    size: 10,
    color: rgb(0, 0, 0),
    font: regular,
  });

  page.drawText(application.internal_id, {
    x: 257,
    y: 530,
    size: 14,
    // color: rgb(18, 104, 179),
    color: rgb(0.07, 0.4, 0.7),
    font: bold,
  });

  page.drawText("dla klubu", {
    x: 270,
    y: 500,
    size: 10,
    color: rgb(0, 0, 0),
    font: regular,
  });

  page.drawText(
    `${clubData.name.replace(/\n/g, " ")} \n ${clubData.address.replace(
      /\n/g,
      " "
    )}`,
    {
      x: 210,
      y: 470,
      size: 12,
      color: rgb(0.07, 0.4, 0.7),
      font: bold,
      maxWidth: 200,
    }
  );

  page.drawText("Na podstawie uchwały", {
    x: 50,
    y: 400,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Nr V/2020", {
    x: 155,
    y: 400,
    font: regular,
    size: 10,
    color: rgb(0.07, 0.4, 0.7),
  });

  page.drawText("z dnia", {
    x: 205,
    y: 400,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText(" 30 kwietnia 2021 r.", {
    x: 232,
    y: 400,
    font: regular,
    size: 10,
    color: rgb(0.07, 0.4, 0.7),
  });

  page.drawText(" w sprawie ustalenia szczegółowych kryteriów ", {
    x: 320,
    y: 400,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText(
    "licencyjnych dla klubów IV ligi i klas niższych Wielkopolskiego ZPN na",
    {
      x: 50,
      y: 385,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(` sezon ${currentSeason}`, {
    x: 364,
    y: 385,
    font: regular,
    size: 10,
    color: rgb(0.07, 0.4, 0.7),
  });

  page.drawText(` i następnie po`, {
    x: 435,
    y: 385,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText(
    "rozpatrzeniu wniosku wraz z załącznikami i uzupełnieniami Komisja ds. Licencji Klubowych postanowiła:",
    {
      x: 50,
      y: 370,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(
    `1. Przyznać licencję upoważniającą Klub do udziału w rozgrywkach o mistrzostwo ${leauge}`,
    {
      x: 50,
      y: 340,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(`piłki nożnej w sezonach rozgrywkowych ${currentSeason}`, {
    x: 60,
    y: 325,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });
  if (application.status_id === 10) {
    page.drawText(`z nadzorem infrastrukturalnym`, {
      x: 285,
      y: 325,
      font: regular,
      size: 10,
      color: rgb(0.07, 0.4, 0.7),
    });
  }
  //${application.sport_facilities[0].name}
  page.drawText(`2. Mecze w roli gospodarza rozgrywane będą na obiektach: `, {
    x: 50,
    y: 310,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  let y = 310;
  application.sport_facilities.forEach((object) => {
    y = y - 15;
    page.drawText(`${object.name}, ${object.address}`, {
      x: 60,
      y: y,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });
  });

  if (application.status_id === 10) {
    y = y - 25;
    page.drawText("Uzasadnienie: ", {
      x: 50,
      y: y,
      font: bold,
      size: 10,
      color: rgb(0, 0, 0),
    });
    page.drawText(`${application.reject_reason}`, {
      x: 50,
      y: y - 15,
      font: regular,
      size: 10,
      color: rgb(0, 0, 0),
    });
  }

  page.drawText("Otrzymują:", {
    x: 50,
    y: 115,
    font: bold,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Wnioskodawca", {
    x: 50,
    y: 100,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Wydział Gier i Ewidencji", {
    x: 50,
    y: 85,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText("Wielkopolskiego ZPN", {
    x: 50,
    y: 70,
    font: regular,
    size: 10,
    color: rgb(0, 0, 0),
  });

  const stampBytes = await fetch(
    "https://pdf.fra1.digitaloceanspaces.com/piecz%C4%85tka.png"
  ).then((res) => res.arrayBuffer());

  const stampPng = await pdfDoc.embedPng(stampBytes);
  const scaledStamp = pngLogo.scale(0.4);

  const signBytes = await fetch(
    "https://pdf.fra1.digitaloceanspaces.com/Podpis.png"
  ).then((res) => res.arrayBuffer());

  const signPng = await pdfDoc.embedPng(signBytes);
  const scaledSign = pngLogo.scale(0.7);

  const sign2Bytes = await fetch(
    "https://pdf.fra1.digitaloceanspaces.com/Podpis2.png"
  ).then((res) => res.arrayBuffer());

  const sign2Png = await pdfDoc.embedPng(sign2Bytes);
  const scaledSign2 = pngLogo.scale(0.7);

  page.drawImage(stampPng, {
    x: 100,
    y: 120,
    width: scaledStamp.width,
    height: scaledStamp.height + 40,
  });

  page.drawImage(signPng, {
    x: 200,
    y: 130,
    width: scaledSign.width - 20,
    height: scaledSign.height,
  });

  page.drawImage(sign2Png, {
    x: 380,
    y: 130,
    width: scaledSign2.width - 20,
    height: scaledSign2.height,
  });

  page.drawText(
    "Sekretarz \n Komisji ds.Licencji Klubowych \n Krzysztof Olędrowicz",
    {
      x: 200,
      font: regular,
      size: 10,
      y: 100,
      lineHeight: 15,
    }
  );

  page.drawText(
    "Przewodniczący \n Komisji ds.Licencji Klubowych \n Grzegorz Grocki",
    {
      x: 380,
      font: regular,
      size: 10,
      y: 100,
      lineHeight: 15,
    }
  );
  page.drawLine({
    start: { x: 200, y: 120 },
    end: { x: 335, y: 120 },
    thickness: 1,
    color: rgb(0.07, 0.4, 0.7),
  });

  page.drawLine({
    start: { x: 380, y: 120 },
    end: { x: 515, y: 120 },
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
