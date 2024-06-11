import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import { postService } from "../../services/PostService";

const DetailPost = () => {
  const [detailPost, setDetailPost] = useState();
  let { id } = useParams();

  const fetchDetailPost = async () => {
    try {
      const result = await postService.getPostByID(id);
      setDetailPost(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailPost();
  }, [id]);

  return (
    <>
      <Header />
      <div className=" max-w-[1120px] mx-auto mt-[130px] mb-[40px]">
        <h1 className="uppercase text-[25px]">{detailPost?.title}</h1>
        <div
          className="mt-[20px] pt-[20px] border-t-2 "
          dangerouslySetInnerHTML={{ __html: detailPost?.content }}
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPost;
