export interface CartItem {
    id: any;
    variantId: number;
    productId: string;
    quantity: number;
    price: number;
    title: string;
}
export interface CartProduct {
    productId: string;
    title: string;
    description: string;
    images: string;
}

export interface CartDocument extends Document {
    sessionId: string;
    items: CartItem[];
    updatedAt: Date;
    products: CartProduct[];
}
