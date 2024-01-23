import axios from "axios";
import css from "./Styles/Addtocartbtn2.module.css";

export default function AddToCartBtn2({ cartInfo }) {

    


    const handleAddToCart = async () => {
        if (cartInfo.sku.trim() === "") {
          alert("No variant is selected. Please select a variant.");
          return;
        }
        try {
          console.log(cartInfo);
          // API endpoint to handle adding to the cart
          await axios.post("http://localhost:3000/cart/add", cartInfo, { withCredentials: true });
          console.log(cartInfo)
          // Show a success message or trigger other actions 
          alert("Product added to cart successfully");
        } catch (error) {
          // Handle errors 
          alert("Error adding product to cart:", error);
        }
      };

    return(
        <div className={css.btn} onClick={handleAddToCart}>
        <p>Add to Cart</p>
      </div>
        );
}