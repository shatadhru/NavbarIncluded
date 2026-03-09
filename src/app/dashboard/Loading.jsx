"use client"
import { Spinner } from "@heroui/react"
import Image from "next/image"
import React from "react"

function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center  z-50">
            <Spinner color="accent" size={48} className="mb-4" />
            <div className="animate-pulse">
                <Image src="/logo2.png" alt="Logo" height={60} width={60} />
            </div>
        </div>
    )
}

export default Loading
