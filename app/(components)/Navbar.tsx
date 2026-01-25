"use client"

import Image from "next/image";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

const navigation = [
  { name: 'Chi siamo', href: '/about' },
  { name: 'Contatti', href: '/contacts' }
]

const rooms = [
  { name: 'San Biagio', href: '/room/san-biagio' },
  { name: 'Maiorani', href: '/room/maiorani' },
  { name: 'Divino Amore', href: '/room/divino-amore' }
]

export const Logo = () => {
  return (
    <Image
      width={100}
      height={100}
      loading="eager"
      alt="Your Company"
      src="/images/napoli-napoli-logo.png"
      className="h-8 w-auto"
    />
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-background z-50">

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
        
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                radius="sm"
              >
                Rooms
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {rooms.map((item) => (
              <DropdownItem key={item.name} as={Link} href={item.href}>
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {
          navigation.map((item) => (
            <NavbarItem key={item.name} className={classNames(
              "text-inherit hover:text-inherit",
            )}>
              <Link className="text-white" href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>

      <NavbarMenu className="bg-background">
        {rooms.concat(navigation).map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-white"
           /*    color={
                index === 2 ? "primary" : index === navigation.length - 1 ? "danger" : "foreground"
              } */
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

