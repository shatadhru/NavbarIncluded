"use client"
import React, { useState } from 'react'
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image"
import { InputOTP, Link } from "@heroui/react";


function page() {

    const[isShown , setIsShown] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      

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

            <h1 className="text-base md:text-xl font-bold">Reset Your Password</h1>
            <p className="text-sm text-gray-500 mt-1">
                Enter your Email to reset your password
            </p>

          {/* {isShown ? (<div>
              <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                  <TextField
                      isRequired
                      name="email"
                      type="email"
                      validate={(value) => {
                          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                              return "Please enter a valid email address";
                          }
                          return null;
                      }}
                  >
                      <Label>Email</Label>
                      <Input placeholder="john@example.com" />
                      <FieldError />
                  </TextField>

                  <div className="flex items-center justify-center">
                      <Button type="submit">
                          Next
                          <ArrowRight />
                      </Button>

                  </div>
              </Form>


          </div>) : (
                  <div className="flex w-[280px] flex-col gap-2 mt-4">
                      <div className="flex flex-col gap-1">
                          <Label>Verify account</Label>
                          <p className="text-sm text-muted">We&apos;ve sent a code to a****@gmail.com</p>
                      </div>
                      <InputOTP maxLength={6}>
                          <InputOTP.Group>
                              <InputOTP.Slot index={0} />
                              <InputOTP.Slot index={1} />
                              <InputOTP.Slot index={2} />
                          </InputOTP.Group>
                          <InputOTP.Separator />
                          <InputOTP.Group>
                              <InputOTP.Slot index={3} />
                              <InputOTP.Slot index={4} />
                              <InputOTP.Slot index={5} />
                          </InputOTP.Group>
                      </InputOTP>
                      <div className="flex items-center gap-[5px] px-1 pt-1">
                          <p className="text-sm text-muted">Didn&apos;t receive a code?</p>
                          <Link className="text-foreground underline" href="#">
                              Resend
                          </Link>
                      </div>

                      <div className="flex items-center justify-center mt-4">
                          <Button type="submit">
                              Next
                              <ArrowRight />
                          </Button>

                      </div>
                  </div>
          )}
 */}




          
<div>
              <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                
                  <TextField
                      isRequired
                      minLength={8}
                      name="password"
                      type="password"
                      validate={(value) => {
                          if (value.length < 8) {
                              return "Password must be at least 8 characters";
                          }
                          if (!/[A-Z]/.test(value)) {
                              return "Password must contain at least one uppercase letter";
                          }
                          if (!/[0-9]/.test(value)) {
                              return "Password must contain at least one number";
                          }
                          return null;
                      }}
                  >
                      <Label>Password</Label>
                      <Input placeholder="Enter your password" />
                      <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                      <FieldError />
                  </TextField>
                
                  <TextField
                      isRequired
                      minLength={8}
                      name="confirm_password"
                      type="confirm_password"
                      validate={(value) => {
                          if (value.length < 8) {
                              return "Password must be at least 8 characters";
                          }
                          if (!/[A-Z]/.test(value)) {
                              return "Password must contain at least one uppercase letter";
                          }
                          if (!/[0-9]/.test(value)) {
                              return "Password must contain at least one number";
                          }
                          return null;
                      }}
                  >
                      <Label>Password</Label>
                      <Input placeholder="Enter your password" />
                      <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                      <FieldError />
                  </TextField>
                  <div className="flex gap-2">
                      <Button type="submit">
                          <Check />
                          Reset Password
                      </Button>
                   
                  </div>
              </Form>
</div>









    </div>
  )
}

export default page
