import connectDB from "@/database"
import Blog from "@/models/blog-model";
import { NextResponse } from "next/server"


export async function GET() {
    try {

        await connectDB();
        const extractAllBLogsFromDB = await Blog.find({});

        return NextResponse.json({
            success: true,
            data: extractAllBLogsFromDB,
        }, {
            status: 200,
        });
        
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error. Please try again later.",
        }, {
            status: 500,
        });
    }
}