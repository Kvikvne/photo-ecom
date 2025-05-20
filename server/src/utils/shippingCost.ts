import axios from "axios";

const PRINTIFY_API_KEY = process.env.NEW_P_TOKEN!;
const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID!;

export async function calculateShippingCost(
    address_to: any,
    line_items: any[]
) {
    const response = await axios.post(
        `https://api.printify.com/v1/shops/${PRINTIFY_SHOP_ID}/orders/shipping.json`,
        { address_to, line_items },
        {
            headers: {
                Authorization: `Bearer ${PRINTIFY_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}
