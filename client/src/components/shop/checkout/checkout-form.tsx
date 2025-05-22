"use client";

import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StripeBadge } from "@/components/ui/stripe-badge";

import { getCart } from "@/lib/cart-utils";

export const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "BE", name: "Belgium" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "AT", name: "Austria" },
    { code: "IE", name: "Ireland" },
    { code: "NZ", name: "New Zealand" },
    { code: "NO", name: "Norway" },
    { code: "DK", name: "Denmark" },
    { code: "FI", name: "Finland" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "SG", name: "Singapore" },
    { code: "MX", name: "Mexico" },
    { code: "BR", name: "Brazil" },
    { code: "ZA", name: "South Africa" },
];

export const formSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(50, { message: "First name must be 50 characters or less." }),

    last_name: z
        .string()
        .trim()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(50, { message: "Last name must be 50 characters or less." }),

    email: z
        .string()
        .trim()
        .email({ message: "Please enter a valid email address." }),

    phone: z
        .string()
        .trim()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(20, { message: "Phone number is too long." })
        .regex(/^[0-9\-+()\s]+$/, {
            message:
                "Phone number must only contain numbers or symbols like + - ( )",
        }),

    country: z
        .string()
        .trim()
        .min(2, { message: "Please enter your country." }),

    region: z
        .string()
        .trim()
        .min(2, { message: "Please enter your state or region." }),

    city: z.string().trim().min(2, { message: "Please enter your city." }),

    address1: z
        .string()
        .trim()
        .min(2, { message: "Address 1 must be at least 2 characters long." }),

    address2: z
        .string()
        .trim()
        .min(2, { message: "Address 2 must be at least 2 characters long." }),

    zip: z
        .string()
        .trim()
        .regex(/^[0-9A-Za-z\- ]{4,10}$/, {
            message: "Please enter a valid ZIP or postal code.",
        }),
});

interface ShippingInfo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    city: string;
    address1: string;
    address2: string;
    zip: string;
}

async function handleShippingSubmit(data: ShippingInfo) {
    const cart = getCart();
    const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipping: data, cart }),
    });

    const result = await res.json();
    if (result.url) {
        window.location.href = result.url;
    }
}

function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        handleShippingSubmit(values);
    } catch (err) {
        console.error("There was problem submitting your order.");
    }
}

export default function CheckoutForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "Kai",
            last_name: "Anderson",
            email: "kaianderson9@gmail.com",
            phone: "123-456-7890",
            country: "US",
            region: "CA",
            city: "Imperial Beach",
            address1: "705 3rd street",
            address2: "Apt K",
            zip: "91932",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-xl mx-auto"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="email@email.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="123-456-7890"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {countries.map(
                                                    (country, idx) => (
                                                        <SelectItem
                                                            key={idx}
                                                            value={country.code}
                                                        >
                                                            {country.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="address1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address 1</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="123 Main St"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address 2</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Apt, suite, unit, etc."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zip</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="90210"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 justify-end items-end">
                        <Button className="" type="submit">
                            Continue to payment
                        </Button>
                        <div className="w-26">
                            <StripeBadge />
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
