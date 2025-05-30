// This where you define all of your products.
// Printify is very strict on the format of the request body so follow this exactly or else

export const productsArray = [
    {
        title: "Oceanic",
        description:
            "This evocative canvas print captures the essence of the ocean's dynamic energy as a majestic wave rises in a symphony of liquid elegance. The deep, rich hues of cerulean and sapphire convey the profound beauty of nature's unstoppable force, frozen in a moment of time. The play of light on the cresting wave creates a stunning display of contrast, highlighting the intricate details of every droplet. 'Oceanic' invites you to experience the power and grace of the sea, bringing a touch of aquatic majesty to your living space. Location: West Side, Kauai.",
        safety_information: "",
        blueprint_id: 1159,
        print_provider_id: 105,
        tags: ["canvas", "ocean", "wave"],
        variants: [
            {
                id: 91627,
                price: 8900,
                is_enabled: true,
            },
            {
                id: 91630,
                price: 12900,
                is_enabled: true,
            },
            {
                id: 91633,
                price: 15900,
                is_enabled: true,
            },
            {
                id: 91635,
                price: 18900,
                is_enabled: true,
            },
            {
                id: 91638,
                price: 24900,
                is_enabled: true,
            },
        ],
        print_areas: [
            {
                variant_ids: [91627, 91630, 91633, 91635, 91638],
                placeholders: [
                    {
                        position: "front",
                        images: [
                            {
                                id: "656fa658673461283aa66e23",
                                x: 0.5,
                                y: 0.5,
                                scale: 1,
                                angle: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        print_details: {
            print_on_side: "mirror",
        },
    },
    {
        title: "Painted Sky",
        description:
            "There's a moment, standing on the shore, when everything just... slows down. The sky lights up with rich golds and fiery oranges as the sun dips low, turning the clouds into brushstrokes on nature's own canvas. The waves roll in gently, their rhythm like a lullaby, while two silhouettes dance and laugh in the surf—carefree and full of joy. The ocean sparkles like liquid gold, warm and inviting, and for a second, nothing else matters. Just the sun on your skin, the salty breeze, and the simple happiness of being present. Above, the last light of day sets the clouds ablaze, and it feels like the whole world is quietly celebrating with you. This scene—captured on the west side of Kauai—is more than just a beautiful view. It's a reminder to slow down, to breathe, and to treasure the little moments that bring us joy.",
        safety_information: "",
        blueprint_id: 1159,
        print_provider_id: 105,
        tags: ["canvas", "ocean", "wave", "sunset", "beach"],
        variants: [
            {
                id: 91627,
                price: 8900,
                is_enabled: true,
            },
            {
                id: 91630,
                price: 12900,
                is_enabled: true,
            },
            {
                id: 91633,
                price: 15900,
                is_enabled: true,
            },
            {
                id: 91635,
                price: 18900,
                is_enabled: true,
            },
            {
                id: 91638,
                price: 24900,
                is_enabled: true,
            },
        ],
        print_areas: [
            {
                variant_ids: [91627, 91630, 91633, 91635, 91638],
                placeholders: [
                    {
                        position: "front",
                        images: [
                            {
                                id: "65c55ee60699e331739dc0bd",
                                x: 0.5,
                                y: 0.5,
                                scale: 1,
                                angle: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        print_details: {
            print_on_side: "mirror",
        },
    },
];
