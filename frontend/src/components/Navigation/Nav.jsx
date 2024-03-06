import css from "./Styles/Nav.module.css";
import NavCart from "./NavCart";
import { useCartContent } from "../../utilities/cartUtils";
import { useEffect, useState, useRef  } from "react";
import NavMenu from "./NavMenu";

export default function Nav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScreenWidth500, setIsScreenWidth500] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartContent, totalQuantity, updateCart } = useCartContent();
  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown menu state
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    updateCart();
  };

  useEffect(() => {
    function handleResize() {
      setIsScreenWidth500(window.innerWidth < 700);
    }

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

     // Event listener to detect clicks outside of dropdown
     document.addEventListener("mousedown", handleClickOutside);

     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);

   // Function to handle click outside of dropdown
   const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  return (
    <div className={css.navContainer}>
      <div className={css.spacer}></div>
      <nav>
        <div className={css.icon}>
          <a href="/">
            <img src="/PORTFOLIO_LOGO_1.svg" alt="" />
          </a>
        </div>

        <div className={css.navRight}>
          {isScreenWidth500 ? (
            <div ref={dropdownRef} className={css.toggleDropdown} onClick={toggleDropdown}>
              <span>Menu</span>
              <i className="fa-solid fa-caret-down"></i>
              
            </div>
            
          ) : (
            <>
              <a href="/">
                <span>Home</span>
              </a>
              <a href="/about">
                <span>About</span>
              </a>
              <a href="/products">
                <span>Shop</span>
              </a>
              <a href="/my-orders">
                <span>My orders</span>
              </a>
            </>
          )}
        </div>
      </nav>

      <div ref={cartRef} className={css.cart}>
        <i onClick={toggleCart} className="fa-solid fa-cart-shopping"></i>
        {cartContent.length > 0 && (
          <span className={css.cartCount}>{totalQuantity}</span>
        )}
        {isCartOpen && <NavCart />}
      </div>
      <div className={css.spacer}></div>
      {isDropdownOpen && <NavMenu />}
    </div>
  );
}
