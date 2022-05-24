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
  console.log(data);

  return {
    props: { post: data },
  };
};

const Details = ({ post }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={post.image} alt="" width="300px" />
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
