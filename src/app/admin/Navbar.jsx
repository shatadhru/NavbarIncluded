"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Turn as Hamburger } from 'hamburger-react'

import { Button } from "@heroui/react";
import { useTheme } from 'next-themes'
import { Link } from "@heroui/react";
import { Accordion } from "@heroui/react";
import { ChevronDown, Home, MonitorDot, User2Icon } from "lucide-react";

import { useUser, SignInButton } from "@clerk/nextjs";

const NavbarItems = [
    { id: 1, label: "হোম", href: "/", icon: <Home size={16} /> },
    { id: 2, label: "কোর্সসমূহ", href: "/courses", icon: <User2Icon size={16} /> },
    { id: 3, label: "স্টোর", href: "/store", icon: <MonitorDot size={16} /> },
    { id: 4, label: "যোগাযোগ", href: "/contact", icon: <MonitorDot size={16} /> },
];

function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const { user, isLoaded } = useUser()

    return (
        <div className="flex flex-col w-full h-fit fixed top-0 left-0 z-20">

            {/* Desktop Navbar */}
            <div className="w-full fixed border-b px-4 sm:px-6 md:px-12 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-950 h-[55px] flex items-center justify-between">

                {/* Logo and Menu */}
                <div className="flex items-center gap-4">
                    <Image
                        src="/logo2.png"
                        alt="Logo"
                        width={100}
                        height={40}
                        className="cursor-pointer"
                        onClick={() => window.location.href = "/"}
                    />

                    <div className="hidden md:flex gap-6 items-center">
                        {NavbarItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Section: Profile / Login */}
                <div className="flex items-center gap-4">

                    {isLoaded && user ? (
                        // Only Profile Image
                        <Image
                            src={user.imageUrl || "/default-avatar.png"}
                            width={40}
                            height={40}
                            alt="profile"
                            className="rounded-full border-2 border-red-500"
                        />
                    ) : (
                        // Login Button in Bengali
                        <SignInButton>
                            <Button size="sm" className="flex items-center gap-1 text-xs">
                                <User2Icon />
                                লগইন
                            </Button>
                        </SignInButton>
                    )}

                    {/* Hamburger for mobile */}
                    <div className="md:hidden">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="w-full fixed top-[55px] left-0 bg-gray-100 dark:bg-neutral-950 flex flex-col gap-4 py-4 md:hidden z-10 transition-all duration-300">
                    <Accordion className="w-full">
                        {NavbarItems.map((item, index) => (
                            <Accordion.Item key={index}>
                                <Accordion.Heading>
                                    <Accordion.Trigger className="flex items-center gap-2">
                                        {item.icon}
                                        {item.label}
                                        <Accordion.Indicator>
                                            <ChevronDown />
                                        </Accordion.Indicator>
                                    </Accordion.Trigger>
                                </Accordion.Heading>
                                <Accordion.Panel>
                                    <Accordion.Body>
                                        <Link href={item.href} className="block pl-6 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                                            {item.label}
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    {/* Mobile Login / Profile */}
                    <div className="flex justify-center mt-2">
                        {isLoaded && user ? (
                            <Image
                                src={user.imageUrl || "/default-avatar.png"}
                                width={40}
                                height={40}
                                alt="profile"
                                className="rounded-full border-2 border-red-500"
                            />
                        ) : (
                            <SignInButton>
                                <Button size="sm" className="text-xs">লগইন</Button>
                            </SignInButton>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Navbar
