import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  // function slugify(string) {
  //   const a =
  //     "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  //   const b =
  //     "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  //   const p = new RegExp(a.split("").join("|"), "g");

  //   return string
  //     .toString()
  //     .toLowerCase()
  //     .replace(/\s+/g, "-") // Replace spaces with -
  //     .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
  //     .replace(/&/g, "-and-") // Replace & with 'and'
  //     .replace(/[^\w\-]+/g, "") // Remove all non-word characters
  //     .replace(/\-\-+/g, "-") // Replace multiple - with single -
  //     .replace(/^-+/, "") // Trim - from start of text
  //     .replace(/-+$/, ""); // Trim - from end of text
  // }
  //

  const history = useHistory();
  const initialFormData = Object.freeze({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [postData, updateFormData] = useState(initialFormData);
  const [postimage, setPostImage] = useState(null);

  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      setPostImage({
        image: e.target.files,
      });
      console.log(e.target.files);
    }
    if ([e.target.name] == "title") {
      updateFormData({
        ...postData,
        [e.target.name]: e.target.value.trim(),
        ["slug"]: e.target.value.trim(),
      });
    } else {
      updateFormData({
        ...postData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", postData.title);
    formData.append("slug", postData.slug);
    formData.append("author", 1);
    formData.append("excerpt", postData.excerpt);
    formData.append("content", postData.content);
    formData.append("image", postimage.image[0]);
    axios.post(`http://127.0.0.1:8000/api/create/`, formData);
    history.push({
      pathname: "/",
    });
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Form Create</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                onChange={handleChange}
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
                onChange={handleChange}
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
                value={postData.slug}
                onChange={handleChange}
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
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleChange}
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

export default Create;
