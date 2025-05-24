import axios from "axios";
import { PrintifyProduct } from "../types/printify";
import { OrderDocument } from "../models/order";

const TOKEN = process.env.PRINTIFY_TOKEN;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

const printifyClient = axios.create({
    baseURL: `https://api.printify.com/v1/shops/${SHOP_ID}`,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export async function getAllProducts(): Promise<any> {
    const res = await printifyClient.get("/products.json");
    return res.data.data;
}

export async function getProductById(
    productId: string
): Promise<PrintifyProduct> {
    const res = await printifyClient.get(`/products/${productId}.json`);
    return res.data;
}

export async function getAllOrders(): Promise<any> {
    const res = await printifyClient.get("/orders.json");
    return res.data;
}

export async function getPrintifyOrder(printifyOrderId: string): Promise<any> {
    const res = await printifyClient.get(`/orders/${printifyOrderId}.json`);
    return res.data;
}

// ADMIN PRODUCT DELETE
export async function deleteProduct(productId: string): Promise<any> {
    try {
        const res = await printifyClient.delete(`/products/${productId}.json`);
        return res.data;
    } catch (error: any) {
        console.error(
            "Error in deleteProduct:",
            error.response?.data || error.message
        );
        throw error;
    }
}
// ADMIN PRODUCT PUBLISH
export async function publishProduct(
    productId: string,
    externalData: { id: string; handle: string }
): Promise<any> {
    try {
        const res = await printifyClient.post(
            `/products/${productId}/publishing_succeeded.json`,
            { external: externalData }
        );
        return res.data;
    } catch (error: any) {
        console.error(
            "Error in publishProduct:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export async function shippingCost(
    formattedData: Record<string, any>
): Promise<any> {
    try {
        const res = await printifyClient.post(
            "/orders/shipping.json",
            formattedData
        );
        return res.data;
    } catch (error: any) {
        console.error(
            "Error in shippingCost:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export async function cancelPrintifyOrder(orderId: string): Promise<any> {
    try {
        const res = await printifyClient.post(`/orders/${orderId}/cancel.json`);
        return res.data;
    } catch (error: any) {
        console.error(
            "Error in cancelOrder:",
            error.response?.data || error.message
        );
        throw error;
    }
}

export async function sendToPrintify(order: OrderDocument): Promise<string> {
    const shopId = process.env.PRINTIFY_SHOP_ID;
    const token = process.env.PRINTIFY_TOKEN;

    if (!shopId || !token) {
        throw new Error(
            "Missing PRINTIFY_SHOP_ID or PRINTIFY_TOKEN in environment"
        );
    }
    const formattedOrderData = {
        external_id: order._id.toString(),
        line_items: order.lineItems.map((item) => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
        })),
        shipping_method: order.shippingMethod,
        send_shipping_notification: false,
        address_to: order.addressTo,
    };

    try {
        const response = await axios.post(
            `https://api.printify.com/v1/shops/${shopId}/orders.json`,
            formattedOrderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.id; // This is the Printify order ID
    } catch (error: any) {
        console.error(
            "Error from Printify API:",
            error.response?.data || error.message,
            formattedOrderData
        );
        throw new Error("Failed to submit order to Printify");
    }
}
