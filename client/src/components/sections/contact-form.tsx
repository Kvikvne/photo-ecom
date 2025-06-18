"use client";
/// <reference types="grecaptcha" />

import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/config";
import { useRecaptchaScript } from "@/app/hooks/useRecaptchaScript";

// Form validation with Zod and React Hook Form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// UI components
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";

// Shipping address form validation schema
export const formSchema = z
  .object({
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

    reason: z
      .string()
      .trim()
      .min(2, { message: "Please enter a reason for contact." }),

    orderId: z
      .string()
      .trim()
      .length(24, { message: "Please enter a valid order ID." })
      .optional(),

    message: z
      .string()
      .trim()
      .min(2, { message: "Please enter a message." })
      .max(500, {
        message: "Your message is too long. Keep it under 500 characters."
      })
  })
  .superRefine((data, ctx) => {
    if (data.reason === "order-issue" && !data.orderId) {
      ctx.addIssue({
        path: ["orderId"],
        code: z.ZodIssueCode.custom,
        message: "Order ID is required when contacting about an order issue."
      });
    }
  });

export const reasonList = [
  { title: "General Inquiry", value: "general-inquiry" },
  { title: "Question About a Print", value: "print-question" },
  { title: "Issue With My Order", value: "order-issue" },
  { title: "Wholesale or Bulk Orders", value: "wholesale" },
  { title: "Licensing or Usage Request", value: "licensing" },
  { title: "Shipping or Delivery Questions", value: "shipping" },
  { title: "Collaborations or Partnerships", value: "collaboration" },
  { title: "Website Feedback", value: "website-feedback" },
  { title: "Something Else", value: "other" }
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  // Setup React Hook Form with Zod schema and default field values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? {
            first_name: "Kai",
            last_name: "Anderson",
            email: "kaianderson9@gmail.com",
            reason: "general-inquiry",
            orderId: "683a35c58e8e2de08ce2bc73",
            message: "This is a message example"
          }
        : {
            first_name: "",
            last_name: "",
            email: "",
            reason: "",
            orderId: undefined,
            message: ""
          }
  });

  useRecaptchaScript(RECAPTCHA_SITE_KEY);

  async function handleContactSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (typeof grecaptcha === "undefined") {
        toast.error("reCAPTCHA failed to load. Please refresh and try again.");
        setLoading(false);
        return;
      }

      const token = await new Promise<string>((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
            .then(resolve, reject);
        });
      });

      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        body: JSON.stringify({ values: values, token }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(data.message || "You're sending messages too quickly.");
        } else {
          toast.error(data.error || "Failed to send message.");
        }
        return;
      }

      toast.success(
        "Message sent. Thank you for reaching out to us. We will get in touch ASAP."
      );
      form.reset();
    } catch (err) {
      toast.error("There was a problem submitting your message.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const selectedReason = form.watch("reason");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleContactSubmit)}
        className="max-w-xl mx-auto"
      >
        <Card>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                disabled={loading === true}
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
                disabled={loading === true}
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
                disabled={loading === true}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="email@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                disabled={loading === true}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Contact</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {reasonList.map((reason, idx) => (
                          <SelectItem key={idx} value={reason.value}>
                            {reason.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {selectedReason === "order-issue" && (
              <FormField
                disabled={loading === true}
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              disabled={loading === true}
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-end items-end">
            <Button className="" type="submit">
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
