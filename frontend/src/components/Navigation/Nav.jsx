import css from "./Styles/Nav.module.css";
import NavCart from "./NavCart";
import { useCartContent } from "../../utilities/cartUtils";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartContent, totalQuantity, updateCart } = useCartContent();

  const updateScrollState = () => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    updateCart()
    
  };

  useEffect(() => {
    updateScrollState();

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className={`${css.navContainer} ${isScrolled ? css.scrolled : ""}`}>
      <div className={css.spacer}></div>
      <nav>
        <div className={css.icon}>
          <a href="/">
            <img src="/PORTFOLIO_LOGO_1.svg" alt="" />
          </a>
        </div>

        <div className={css.navRight}>
          <span onClick={toggleMenu} className="material-symbols-outlined">
            menu
          </span>

          {isMenuOpen && (
            <div className={css.dropDownMenu}>
              <a href="/prints">Canvas Prints</a>
            </div>
          )}
        </div>
      </nav>
      <div className={css.spacer}></div>
      <div className={css.cart}>
        <i onClick={toggleCart} className="fa-solid fa-cart-shopping"></i>
        {cartContent.length > 0 && (
          <span className={css.cartCount}>{totalQuantity}</span>
        )}
        {isCartOpen && <NavCart />}
      </div>
    </div>
  );
}
