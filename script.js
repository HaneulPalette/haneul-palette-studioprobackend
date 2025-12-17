const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const analyseBtn = document.getElementById("analyseBtn");
const resultsDiv = document.getElementById("results");
const analysisList = document.getElementById("analysisList");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

const PLAN_NAME = "Haneul Studio Pro";
const PRICE = 2499;

let analysisData = [];

/* IMAGE UPLOAD */
imageUpload.addEventListener("change", () => {
  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
    analyseBtn.disabled = false;
  };
  reader.readAsDataURL(file);
});

/* ANALYSIS LOGIC */
analyseBtn.addEventListener("click", () => {

  analysisData = [
    "32-Tone Precision Result: Cool Bright Summer 2B",
    "Undertone Balance: Pink-leaning cool",
    "Chromatic Axis: High clarity, medium depth",
    "Face Shape: Soft Oval",
    "Golden Ratio Facial Balance: 87%",
    "Fabric Recommendation: Matte, soft-sheen textures",
    "Avoid Colours: Muddy browns, dusty mustard",
    "Makeup Direction: K-Beauty glow, cool rose lips",
    "Accessories: Silver, pearl, transparent frames",
    "Wardrobe Focus: Cool pastels + crisp neutrals"
  ];

  analysisList.innerHTML = "";
  analysisData.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    analysisList.appendChild(li);
  });

  resultsDiv.classList.remove("hidden");
});

/* PDF GENERATION */
downloadPdfBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text(PLAN_NAME, 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.text("Premium Personalized Report", 20, y);
  y += 10;

  doc.text(`Payment Amount: ₹${PRICE}`, 20, y);
  y += 15;

  analysisData.forEach((line, i) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${i + 1}. ${line}`, 20, y);
    y += 10;
  });

  doc.addPage();
  doc.text("Thank you for choosing Haneul Studio Pro", 20, 40);

  doc.save("Haneul_Studio_Pro_Report.pdf");
});
