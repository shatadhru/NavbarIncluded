"use client"
import React, { useState } from "react"
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
import Image from "next/image"

/* ---------------- CONTENT ---------------- */

const Card = ({ title }) => (
  <div className="bg-black text-white rounded-xl p-6">
    {title}
  </div>
)

const Dashboard = () => <Card title="Dashboard" />
const Classes = () => <Card title="Classes" />
const Profile = () => <Card title="Profile" />
const Settings = () => <Card title="Settings" />
const Exam = () => <Card title="Exam Panel" />
const Qna = () => <Card title="Q & A Section" />
const Doubt = () => <Card title="Doubt Solve Center" />
const Live = () => <Card title="Live Classes" />

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

export default function Page() {

  const [active, setActive] = useState(menuData[0])
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

  return (
    <div className="w-full ">

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-[60px] left-3 z-50 bg-accent text-white p-2 rounded-lg"
      >
        <RxHamburgerMenu size={22} />
      </button>

      <div className="flex min-h-screen">

        {/* Desktop Sidebar */}
        <aside
          className="
            hidden md:block fixed  left-0 w-[240px]
            h-[calc(100vh-55px)] border-r p-4 bg-white
            animate-[slideIn_0.5s_ease-in-out] border-r border-gray-200
          "
        >

          <Image src="/logo2.png" width={100} height={50} alt="logo" className="mb-10 border-b border-gray-50" />
          <h1 className="font-bold text-xl text-accent">
            স্টুডেন্ট ড্যাশবোর্ড
          </h1>

          <p className="text-sm text-gray-500">
            আপনার কোর্স ম্যানেজ করুন
          </p>

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
            className={`
              fixed top-0 left-0 w-[240px] h-full bg-white z-50 p-4
              transition-transform duration-300 ease-in-out
              ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >

            <div className="flex justify-between items-center">
              <h1 className="font-bold text-accent">Dashboard</h1>
              <RxCross2 onClick={() => setMobileOpen(false)} />
            </div>

            <Menu close />

          </aside>
        </>

        {/* Main */}
        <main className="md:ml-[240px] w-full p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            <ActiveComponent />
          </div>

        </main>

      </div>

    </div>
  )
}
