import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateName = (accomodation, date) => {
    const month =  date[accomodation.id] ? date[accomodation.id].month :date.default.month
    const year =  date[accomodation.id] ? date[accomodation.id].year :date.default.year
    return accomodation.rental.firstname +
        "_" +
        accomodation.rental.lastname +
        "_" +
        month +
        "_" +
        year +
        ".pdf";
}


export const createPDF = (currentAccomodation, date, type, input) =>{
    const namePDF = generateName(currentAccomodation, date)
    if (input) {
        html2canvas(input).then((canvas) => {
            const image = canvas.toDataURL("image/png");
            const pdf = jsPDF("p", "mm", "a4");
            const width = 210;
            const height = 297;
            pdf.addImage(image, 0, 0, width, height);
            pdf.save(namePDF);
        });
    }
}