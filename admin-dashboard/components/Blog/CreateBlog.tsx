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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("New Blog Created:", blog);
        // Here you can send `blog` data to an API or state management
        setBlog({ title: "", content: "" }); // Reset form after submission
    };

    return (
        <div id="create_blog_section" className="section">
            <h3>Create Blog</h3>
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
                <button type="submit">Add Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;
