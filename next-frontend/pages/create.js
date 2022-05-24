import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddPost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const changeOnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author", 1);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", image);

    axios
      .post(`http://127.0.0.1:8000/api/create/`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    router.push("/");
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3>Add Article</h3>
          <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="excerpt" className="form-label">
                Excerpt
              </label>
              <input
                type="text"
                className="form-control"
                id="excerpt"
                name="excerpt"
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">
                Slug
              </label>
              <input
                className="form-control"
                id="slug"
                name="slug"
                onChange={(e) => setSlug(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                content
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="file"
                filename="image"
                className="form-control"
                id="file"
                name="image"
                onChange={onChangeFile}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
