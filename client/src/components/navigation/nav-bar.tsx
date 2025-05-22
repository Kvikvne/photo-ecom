import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartLenBadge } from "./cart-badge";

const navItems = [
    { name: "Home", link: "/", isMenu: false },
    { name: "About", link: "/about", isMenu: false },
    {
        name: "Shop",
        link: "/",
        isMenu: true,
        menuItems: [
            { name: "Prints", link: "/shop/prints" },
            { name: "Accessories", link: "/shop/accessories" },
        ],
    },
    { name: "My orders", link: "/orders", isMenu: false },
];

export function Navbar() {
    return (
        <nav className="z-2 w-full flex justify-center items-center gap-4 h-22 bg-primary sticky top-0">
            <div className="relative">
                <Link href={"/"}>
                    <Image
                        src={"/canvas-logo-2.svg"}
                        alt="kvikvne"
                        width={100}
                        height={100}
                    />
                </Link>
            </div>
            {navItems.map((item, idx) =>
                item.isMenu ? (
                    <DropdownMenu key={idx}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="cursor-pointer text-background hover:text-foreground"
                                variant="ghost"
                            >
                                {item.name}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {item.menuItems?.map((i, subIdx) => (
                                <DropdownMenuItem key={subIdx} asChild>
                                    <Link href={i.link}>{i.name}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        className="text-background hover:text-foreground"
                        key={idx}
                        variant="ghost"
                        asChild
                    >
                        <Link href={item.link}>{item.name}</Link>
                    </Button>
                )
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="cursor-pointer text-background hover:text-foreground"
                        variant="ghost"
                    >
                        <ShoppingCart />
                        <CartLenBadge />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href={"/cart"}>View cart</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}
