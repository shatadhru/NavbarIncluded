"use client";

import React from "react";
import Image from "next/image";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { Check } from "lucide-react";

export default function Page() {

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
    };

    return (
        <div className="w-full h-screen px-4 pt-[55px] flex flex-col items-center justify-center">

            {/* Logo */}
            <div className="w-10 mb-3">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="border border-gray-800 rounded-full cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />
            </div>

            <h1 className="text-base md:text-xl font-bold">Student Login</h1>
            <p className="text-sm text-gray-500 mt-1">
                Enter your mobile & password to login
            </p>

            <Form
                className="flex w-full max-w-sm flex-col gap-4 mt-6"
                onSubmit={onSubmit}
            >

                {/* Mobile */}
                <TextField
                    isRequired
                    name="mobile"
                    type="tel"
                    validate={(value) => {
                        if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(value)) {
                            return "Please enter a valid mobile number";
                        }
                        return null;
                    }}
                >
                    <Label>Mobile Number</Label>
                    <Input placeholder="+8801XXXXXXXXX" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) return "Minimum 8 characters required";
                        if (!/[A-Z]/.test(value)) return "Must contain one uppercase letter";
                        if (!/[0-9]/.test(value)) return "Must contain one number";
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>
                        At least 8 chars, 1 uppercase & 1 number
                    </Description>
                    <FieldError />
                </TextField>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                    <Button type="submit" className="flex-1">
                        <Check size={16} />
                        Login
                    </Button>

                    <Button type="reset" variant="secondary" className="flex-1">
                        Reset
                    </Button>
                </div>

            </Form>

        </div>
    );
}
