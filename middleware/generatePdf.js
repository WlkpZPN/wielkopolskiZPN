import { PDFDocument, StandardFonts, rgb, rgba } from "pdf-lib";
import download from "downloadjs";
import fontKit from "@pdf-lib/fontkit";

export const generatePdf = async () => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontKit);
  const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";
  const fontBytes = await fetch(url).then((res) => res.arrayBuffer());
  const latoFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  const fontSize = 30;
  page.drawText(
    "Decyzja Komisji ds. Licencji Klubowych Wielkopolskiego Związku Piłki Nożej",
    {
      x: 50,
      y: height - 4 * fontSize,
      font: latoFont,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText("z dnia", {
    x: width / 2,
    y: height - 6 * fontSize,
    color: rgb(0, 0, 0),
    font: latoFont,
  });

  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "licencja.pdf", "application/pdf");
};
