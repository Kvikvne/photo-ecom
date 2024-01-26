import css from "./Styles/Cart.module.css";
import React, { useEffect, useState } from "react";
import CartTotal from "../components/Shop/Cart/CartTotal";
import { useCartContent } from "../utilities/cartUtils";
import axios from "axios";

export default function Cart() {
  const { cartContent, total, deleteCartItem, updateCart } = useCartContent();
  const [editedQuantities, setEditedQuantities] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Calculate and set the total quantity whenever cartContent changes
    let calculatedTotalQuantity = 0;
    cartContent.forEach((item) => {
      if (item.line_items && item.line_items.length > 0) {
        calculatedTotalQuantity += item.line_items[0].quantity || 0;
      }
    });
    setTotalQuantity(calculatedTotalQuantity);
  }, [cartContent]);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Parse the new quantity to an integer
    const parsedQuantity = parseInt(newQuantity, 10);

    // Check if the parsed quantity is a valid integer
    if (!isNaN(parsedQuantity)) {
      setEditedQuantities({ ...editedQuantities, [itemId]: parsedQuantity });
    }
  };

  const updateQuantity = async (itemId, currentQuantity) => {
    const newQuantity = editedQuantities[itemId] || currentQuantity;

    // Perform an update to your backend to update the quantity
    try {
      await axios.put(
        `http://localhost:3000/cart/updateQuantity/${itemId}`,
        {
          quantity: newQuantity,
        },
        {
          withCredentials: true, 
        }
      );

      // After the backend update, refresh the cart
      await updateCart();

      // Clear the edited quantity for the specific item
      setEditedQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[itemId];
        return updatedQuantities;
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCartItem(itemId), { withCredentials: true };
    } catch (error) {
      console.error("Error deleting item from the cart:", error);
    }
  };


  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.cartCard}>
          <div className={css.cartHeader}>
            <h2>Your Cart</h2>
          </div>
          {cartContent.length === 0 ? (
            <p className={css.emptyCartMessage}>Your cart is empty.</p>
          ) : (
            <div className={css.cartContent}>
              {cartContent.map((item, index) => (
                <div className={css.itemCard} key={index}>
                  <div className={css.itemImg}>
                    <img src={item.line_items[0].metadata.img} alt="" />
                  </div>
                  <div className={css.itemDetailList}>
                    <div className={css.itemDesc}>
                      <h3>{item.line_items[0].metadata.name}</h3>
                    </div>

                    <div className={css.cartItemDetail}>
                      <div className={css.spacer}></div>

                      <p>Size: {item.line_items[0].metadata.variant_label}</p>
                      <p>
                        Quantity:
                        <input
                          type="number"
                          value={
                            editedQuantities[item._id] ||
                            item.line_items[0].quantity
                          }
                          onChange={(e) =>
                            handleQuantityChange(item._id, e.target.value)
                          }
                          onBlur={() =>
                            updateQuantity(
                              item._id,
                              item.line_items[0].quantity
                            )
                          }
                          min="1"
                        />
                      </p>
                    </div>
                    <p className={css.price}>
                      ${item.line_items[0].metadata.price}
                    </p>
                  </div>

                  <div
                    className={css.delete}
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    &times;
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CartTotal
          totalPrice={total}
          totalQuantity={totalQuantity}
        />
      </div>
    </div>
  );
}
