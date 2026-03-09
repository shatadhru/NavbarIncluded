import { connectDB } from "../../../lib/mongodb";
import Category from "../../../models/Category";
import Course from "../../../models/Course";

export async function GET(req) {
  await connectDB();

  // Fetch categories and attach live course count from Course collection
  const categories = await Category.find().sort({ createdAt: -1 });

  const enriched = await Promise.all(
    categories.map(async (cat) => {
      const courseCount = await Course.countDocuments({ categories: cat.slug });
      return { ...cat.toObject(), courseCount };
    })
  );

  return new Response(JSON.stringify(enriched), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // Auto-generate slug from name if not provided
  if (!body.slug) {
    body.slug = body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  const existing = await Category.findOne({ slug: body.slug });
  if (existing) {
    return new Response(
      JSON.stringify({ message: "Slug already exists. Please use a unique slug." }),
      { status: 409 }
    );
  }

  const newCategory = new Category(body);
  await newCategory.save();
  return new Response(JSON.stringify(newCategory), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...updates } = await req.json();

  // Check slug uniqueness if slug is being updated
  if (updates.slug) {
    const conflict = await Category.findOne({ slug: updates.slug, _id: { $ne: id } });
    if (conflict) {
      return new Response(
        JSON.stringify({ message: "Slug already taken by another category." }),
        { status: 409 }
      );
    }
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return new Response(JSON.stringify({ message: "Category not found" }), { status: 404 });
  }

  // Re-attach course count
  const courseCount = await Course.countDocuments({ categories: updated.slug });
  return new Response(JSON.stringify({ ...updated.toObject(), courseCount }), { status: 200 });
}

export async function DELETE(req) {
  await connectDB();
  const { ids } = await req.json();
  await Category.deleteMany({ _id: { $in: ids } });
  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
