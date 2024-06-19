"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Add({
  openBlogDialoge,
  setOpenBlogDialoge,
  loading,
  setLoading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  currentEditBlogId,
  setCurrentEditBlogId,
}) {
  return (
    <Fragment>
      <div>
        <Button onClick={() => setOpenBlogDialoge(true)}>Add New Blog</Button>
      </div>
      <Dialog
        open={openBlogDialoge}
        onOpenChange={() => {
          setOpenBlogDialoge(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setCurrentEditBlogId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditBlogId ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter Blog Title"
                value={blogFormData.title}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                value={blogFormData.description}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: event.target.value,
                  })
                }
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveBlogData}>
              {loading ? "Saving Changes" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
