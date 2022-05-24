import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

const Edit = (props) => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const history = useHistory();

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
    axiosInstance
      .put(`http://127.0.0.1:8000/api/edit/${id}/`, formData)
      .catch((err) => console.log(err));
    history.push("/");
  };
  useEffect(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/api/post/${props.match.params.slug}/`)
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
    <div className="container">
      <div className="row">
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
                value={title}
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
                value={excerpt}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={content}
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
export default Edit;
