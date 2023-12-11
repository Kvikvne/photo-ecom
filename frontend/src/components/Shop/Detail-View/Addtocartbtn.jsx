
import axios from "axios";
import css from "./Styles/Addtocartbtn.module.css";

const AddToCartBtn = ({ productId, variantId, sku, title, price, selectedImage, productName, productDescription }) => {

  const imgSrc = selectedImage?.src

  const handleAddToCart = async () => {
    if (sku.trim() === "") {
      alert("No variant is selected. Please select a variant.");
      return;
    }
    try {
      console.log({
        product_id: productId,
        quantity: 1,
        variant_id: variantId,
        price: price,
        variant_label: title,
        sku: sku,
        img: imgSrc,
        name: productName,
        description: productDescription
      });
      // API endpoint to handle adding to the cart
      await axios.post("http://localhost:3000/api/cart/add", {
        product_id: productId,
        quantity: 1,
        variant_id: variantId,
        price: price,
        variant_label: title,
        sku: sku,
        img: imgSrc,
        name: productName,
        description: productDescription
      });

      // Show a success message or trigger other actions 
      alert("Product added to cart successfully");
    } catch (error) {
      // Handle errors 
      alert("Error adding product to cart:", error);
    }
  };

  return (
    <div className={css.btn} onClick={handleAddToCart}>
      <p>Add to Cart</p>
    </div>
  );
};

export default AddToCartBtn;
