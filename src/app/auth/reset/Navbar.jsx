"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Turn as Hamburger } from 'hamburger-react'

import { Selection } from "@heroui/react";

import { Button, Dropdown, Header, Label } from "@heroui/react";

import { useTheme } from 'next-themes'

import { Tabs } from "@heroui/react";
import { ArrowBigLeft, ArrowDown, ArrowDown01Icon, ChevronDown, Home, MonitorDot, Moon, SunDim, User, User2Icon } from "lucide-react";

import { Link } from "@heroui/react";

import { Accordion } from "@heroui/react";

const NavbarItems = [
    {
        id: 1,
        label: "Projects",
        href: "/",
        icon: <Home size={16} />,
    },
    {
        id: 2,
        label: "Resources",
        href: "/profile",
        icon: <User size={16} />,
    },
    {
        id: 3,
        label: "Designs",
        href: "/profile",
        icon: <User size={16} />,
    },
    {
        id: 4,
        label: "Settings",
        href: "/settings",
        icon: <MonitorDot size={16} />,
    },
];




function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState("1.01");
    const { theme, setTheme } = useTheme()



    return (
        <div className="flex flex-col w-full h-fit fixed top-0 left-0 z-20">

            <div className="w-full fixed border-b px-[16px] sm:px-[24px] md:px-[51px] border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-950
 h-[55px] flex items-center justify-between">


                <div className="w-[75px] sm:w-[50px] md:w-[88px]   flex items-center">
                    <Image src="/logo2.png"

                        alt="Logo"
                        width={200}
                        height={40}
                        className="mr-2 dark:bg-white  cursor-pointer"
                        onClick={() => window.location.href = "/"}
                        
                    />
                    <div className="pl-2 text-xs sm:text-sm md:text-base">
                        <Dropdown>
                            <Button variant="ghost" aria-label="Menu" size="sm" className="text-[10px] text-gray-400 dark:hover:text-white transition-colors  text-gray-700 dark:text-gray-300 
                       hover:text-black dark:hover:text-white 
                       transition-colors">
                                {selected || "Version"}
                            </Button>

                            <Dropdown.Popover className="min-w-[256px]">
                                <Dropdown.Menu
                                    selectedKeys={new Set([selected])}
                                    selectionMode="single"
                                    onSelectionChange={(keys) => setSelected([...keys][0])}
                                >
                                    <Dropdown.Section>
                                        <Header>Select a version</Header>

                                        <Dropdown.Item id="1.01">
                                            <Dropdown.ItemIndicator />
                                            <Label>1.01</Label>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="1.02">
                                            <Dropdown.ItemIndicator />
                                            <Label>1.02</Label>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="1.03">
                                            <Dropdown.ItemIndicator />
                                            <Label>1.03</Label>
                                        </Dropdown.Item>

                                    </Dropdown.Section>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>
                    {/* Navbar Desktop */}
                    <div className="hidden md:flex gap-4 items-center ml-6">

                        {NavbarItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="flex items-center gap-1 
                       text-gray-700 dark:text-gray-300 
                       hover:text-black dark:hover:text-white 
                       transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}

                    </div>


                </div>

                <div className="flex items-center justify-center gap-2">
                    {/* {theme && (
                        <Tabs
                            className="w-full max-w-lg text-center hidden md:block"
                            selectedKey={theme ?? "system"}
                            onSelectionChange={(key) => setTheme(key)}
                        >
                            <Tabs.ListContainer>
                                <Tabs.List
                                    aria-label="Theme switcher"
                                    className="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
                                >

                                    <Tabs.Tab id="light">
                                        <SunDim size={20} />
                                        <Tabs.Indicator className="bg-accent" />
                                    </Tabs.Tab>

                                    <Tabs.Tab id="dark">
                                        <Moon size={16} />
                                        <Tabs.Indicator className="bg-accent" />
                                    </Tabs.Tab>

                                    <Tabs.Tab id="system">
                                        <MonitorDot size={16} />
                                        <Tabs.Indicator className="bg-accent" />
                                    </Tabs.Tab>

                                </Tabs.List>
                            </Tabs.ListContainer>
                        </Tabs>
                    )} */}
                    <Button size="sm" className="text-xs m-w-[50px]">
                        <User2Icon />
                        <h1 className="hidden md:block">Login</h1>
                    </Button>


                    <div className="md:hidden">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
                    </div>
                </div>


            </div>


            {/* Mobile Nav menu */}

            {
                isOpen && (<div
                    className={`w-full fixed top-[55px] h-full py-4 left-0 bg-background items-center flex md:hidden 
 flex flex-col  gap-6 z-10
    transition-all duration-300 ease-in-out
    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 transition-all  pointer-events-none"}`}
                >
                    <Accordion className="w-full max-w-md">
                        {NavbarItems.map((item, index) => (
                            <Accordion.Item key={index}>
                                <Accordion.Heading>
                                    <Accordion.Trigger>
                                        {item.icon && <span className="mr-3 size-4 shrink-0 text-muted">{item.icon}</span>}
                                        {item.label}
                                        <Accordion.Indicator>
                                            <ChevronDown />                                        </Accordion.Indicator>
                                    </Accordion.Trigger>
                                </Accordion.Heading>
                                <Accordion.Panel>
                                    <Accordion.Body>
                                        <Link href={item.href} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors pl-6.5">
                                            {item.label}
                                            <Link.Icon />
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    {/* {theme && (
                        <Tabs
                            className="w-full max-w-lg text-center md:block my-1"
                            selectedKey={theme ?? "system"}
                            onSelectionChange={(key) => setTheme(key)}
                        >
                            <Tabs.ListContainer>
                                <Tabs.List
                                    aria-label="Theme switcher"
                                    className="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
                                >

                                    <Tabs.Tab id="light">
                                        <SunDim size={20} />
                                        <Tabs.Indicator className="bg-accent" />
                                    </Tabs.Tab>

                                    <Tabs.Tab id="dark">
                                        <Moon size={16} />
                                        <Tabs.Indicator className="bg-accent" />
                                    </Tabs.Tab>

                                    <Tabs.Tab id="system">
                                        <MonitorDot size={16} />
                                        <Tabs.Indicator className="bg-accent" />
                                    </Tabs.Tab>

                                </Tabs.List>
                            </Tabs.ListContainer>
                        </Tabs>
                    )} */}
                    <div className="flex gap-4 mb-2 justify-center md:justify-start">
                        <Link
                            href="/privacy-policy"
                            className="text-[10px] text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-[10px] text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Terms of Service
                        </Link>

                        <Link
                            href="/about"
                            className="text-[10px] text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                            About Us
                        </Link>
                    </div>


                </div>
                )
            }



        </div>
    )
}

export default Navbar
