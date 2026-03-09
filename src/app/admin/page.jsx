"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@heroui/react"

import DashboardNew from "./Dashboard"
import Loading from "./Loading"
import ProfileNew from "./Profile"

import {
  RxBarChart,
  RxBell,
  RxChatBubble,
  RxCheckCircled,
  RxClock,
  RxCross1,
  RxDashboard,
  RxEnvelopeClosed,
  RxFileText,
  RxGear,
  RxHamburgerMenu,
  RxLayers,
  RxLockOpen2,
  RxPerson,
  RxQuestionMarkCircled,
  RxReader,
  RxSpeakerLoud,
  RxVideo
} from "react-icons/rx"

import { CreditCard, Ticket } from "lucide-react"
import CourseManage from "./CourseManage"
import Category from "./Category"

/* ================== COMPONENTS ================== */

const Dashboard = () => <DashboardNew />
const Analytics = () => <div className="p-6">Analytics Content</div>
const Students = () => <div className="p-6">Students Management</div>
const Teachers = () => <div className="p-6">Teachers Management</div>
const Courses = () => <CourseManage />
const Categories = () => <Category />
const Live = () => <div className="p-6">Live Classes Content</div>
const Recorded = () => <div className="p-6">Recorded Classes Content</div>
const Exam = () => <div className="p-6">Exam Panel Content</div>
const Questions = () => <div className="p-6">Question Bank Content</div>
const Results = () => <div className="p-6">Exam Results Content</div>
const Assignments = () => <div className="p-6">Assignments Content</div>
const Qna = () => <div className="p-6">Q & A Section Content</div>
const Doubt = () => <div className="p-6">Doubt Solve Center Content</div>
const Payments = () => <div className="p-6">Payments Panel</div>
const Subscriptions = () => <div className="p-6">Subscriptions Panel</div>
const Coupons = () => <div className="p-6">Coupons Panel</div>
const Notices = () => <div className="p-6">Notice Board</div>
const Announcements = () => <div className="p-6">Announcements</div>
const Messages = () => <div className="p-6">Messages Center</div>
const Reports = () => <div className="p-6">Reports Panel</div>
const Logs = () => <div className="p-6">Activity Logs</div>
const Admins = () => <div className="p-6">Admins Management</div>
const Roles = () => <div className="p-6">Roles Management</div>
const Permissions = () => <div className="p-6">Permissions Management</div>
const Profile = () => <ProfileNew />
const Settings = () => <div className="p-6">Settings Content</div>

/* ================ MENU DATA ================ */

const menuData = [
  { id: "dashboard", label: "ড্যাশবোর্ড", icon: RxDashboard, component: Dashboard },
  { id: "analytics", label: "এনালিটিক্স", icon: RxBarChart, component: Analytics },
  { id: "students", label: "স্টুডেন্ট ম্যানেজ", icon: RxPerson, component: Students },
  { id: "teachers", label: "শিক্ষক ম্যানেজ", icon: RxPerson, component: Teachers },
  { id: "courses", label: "কোর্স ম্যানেজ", icon: RxReader, component: Courses },
  { id: "categories", label: "ক্যাটাগরি", icon: RxLayers, component: Categories },
  { id: "live", label: "লাইভ ক্লাস", icon: RxVideo, component: Live },
  { id: "recorded", label: "রেকর্ডেড ক্লাস", icon: RxVideo, component: Recorded },
  { id: "exam", label: "পরীক্ষা", icon: RxCheckCircled, component: Exam },
  { id: "questions", label: "প্রশ্ন ব্যাংক", icon: RxQuestionMarkCircled, component: Questions },
  { id: "results", label: "রেজাল্ট", icon: RxBarChart, component: Results },
  { id: "assignments", label: "অ্যাসাইনমেন্ট", icon: RxReader, component: Assignments },
  { id: "qna", label: "প্রশ্নোত্তর", icon: RxQuestionMarkCircled, component: Qna },
  { id: "doubt", label: "ডাউট সলভ", icon: RxChatBubble, component: Doubt },
  { id: "payments", label: "পেমেন্ট", icon: CreditCard, component: Payments },
  { id: "subscriptions", label: "সাবস্ক্রিপশন", icon: CreditCard, component: Subscriptions },
  { id: "coupons", label: "কুপন", icon: Ticket, component: Coupons },
  { id: "notices", label: "নোটিশ", icon: RxBell, component: Notices },
  { id: "announcements", label: "ঘোষণা", icon: RxSpeakerLoud, component: Announcements },
  { id: "messages", label: "মেসেজ", icon: RxEnvelopeClosed, component: Messages },
  { id: "reports", label: "রিপোর্ট", icon: RxFileText, component: Reports },
  { id: "logs", label: "অ্যাক্টিভিটি লগ", icon: RxClock, component: Logs },
  { id: "admins", label: "অ্যাডমিন ম্যানেজ", icon: RxPerson, component: Admins },
  { id: "roles", label: "রোল ম্যানেজ", icon: RxClock, component: Roles },
  { id: "permissions", label: "পারমিশন", icon: RxLockOpen2, component: Permissions },
  { id: "profile", label: "প্রোফাইল", icon: RxPerson, component: Profile },
  { id: "settings", label: "সেটিং", icon: RxGear, component: Settings },
]

/* ================ MAIN PAGE ================ */

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
              setLoading(true)
              setActive(item)
              close && setMobileOpen(false)
            }}
            variant={active.id === item.id ? "solid" : "secondary"}
            className={`w-full justify-start gap-2 ${active.id === item.id && "bg-accent text-white"}`}
          >
            <Icon size={18} />
            {item.label}
          </Button>
        )
      })}
    </div>
  )

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 500)
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
        <aside className="hidden md:block fixed top-[55px] left-0 w-[240px] h-[calc(100vh-55px)] border-r bg-white p-4 overflow-y-auto">
          <h1 className="font-bold text-xl text-accent"> এডমিন ড্যাশবোর্ড</h1>
          <p className="text-sm text-gray-500">আপনার এল এম এস সিস্টেম ম্যানেজ করুন</p>
          <Menu />
        </aside>

        {/* Mobile Sidebar */}
        <>
          <div
            onClick={() => setMobileOpen(false)}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />
          <aside
            className={`fixed top-0 left-0 w-[240px] h-full bg-white z-50 p-4 transition-transform duration-300 ease-in-out overflow-y-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-accent">Dashboard</h1>
              <RxCross1 onClick={() => setMobileOpen(false)} className="cursor-pointer" />
            </div>
            <Menu close />
          </aside>
        </>

        {/* Main Content */}
        <main className="md:ml-[240px] w-full p-2 md:p-6">
          <div className="grid gap-6 w-full">
            {loading ? <Loading /> : <ActiveComponent />}
          </div>
        </main>
      </div>
    </div>
  )
}