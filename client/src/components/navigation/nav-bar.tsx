import Image from "next/image";
import { ShoppingCart, Menu } from "lucide-react";
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
        <nav className="z-50 w-full flex justify-between md:justify-center items-center gap-12 px-4 h-22 bg-primary sticky top-0">
            {/* Left: Logo */}
            <Link href="/">
                <Image
                    src="/canvas-logo-2.svg"
                    alt="kvikvne"
                    width={100}
                    height={100}
                />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
                {navItems.map((item, idx) =>
                    item.isMenu ? (
                        <DropdownMenu key={idx}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="text-background hover:text-foreground"
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
            </div>

            {/* Right: Cart + Mobile Menu */}
            <div className="flex items-center gap-2">
                {/* Mobile Menu */}
                <div className="md:hidden bg">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-background">
                                <Menu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {navItems.map((item, idx) =>
                                item.isMenu ? (
                                    <div key={idx}>
                                        {/* <DropdownMenuItem disabled>
                                            {item.name}
                                        </DropdownMenuItem> */}
                                        {item.menuItems?.map(
                                            (subItem, subIdx) => (
                                                <DropdownMenuItem
                                                    key={subIdx}
                                                    asChild
                                                >
                                                    <Link href={subItem.link}>
                                                        {subItem.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <DropdownMenuItem key={idx} asChild>
                                        <Link href={item.link}>
                                            {item.name}
                                        </Link>
                                    </DropdownMenuItem>
                                )
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button variant="ghost" asChild>
                    <Link className="text-background" href="/cart">
                        <ShoppingCart />
                        <CartLenBadge />
                    </Link>
                </Button>
            </div>
        </nav>
    );
}
