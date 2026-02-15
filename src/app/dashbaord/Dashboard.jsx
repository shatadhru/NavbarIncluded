import { Card } from "@heroui/react";
import React from "react";
import { RxReader, RxVideo, RxCheckCircled } from "react-icons/rx";
import CourseCard from "./CourseCard"; // আগের 16:9 card component

function DashboardNew() {
    // Data set
    const stats = [
        { id: 1, name: "সর্বমোট কোর্স", value: 24, icon: RxReader },
        { id: 2, name: "একটিভ কোর্স", value: 8, icon: RxVideo },
        { id: 3, name: "কমপ্লিটেড কোর্স", value: 16, icon: RxCheckCircled },
    ];
    // Example courses
    const courses = [
        {
            id: 1,
            title: "গনিত কোর্স 101",
            description: "এই কোর্সে আপনি বাংলা ব্যাকরণ ও রচনা শিখবেন।",
            image: "https://utmeducation.com/wp-content/uploads/2026/02/SSC-27-%E0%A6%AC%E0%A7%87%E0%A6%B8%E0%A6%BF%E0%A6%95-%E0%A6%9F%E0%A7%81-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%BF%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%AE-%E0%A6%95%E0%A7%8B%E0%A6%B0%E0%A7%8D%E0%A6%B8-chemistry.png",
            icon: RxReader,
        },
        {
            id: 2,
            title: "গণিত কোর্স",
            description: "বেসিক থেকে অ্যাডভান্সড গণিত শিখুন।",
            image: "https://utmeducation.com/wp-content/uploads/2026/02/SSC-27-%E0%A6%AC%E0%A7%87%E0%A6%B8%E0%A6%BF%E0%A6%95-%E0%A6%9F%E0%A7%81-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%BF%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%AE-%E0%A6%95%E0%A7%8B%E0%A6%B0%E0%A7%8D%E0%A6%B8-Physics-1024x576.png",
            icon: RxVideo,
        },
        {
            id: 3,
            title: "ফিজিক্স ক্লাস",
            description: "হাইস্কুল স্তরের ফিজিক্স ক্লাস।",
            image: "https://utmeducation.com/wp-content/uploads/2026/02/SSC-27-%E0%A6%AC%E0%A7%87%E0%A6%B8%E0%A6%BF%E0%A6%95-%E0%A6%9F%E0%A7%81-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%BF%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%AE-%E0%A6%95%E0%A7%8B%E0%A6%B0%E0%A7%8D%E0%A6%B8-math.png",
            icon: RxCheckCircled,
        },
    ];

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold text-accent mb-2">ড্যাশবোর্ড</h1>
            <p className="text-gray-600 mb-6">
                আপনার সকল কোর্স ও লাইভ ক্লাস ম্যানেজ করুন।
            </p>

            {/* Flex container fixed */}
            <div className="flex flex-col md:flex-row gap-6">
                {stats.map((item) => {
                    const Icon = item.icon; // icon সেট করা
                    return (
                        <Card
                            key={item.id}
                            className="w-full md:w-[300px] p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                                    <Icon size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-sm">{item.name}</p>
                                    <p className="text-lg font-bold">{item.value}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        


        <div className="mt-10">
                <h1 className="text-xl font-bold text-accent mb-2">আপনার রিসেন্ট কোর্সসমূহ</h1>
                <p className="text-gray-600 mb-6">
আপনার সব ভর্তি কোর্স এবং ক্লাস শুরু করতে ‘শুরু করুন’ বাটনে ক্লিক করুন।                </p>
        
                <div className="flex flex-col gap-6">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            image={course.image}
                            title={course.title}
                            description={course.description}
                            buttonText="শুরু করুন"
                            onClick={() => alert(`${course.title} শুরু হচ্ছে!`)}
                        />
                    ))}
                </div>

        </div>


        </div>
    );
}

export default DashboardNew;
