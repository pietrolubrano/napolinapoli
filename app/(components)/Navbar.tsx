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
  Divider,
} from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: 'Contatti', href: '/contacts' },
  { name: 'La Mia Prenotazione', href: '/reservation' },
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
    <Navbar isBordered isMenuOpen={isMenuOpen} shouldHideOnScroll maxWidth="full" onMenuOpenChange={setIsMenuOpen} className="bg-background z-50">

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

      <NavbarContent className="hidden sm:flex gap-4 uppercase" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Logo />
          </Link>
        </NavbarBrand>
        
        <Dropdown className="">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent text-sm font-bold uppercase data-[hover=true]:bg-transparent text-white"
                /* radius="sm" */
              >
                <div className="flex">
                  LE STANZE<ChevronDownIcon className="p-0 m-0" height={20}></ChevronDownIcon>  
                </div>
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
              <Button as={Link} href={item.href} className="p-0 bg-transparent text-sm font-bold uppercase text-white">
                {item.name}
              </Button>
            </NavbarItem>
          ))
        }

      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
            <Button as={Link} href="/search" className="p-0 bg-transparent text-sm font-bold uppercase text-white">
              PRENOTA
            </Button>
        </NavbarItem>
      </NavbarContent>

        {/* MOBILE MENU */}
      <NavbarMenu className="bg-background flex items-center justify-center uppercase font-bold">
            <div>
              <NavbarMenuItem>
                <p className="text-3xl mb-1">
                  Le Stanze
                </p>
              </NavbarMenuItem>
              
              {rooms.map((item, index) => (
              <NavbarMenuItem key={`${item.name}-${index}`}>
                <Link
                  className={`${index <= 2 && ''}ms-3 text-md w-full text-white`}
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
          

          <Divider className="my-2 bg-transparent"></Divider>
          {navigation.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className={`${index <= 2 && ''} w-full text-xl text-white`}
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
          <Divider className="p-16 bg-transparent"></Divider>
          </div>
      </NavbarMenu>
    </Navbar>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

