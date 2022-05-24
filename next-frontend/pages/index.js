import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/");
  const data = await res.json();

  return {
    props: { posts: data },
  };
};

export default function Home({ posts }) {
  const router = useRouter();
  const deletePost = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
    alert("anda yakin");
    router.push("/");
  };
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-md-8 text-center ">
          <div className="d-flex flex-wrap">
            {posts.map((post) => (
              <div className="card" key={post.id}>
                <Link href={"post/" + post.slug + "/"}>
                  <img src={post.image} alt="" width="300px" />
                </Link>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={"edit/" + post.slug + "/"}>
                  <button className="btn btn-outline-primary">edit</button>
                </Link>

                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={() => deletePost(post.id)}
                >
                  hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
