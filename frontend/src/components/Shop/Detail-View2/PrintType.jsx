import css from "./Styles/PrintType.module.css";
import { useEffect, useState } from "react";

export default function PrintType({ name, products }) {
  // Ensure products.data is available and is an array
  const productTypes = Array.isArray(products.data) ? products.data : [];

  // Filter products with matching names
  const matchingProducts = productTypes.filter(
    (product) => product.title === name
  );

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
    <div className={css.outer}>
      <div className={css.wrapper}>
        <p>Select a print type:</p>

        <div className={css.btnContainer}>
          {matchingProducts.map((item, index) => (
            <a
              className={`${css.typeA} ${
                activeButtonIndex === index ? css.activeA : ""
              }`}
              key={index}
              href={item.external.handle}
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
      {matchingProducts[activeButtonIndex]?.tags[4] === "Canvas" && (
        <div className={css.productDescription}>
          <p>
            Uplift any room's decor with art that's printed on top-quality
            canvas gallery wraps. Each wrap is made with finely textured,
            artist-grade cotton substrate which helps reproduce the image in
            outstanding clarity and detail.
          </p>
        </div>
      )}
      {matchingProducts[activeButtonIndex]?.tags[3] === "Poster" && (
        <div className={css.productDescription}>
          <p>
            Made to seem like the photo is printed on a glass surface, these
            acrylic prints never fail to dazzle. Photos are second-surface
            printed directly on a 1/4" acrylic panel for a stunning result. Each
            acrylic print comes ready to hang, and floats 1.5" off the wall.
          </p>
        </div>
      )}
    </div>
  );
}
