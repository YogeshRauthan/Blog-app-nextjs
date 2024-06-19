import BlogOverview from "@/components/blog-overview";

async function fetchListOfBLogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

const Blogs = async () => {
  const blogList = await fetchListOfBLogs();
  console.log(blogList, "bloglist");

  return (
    <div>
      <BlogOverview blogList={blogList} />
    </div>
  );
};

export default Blogs;
