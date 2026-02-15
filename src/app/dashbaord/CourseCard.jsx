import { Button } from "@heroui/react";
import React from "react";

function CourseCard({ image, title, description, buttonText, onClick }) {
    return (
        <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">

            {/* Image Section */}
            <div className="w-full md:w-1/3 flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover aspect-video"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
                <div className="flex gap-4 mt-4">
                    <Button
                        onPress={onClick}
                        className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                    >
                        {buttonText}
                    </Button>
                    <Button
                        onPress={onClick}
                        variant="secondary"
                        className="  px-4 py-2 rounded-lg  transition-colors"
                    >
                        ফেসবুক গ্রুপে যুক্ত হউন
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
