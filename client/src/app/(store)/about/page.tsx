import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Check, Zap } from "lucide-react";
import Link from "next/link";

const valueCards = [
  {
    title: "Sustainability",
    body: "I source my materials from renewable forests and use eco-friendly printing processes to minimize my environmental impact.",
    iconName: "Heart"
  },
  {
    title: "Quality",
    body: "Every canvas is crafted with premium cotton-poly blend materials and stretched over solid pine wood frames for lasting durability.",
    iconName: "Check"
  },
  {
    title: "Inspiration",
    body: "I believe art should inspire and transform spaces, bringing the calming essence of nature into your everyday environment.",
    iconName: "Zap"
  }
];

const iconMap = {
  Heart,
  Check,
  Zap
};

const processItems = [
  {
    title: "Capture",
    body: "I'll continue to explore, capture new scenes, and expand the collection with fresh work and new products over time."
  },
  {
    title: "Curate",
    body: "Each image is carefully selected and enhanced to bring out the natural beauty and emotional impact of the scene."
  },
  {
    title: "Create",
    body: "Using premium materials and precision printing, I transform digital art into museum quality canvas pieces ready to hang."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              About KVIKVNE
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Capturing the raw beauty of nature and transforming it into
              timeless art pieces that bring the beauty of Kauai into your home.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">My Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hey, I&rsquo;m Kai. I&rsquo;m a software engineer by day and a
                  photographer at heart. This site is a personal project where I
                  get to blend those two worlds code and creativity. Most of the
                  photos in this collection were taken over the years while
                  growing up on Kauai, a place that shaped how I see the world
                  and what I choose to capture. That connection makes every
                  image deeply personal to me. I focus on waves, landscapes, and
                  natural moments that tell a story or hold a feeling. Every
                  print here was photographed, selected, and prepared by me.
                </p>
                <p>
                  This project isn&rsquo;t just about photography, it&rsquo;s
                  about intention. Writing code all day can be technical and
                  fast paced, but this work allows me to slow down, create with
                  my hands and eyes, and connect with others. Each piece is
                  printed using premium materials to ensure the colors stay
                  vibrant, the details stay sharp, and the moment endures.
                  Thanks for being here. It truly means a lot.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/about-img.jpg"
                alt="Artist capturing nature photography"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-background text-center mb-12">
            My Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {valueCards.map((value, idx) => {
              const Icon = iconMap[value.iconName as keyof typeof iconMap];

              return (
                <Card key={idx} className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary text-background rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/IMG_9061.jpg"
                alt="Canvas printing process"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                My Process
              </h2>
              <div className="flex flex-col gap-6">
                {processItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2 ">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-background mb-8 leading-relaxed">
            Discover my collection of canvas prints and bring the beauty of
            Kauai into your home.
          </p>
          <Button
            className="cursor-pointer bg-transparent mt-4 hover:border-accent"
            variant={"outline"}
            size="lg"
            asChild
          >
            <Link href="/shop/prints">Shop Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
