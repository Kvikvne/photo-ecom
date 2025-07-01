"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { Badge } from "../ui/badge";

type Product = {
  title: string;
  description: string;
  safety_information: string;
  blueprint_id: number;
  print_provider_id: number;
  tags: string[];
  variants: {
    id: number;
    price: number;
    is_enabled: boolean;
  }[];
  print_areas: {
    variant_ids: number[];
    placeholders: {
      position: string;
      images: {
        id: string;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }[];
    }[];
  }[];
  print_details: {
    print_on_side: string;
  };
};

type ProductList = Product[];

export default function ActiveProductViewer({
  refreshKey
}: {
  refreshKey: number;
}) {
  const [productsData, setProductsData] = useState<ProductList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductsJson() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/products/get-live`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (!data || typeof data !== "object") {
          throw new Error("Data format is incorrect or incomplete");
        }

        setProductsData(data.products);
      } catch (err: unknown) {
        console.log(err);
        toast.error("There was a problem fetching data from JSON.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductsJson();
  }, [refreshKey]);

  return (
    <div className="p-6 bg-card rounded-xl">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="space-y-3">
          <h1 className="font-bold">Your Active Products</h1>
          <p className="mb-2 text-sm text-muted-foreground">
            Here is your list of active products. These are live on Printify,
            Stripe, and the DB.
          </p>
          {!productsData?.length && !loading && <p>No products found.</p>}
          <div className="">
            {productsData?.map((product, idx) => (
              <Accordion key={idx} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {product.title} ({product.tags[0]})
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mb-2">
                      <h4 className="font-medium">Variants:</h4>
                      <ul className="ml-4 list-disc space-y-1.5">
                        {product.variants.map((v) => (
                          <li key={v.id} className="font-normal">
                            ID: <Badge variant={"outline"}>{v.id}</Badge>,
                            Price:{" "}
                            <Badge variant={"outline"}>
                              ${(v.price / 100).toFixed(2)}
                            </Badge>
                            , Enabled:{" "}
                            {v.is_enabled ? (
                              <Badge variant={"outline"}>True</Badge>
                            ) : (
                              <Badge variant={"destructive"}>False</Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
