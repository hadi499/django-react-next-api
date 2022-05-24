import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/");
  const data = await res.json();
  console.log(data);

  // map data to an array of path objects with params (id)
  const paths = data.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const res = await fetch("http://127.0.0.1:8000/api/post/" + slug + "/");
  const data = await res.json();

  return {
    props: { post: data },
  };
};
const Edit = ({ post }) => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const changeOnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("slug", title);
    formData.append("author", 1);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", image);
    axios
      .put(`http://127.0.0.1:8000/api/edit/${post.id}/`, formData)
      .catch((err) => console.log(err));
    router.push("/");
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/post/${post.slug}/`)
      .then((res) => [
        setTitle(res.data.title),
        setExcerpt(res.data.excerpt),
        setContent(res.data.content),
        setImage(res.data.image),
        setId(res.data.id),
      ])
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <h3>Edit Article</h3>
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
                value={title}
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
                value={excerpt}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <p>
                <span>curently: </span> {post.image.substring(22)}
              </p>
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
export default Edit;
