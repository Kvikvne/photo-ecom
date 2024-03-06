import css from "./Styles/ProductMain.module.css";
import { usePrintify } from "../utilities/printifyUtils";
import { useDeleteProduct } from "../utilities/deleteUtils";
import AllLoadingState from "../components/Loaders/AllLoadingState";
import { Helmet } from "react-helmet";

// Define the available product types
const TAGS = ["Canvas", "Accessories"];

// display product categories
export default function ProductMain() {
  // Fetch printify products using custom hook
  const { printifyProducts } = usePrintify();
  // Extract products data from printifyProducts or default to an empty array
  const products = printifyProducts.data || [];

  //------------------------------------------------------------
  // Utility to publish products
  //-----------------------------
  // to change product id go to the printify services controller
  // const { publishProductRequest } = useDeleteProduct()
  //------------------------------------------------------------

  // Define product types with their corresponding display names
  const productTypes = {
    Poster: "Acrylic prints",
    Canvas: "Art & Wall Decor",
    Accessories: "Accessories",
    "Art & Wall Decor": "Art & Wall Decor",
  };

  // Function to filter products for each tag
  const getProductByTag = (tag) => {
    return products.find((product) => product.tags.includes(tag));
  };

  return (
    <div className={css.wrapper}>
      {/* Helmet for setting page title */}
      <Helmet>
        <title>Shop | KVIKVNE Photography</title>
      </Helmet>
      <div className={css.header}>
        {/* Main heading */}
        <h1>Shop</h1>
        {/* Additional information or description */}
        <p>
          Whether you're seeking a statement piece to anchor your living room or
          a thoughtful gift for a loved one, my collection has something to
          inspire and delight. Explore my diverse range of prints, each
          thoughtfully curated to evoke emotion and spark imagination. With
          unparalleled quality and craftsmanship, discover the perfect piece
          that resonates with your unique style.
        </p>
      </div>

      <div className={css.container}>
        {/* Show loading state if products are not available */}
        {products.length === 0 ? (
          Array.from({ length: 2 }).map((_, index) => (
            <AllLoadingState key={index} />
          ))
        ) : (
          <>
            {TAGS.map((tag, index) => {
              // Find product with the current tag
              const productWithTag = getProductByTag(tag);
              if (productWithTag) {
                // Extract default image URL
                let defaultImg = productWithTag.images.filter(
                  (image) => image.is_selected_for_publishing
                );
                defaultImg = defaultImg[3].src;
                // Render product category card
                return (
                  <div className={css.categoryCard} key={index}>
                    <div className={css.cardHeader}>
                      {/* Display product type name */}
                      <h2>{productTypes[tag] || tag}</h2>
                    </div>
                    {/* Link to view products of this category */}
                    <a href={`products/${tag}`}>
                      <div className={css.imgContainer}>
                        {/* Display default image */}
                        <img key={index} src={defaultImg} alt="" />
                      </div>
                    </a>
                    {/* Button to view products of this category */}
                    <div>
                      <a href={`products/${tag}`}>
                        <button>View</button>
                      </a>
                    </div>
                  </div>
                );
              }
            })}
          </>
        )}
      </div>
    </div>
  );
}
