import connectDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog-model";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogByID = searchParams.get("id");

    if (!getCurrentBlogByID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const { title, description } = await req.json();

    const { error } = EditBlog.validate({ title, description });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogByID = await Blog.findOneAndUpdate(
      {
        _id: getCurrentBlogByID,
      },
      { title, description },
      { new: true }
    );

    if (updateBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "SOmething went wrong! Try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "SOmething went wrong! Try again later.",
    });
  }
}
