import React, { useEffect, useState } from "react";
import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import { Link } from "react-router-dom";
import { postService } from "../../services/PostService";
import { HOST } from "../../constrants/config";

const News = () => {
  const [listPost, setListPost] = useState([]);

  const getLatestPost = () => {
    postService.getLatestPost().then((result) => {
      console.log(result.data);
      setListPost(result.data);
    });
  };

  useEffect(() => {
    getLatestPost();
  }, []);

  const changeUrl = (urlOrigin) => {
    return `${HOST + urlOrigin}`;
  };

  return (
    <div className="mt-[120px]">
      <Header />
      <div className="max-w-[1120px] mx-auto mb-[50px]">
        <h1 className="text-[30px] mb-10 uppercase">Tin tức mới</h1>
        <div className="grid grid-cols-4 gap-4 ">
          {/* Layout 2 - 1 - 1 */}
          <Link
            className="col-span-2"
            to={`/detail-post/${listPost[0]?.postID}`}
          >
            <img
              src={changeUrl(listPost[0]?.imagePoster)}
              alt=""
              className="w-full  object-container rounded-t-lg"
            />
            <p className="py-[15px] block text-[22px] font-bold hover:underline">
              {listPost[0]?.title}
            </p>
          </Link>
          <Link to={`/detail-post/${listPost[1]?.postID}`}>
            <img
              src={changeUrl(listPost[1]?.imagePoster)}
              alt=""
              className="w-full h-[204px] object-container rounded-t-lg"
            />
            <p className="font-bold hover:underline block m-[15px] p-0">
              {listPost[1]?.title}
            </p>
          </Link>
          <Link to={`/detail-post/${listPost[2]?.postID}`}>
            <img
              src={changeUrl(listPost[2]?.imagePoster)}
              alt=""
              className="w-full h-[204px] object-container rounded-t-lg"
            />
            <p className="font-bold hover:underline block m-[15px] p-0">
              {listPost[2]?.title}
            </p>
          </Link>

          {/* Layout 1 - 1 - 1 - 1 */}
          {listPost?.slice(3).map((item, index) => (
            <Link className="" key={index} to={`/detail-post/${item.postID}`}>
              <img
                src={changeUrl(item.imagePoster)}
                alt=""
                className="w-full h-[204px] object-container rounded-t-lg"
              />
              <p className="font-bold hover:underline block m-[15px] p-0">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
