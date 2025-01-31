import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import html2pdf from "html2pdf.js";

// Load custom fonts
import customFont from "./assets/fonts/CustomFont.ttf";

const ResumePreview = ({ name, sections, academic }) => {
  const [pdfLoading, setPdfLoading] = useState(false);

  // Add custom font
  Font.register({ family: "CustomFont", src: customFont });

  // Format text (bold, italic, etc.)
  const formatText = (text) => {
    return text
      .replace(/\*(.*?)\*/g, (match, p1) => `<b>${p1}</b>`) // Example for bold text
      .replace(/~(.*?)~/g, (match, p1) => `<i>${p1}</i>`)
      .replace(/_(.*?)_/g, (match, p1) => `<u>${p1}</u>`)
      .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => `<a href="${url}" target="_blank" class="underline">${text}</a>`);
  };

  // Generate PDF for download
  const generatePDF = () => {
    setPdfLoading(true);
    const element = document.getElementById("resumeContent");
    const options = {
      filename: `${name}_resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(element, options).then(() => {
      setPdfLoading(false);
      alert("Resume PDF generated successfully!");
    }).catch((err) => {
      setPdfLoading(false);
      alert("Error generating PDF: " + err.message);
    });
  };

  // Resume content styling
  const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
    },
    header: {
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
    },
    subheader: {
      fontSize: 18,
      textAlign: "left",
      marginTop: 15,
      fontWeight: "bold",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
    },
  });

  return (
    <div>
      <div id="resumeContent" style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
        <div className="mb-1 flex justify-between items-center">
          <div></div>
          <h1 className="text-xl font-bold uppercase">{name}</h1>
        </div>

        {/* Academic Details Section */}
        <div className="mb-4">
          <h4 className="uppercase font-bold">Academic Details</h4>
          <div className="h-[2px] bg-black mt-1 mb-1"></div>
          <table className="w-full text-sm border-collapse border-none">
            <thead>
              <tr>
                <th className="text-left p-2 border-none">Year</th>
                <th className="text-left p-2 border-none">Degree / Board</th>
                <th className="text-left p-2 border-none">Institute</th>
                <th className="text-left p-2 border-none">GPA / Marks(%)</th>
              </tr>
            </thead>
            <tbody>
              {academic.map((item, index) => (
                <tr key={index}>
                  <td className="p-2">{item.year}</td>
                  <td className="p-2">{item.degree}</td>
                  <td className="p-2">{item.institute}</td>
                  <td className="p-2">{item.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Other Sections */}
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col mb-4">
            <h4 className="uppercase font-bold">{section.title}</h4>
            <div className="h-[2px] bg-black mt-1 mb-1"></div>

            {section.subheadings.map((subheading, subheadingIndex) => (
              <div key={subheadingIndex} className="bg-white p-1">
                <p dangerouslySetInnerHTML={{ __html: formatText(subheading.subtitle) }} />
                <ul className="list-inside list-disc ml-5">
                  {subheading.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: formatText(bullet) }} />
                  ))}
                </ul>

                {subheading.lines.length !== 0 && <div className="h-[1.5px] mt-1 bg-black"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* PDF Download Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={generatePDF}
          disabled={pdfLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#041f96",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: pdfLoading ? "not-allowed" : "pointer",
          }}
        >
          {pdfLoading ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
