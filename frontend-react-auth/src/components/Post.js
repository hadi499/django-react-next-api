import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Link } from "react-router-dom";

const Post = () => {
  //   useEffect(() => {
  //     fetchItems();
  //   }, []);
  //   const [posts, setPosts] = useState([]);
  //   const fetchItems = async () => {
  //     const data = await fetch("http://127.0.0.1:8000/api/");
  //     const posts = await data.json();
  //     // console.log(posts);
  //     setPosts(posts);
  //   };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/api/`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
    setPosts([...posts]);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {posts.map((post) => (
            <div className="text-center" key={post.id}>
              <Link to={{ pathname: `post/${post.slug}` }}>
                <img src={post.image} alt="" width="300px" />
              </Link>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
