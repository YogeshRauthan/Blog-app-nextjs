"use client";

import { useState } from "react";
import Add from "../add-new-blog";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const initialBlogFormData = {
  title: "",
  description: "",
};

export default function BlogOverview({ blogList }) {
  const [openBlogDialoge, setOpenBlogDialoge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditBlogId, setCurrentEditBlogId] = useState(null);

  const router = useRouter();

  async function handleSaveBlogData() {
    try {
      setLoading(true); // Set loading state to true before API call
      const apiResponse =
        currentEditBlogId !== null
          ? await fetch(`/api/update-blog?id=${currentEditBlogId}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });

      if (!apiResponse.ok) {
        throw new Error("Failed to save blog data"); // Throw error if response is not OK
      }

      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialBlogFormData); // Reset form data after successful save
        setOpenBlogDialoge(false);
        setLoading(false);
        setCurrentEditBlogId(null);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.error(error); // Log error to console
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  }

  console.log(blogFormData);

  async function handleDeleteBlogByID(getCurrenID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrenID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(getCurrentBlog) {
    setCurrentEditBlogId(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialoge(true);
  }
  console.log(currentEditBlogId);

  return (
    <div className=" min-h-screen p-5 flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-500">
      <Add
        openBlogDialoge={openBlogDialoge}
        setOpenBlogDialoge={setOpenBlogDialoge}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditBlogId={currentEditBlogId}
        setCurrentEditBlogId={setCurrentEditBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
        {blogList && blogList.length > 0 ? (
          blogList.map((item) => (
            <Card className="pt-2" key={item._id}>
              <CardContent>
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardDescription className="my-2">
                  {item.description}
                </CardDescription>
                <div className=" pt-4 flex gap-5">
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogByID(item._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-bold">
            No Blog found! Please add one.
          </Label>
        )}
      </div>
    </div>
  );
}
