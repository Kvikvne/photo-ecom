import css from "./Styles/FAQ.module.css";
import { useState } from "react";

const FAQ_DATA = [
  {
    q: "How do I care for my canvas or acrylic print?",
    a: "To maintain the quality and longevity of your print, we recommend avoiding direct sunlight and high humidity environments. Use a soft, dry cloth to gently dust your print as needed.",
  },
  {
    q: "How do I hang my canvas or acrylic print?",
    a: "Hanging your canvas or acrylic print is easy. Our canvas prints come ready to hang with pre-installed hardware, while our acrylic prints include a floating mount system for a sleek and modern look.",
  },
  {
    q: "What materials are used in your canvas and acrylic prints?",
    a: "We use high-quality materials for both our canvas and acrylic prints. Our canvas prints are made with natural white, matte, ultra smooth, 100% cotton canvas with 400gsm standard and archival inks, while our acrylic prints are produced using high-definition printing and optically clear acrylic.",
  },
  {
    q: "How long does it take to receive my order?",
    a: "The production time for your order depends on the type and size of print you've selected. Once your print is produced, shipping typically takes between 5 to 10 business days.",
  },
  { q: "Do you ship internationally?", a: "At this time, we are exclusively shipping within the USA. However, we're actively exploring options to extend our shipping services internationally. Stay tuned for updates on our progress!" },
];

export default function FAQ() {
  const [isOpenList, setIsOpenList] = useState(
    new Array(FAQ_DATA.length).fill(false)
  );

  const handleOpen = (index) => {
    const newIsOpenList = [...isOpenList]; // Create a copy of the array
    newIsOpenList[index] = !newIsOpenList[index]; // Toggle the state of the clicked item
    setIsOpenList(newIsOpenList); // Update the state
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1>Frequently asked questions</h1>
      </div>
      {FAQ_DATA.map((item, index) => (
        <div key={index} className={css.faqContainer}>
          <div onClick={() => handleOpen(index)} className={css.question}>
            <h2>{item.q}</h2>
            <div
              className={`${css.arrow} ${
                isOpenList[index] ? css.openArrow : ""
              }`}
            >
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div className={`${css.answer} ${isOpenList[index] ? css.open : ""}`}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
