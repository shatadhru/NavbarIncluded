"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@heroui/react"
import {
  RxDashboard,
  RxPerson,
  RxGear,
  RxReader,
  RxQuestionMarkCircled,
  RxVideo,
  RxCheckCircled,
  RxHamburgerMenu,
  RxCross2
} from "react-icons/rx"

import DashboardNew from "./Dashboard"
import Loading from "./Loading"
import ProfileNew from "./Profile"

/* ---------------- CUSTOM COMPONENTS ---------------- */

const Dashboard = () => <DashboardNew />
const Classes = () => <div className="p-6">Classes Content</div>
const Profile = () => <ProfileNew />
const Settings = () => <div className="p-6">Settings Content</div>
const Exam = () => <div className="p-6">Exam Panel Content</div>
const Qna = () => <div className="p-6">Q & A Section Content</div>
const Doubt = () => <div className="p-6">Doubt Solve Center Content</div>
const Live = () => <div className="p-6">Live Classes Content</div>

/* ---------------- MENU DATA ---------------- */

const menuData = [
  { id: "dashboard", label: "ড্যাশবোর্ড", icon: RxDashboard, component: Dashboard },
  { id: "live", label: "লাইভ ক্লাস", icon: RxVideo, component: Live },
  { id: "classes", label: "ক্লাসসমূহ", icon: RxReader, component: Classes },
  { id: "exam", label: "পরীক্ষা", icon: RxCheckCircled, component: Exam },
  { id: "qna", label: "প্রশ্নোত্তর", icon: RxQuestionMarkCircled, component: Qna },
  { id: "doubt", label: "ডাউট সলভ", icon: RxPerson, component: Doubt },
  { id: "profile", label: "প্রোফাইল", icon: RxPerson, component: Profile },
  { id: "settings", label: "সেটিং", icon: RxGear, component: Settings },
]

/* ---------------- MAIN PAGE ---------------- */

export default function Page() {
  const [active, setActive] = useState(menuData[0])
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const ActiveComponent = active.component

  const Menu = ({ close }) => (
    <div className="mt-8 flex flex-col gap-2">
      {menuData.map(item => {
        const Icon = item.icon
        return (
          <Button
            key={item.id}
            onClick={() => {
              setLoading(true) // start loading
              setActive(item)
              close && setMobileOpen(false)
            }}
            variant={active.id === item.id ? "solid" : "secondary"}
            className={`w-full justify-start gap-2 ${active.id === item.id && "bg-accent text-white"
              }`}
          >
            <Icon size={18} />
            {item.label}
          </Button>
        )
      })}
    </div>
  )

  // Simulate loading effect whenever active changes
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 500) // 0.5s loading
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <div className="w-full pt-[55px]">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-[60px] right-5 z-50 bg-accent text-white p-2 rounded-lg"
      >
        <RxHamburgerMenu size={22} />
      </button>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed top-[55px] left-0 w-[240px] h-[calc(100vh-55px)] border-r p-4 bg-white animate-[slideIn_0.5s_ease-in-out] border-gray-200">
          <h1 className="font-bold text-xl text-accent">স্টুডেন্ট ড্যাশবোর্ড</h1>
          <p className="text-sm text-gray-500">আপনার কোর্স ম্যানেজ করুন</p>
          <Menu />
        </aside>

        {/* Mobile Sidebar */}
        <>
          <div
            onClick={() => setMobileOpen(false)}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          />
          <aside
            className={`fixed top-0 left-0 w-[240px] h-full bg-white z-50 p-4 transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-accent">Dashboard</h1>
              <RxCross2
                onClick={() => setMobileOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <Menu close />
          </aside>
        </>

        {/* Main Content */}
        <main className="md:ml-[240px] w-full p-2 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full">
            {loading ? <Loading /> : <ActiveComponent />}
          </div>
        </main>
      </div>
    </div>
  )
}
