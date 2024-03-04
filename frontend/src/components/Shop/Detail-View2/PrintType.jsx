import css from "./Styles/PrintType.module.css";
import { useEffect, useState } from "react";

export default function PrintType({ name, products }) {
  // Ensure products.data is available and is an array
  const productTypes = Array.isArray(products.data) ? products.data : [];

  // Filter products with matching names
  const matchingProducts = productTypes.filter(
    (product) => product.title === name
  );
console.log(matchingProducts)
  // State to track active button index
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  // useEffect to check URL and set active button index
  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeIndex = matchingProducts.findIndex(
      (item) => item.external.handle === currentPath
    );
    setActiveButtonIndex(activeIndex);
  }, [matchingProducts]);

  // Conditionally render the div container if there are matching products
  if (matchingProducts.length === 0) {
    return null; // Or any other component or message indicating no matching products
  }

  return (
    <div className={css.wrapper}>
      <p>Select a print type:</p>

      <div className={css.btnContainer}>
        {matchingProducts.map((item, index) => (
          <a 
            className={`${css.typeA} ${
              activeButtonIndex === index ? css.activeA : ""
            }`}
            key={index} href={item.external.handle}
          >
            <button
              className={`${css.typeBtn} ${
                activeButtonIndex === index ? css.active : ""
              }`}
            >
              {item.tags[4] === "Canvas" ? "Canvas" : "Acrylic"}
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}
