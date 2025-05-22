export type CartItem = {
    id: number; // variant ID
    title: string;
    price: number;
    productId: string;
    image: string;
    productTitle: string;
    quantity: number;
};

export function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart: CartItem) {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
}
