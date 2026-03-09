import { connectDB } from "../../../lib/mongodb";
import Course from "../../../models/Course";

export async function GET(req) {
  await connectDB();
  const courses = await Course.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(courses), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newCourse = new Course(body);
  await newCourse.save();
  return new Response(JSON.stringify(newCourse), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...updates } = await req.json();
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );
  if (!updatedCourse) {
    return new Response(JSON.stringify({ message: "Course not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(updatedCourse), { status: 200 });
}

export async function DELETE(req) {
  await connectDB();
  const { ids } = await req.json();
  await Course.deleteMany({ _id: { $in: ids } });
  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}