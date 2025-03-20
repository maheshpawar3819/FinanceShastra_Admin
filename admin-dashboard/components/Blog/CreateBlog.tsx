import React, { useState } from "react";
import "./CreateBlog.css";

interface Blog {
    title: string;
    content: string;
}

const CreateBlog: React.FC = () => {
    const [blog, setBlog] = useState<Blog>({
        title: "",
        content: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/blogs/createblog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blog)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create blog");
            }

            console.log("New Blog Created:", data.message);
            setBlog({ title: "", content: "" }); // Reset form after submission
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="create_blog_section" className="section">
            <h3>Create Blog</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Blog Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    value={blog.title}
                    onChange={handleChange}
                    required
                />
                <br />
                <label htmlFor="content">Blog Content:</label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Write your blog content..."
                    rows={5}
                    value={blog.content}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Blog"}
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
