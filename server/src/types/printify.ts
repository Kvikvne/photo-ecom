export interface PrintifyOptionValue {
    id: number;
    title: string;
}

export interface PrintifyOption {
    name: string;
    type: string;
    values: PrintifyOptionValue[];
    display_in_preview: boolean;
}

export interface PrintifyVariant {
    id: number;
    sku: string;
    cost: number;
    price: number;
    title: string;
    grams: number;
    is_enabled: boolean;
    is_default: boolean;
    is_available: boolean;
    is_printify_express_eligible: boolean;
    options: number[];
    quantity: number;
}

export interface PrintifyImage {
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
    is_selected_for_publishing: boolean;
    order: number | null;
}

export interface PrintifyExternal {
    id: string;
    handle: string;
}

export interface PrintifyPlaceholderImage {
    id: string;
    name: string;
    type: string;
    height: number;
    width: number;
    x: number;
    y: number;
    scale: number;
    angle: number;
    src: string;
}

export interface PrintifyPrintArea {
    variant_ids: number[];
    placeholders: Array<{
        position: string;
        images: PrintifyPlaceholderImage[];
    }>;
    background: string;
}

export interface PrintifyViewFile {
    src: string;
    variant_ids: number[];
}

export interface PrintifyView {
    id: number;
    label: string;
    position: string;
    files: PrintifyViewFile[];
}

export interface PrintifyProduct {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: PrintifyOption[];
    variants: PrintifyVariant[];
    images: PrintifyImage[];
    created_at: string;
    updated_at: string;
    visible: boolean;
    is_locked: boolean;
    external: PrintifyExternal;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: PrintifyPrintArea[];
    print_details: {
        print_on_side: string;
    };
    sales_channel_properties: any[];
    is_printify_express_eligible: boolean;
    is_printify_express_enabled: boolean;
    is_economy_shipping_eligible: boolean;
    is_economy_shipping_enabled: boolean;
    is_deleted: boolean;
    original_product_id: string;
    views: PrintifyView[];
}
