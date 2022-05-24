import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Single = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  const deletePost = (id) => {
    axiosInstance.delete(`http://127.0.0.1:8000/api/delete/${id}`);

    history.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/api/post/${props.match.params.slug}/`)
      .then((res) => [
        setTitle(res.data.title),
        setContent(res.data.content),
        setImage(res.data.image),
        setId(res.data.id),
      ])
      .catch((err) => console.log(err));
  }, [props]);
  return (
    <div className="container text-center mt-3">
      <img src={image} alt="" width="200px" />
      <h3>{title}</h3>
      <p>{content}</p>

      <button className="btn btn-outline-danger" onClick={() => deletePost(id)}>
        delete
      </button>
      <button className="btn btn-outline-success">
        <Link to={`/edit/${title}`}>edit</Link>
      </button>
    </div>
  );
};

export default Single;
