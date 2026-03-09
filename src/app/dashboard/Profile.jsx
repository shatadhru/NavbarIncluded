"use client"

import React, { useEffect } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"

function Profile() {
    const { user, isLoaded } = useUser()

    useEffect(() => {
        if (!isLoaded || !user) return

        const sendUserData = async () => {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    name: user.fullName,
                    email: user.primaryEmailAddress?.emailAddress,
                    phone: user.primaryPhoneNumber?.phoneNumber,
                    avatar: user.imageUrl
                })
            })

            const data = await res.json()
            console.log("SERVER USER:", data)
        }

        sendUserData()
    }, [isLoaded, user])

    if (!isLoaded) return null

    return (
        <div className="w-full h-full p-4">
            <h1 className="text-2xl font-bold text-accent mb-2">আপনার প্রোফাইল</h1>
            <p className="text-gray-500 mb-4">
                আপনার সকল তথ্য এখানে দেখুন। প্রয়োজন অনুযায়ী আপডেট করতে পারেন।
            </p>

            {/* Profile Image */}
            <div className="flex items-center gap-4 mb-6">
                <Image
                    src={user.imageUrl || "/default-avatar.png"}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-red-500"
                    alt="profile"
                />
                <div>
                    <h2 className="font-semibold text-lg">{user.fullName}</h2>
                    <p className="text-gray-500 text-sm">{user.primaryEmailAddress?.emailAddress}</p>
                    {user.primaryPhoneNumber && (
                        <p className="text-gray-500 text-sm">{user.primaryPhoneNumber?.phoneNumber}</p>
                    )}
                </div>
            </div>

            {/* User Info Fields */}
            <div className="space-y-3 mb-4">
                <div>
                    <label className="text-gray-700 font-medium">নাম:</label>
                    <p className="text-gray-900">{user.fullName}</p>
                </div>

                <div>
                    <label className="text-gray-700 font-medium">ইমেইল:</label>
                    <p className="text-gray-900">{user.primaryEmailAddress?.emailAddress}</p>
                </div>

                <div>
                    <label className="text-gray-700 font-medium">ফোন:</label>
                    <p className="text-gray-900">
                        {user.primaryPhoneNumber?.phoneNumber || "নথিভুক্ত নেই"}
                    </p>
                </div>

                <div>
                    <label className="text-gray-700 font-medium">ইউজার আইডি:</label>
                    <p className="text-gray-900">{user.id}</p>
                </div>

                <div>
                    <label className="text-gray-700 font-medium">অ্যাকাউন্ট তৈরি হয়েছে:</label>
                    <p className="text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                </div>
            </div>

            {/* Logout Button */}
            <SignOutButton>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                    লগ আউট
                </button>
            </SignOutButton>
        </div>
    )
}

export default Profile
