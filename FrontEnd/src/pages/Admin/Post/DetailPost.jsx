import React from "react";
import { Modal } from "antd";
import { HOST } from "../../../constrants/config";

const DetailPost = ({ isOpen, onClose, record }) => {
  const srcImagePoster = `${HOST + record.imagePoster}`;
  return (
    <>
      <Modal
        title={`Xem chi tiết bài viết`}
        open={isOpen}
        onCancel={onClose}
        width={1000}
      >
        <p className="text-[24px] mb-5">{record.title}</p>
        {/* <img src={srcImagePoster} alt="" /> */}

        <div
          className="mt-[20px] pt-[20px] border-t-2 "
          dangerouslySetInnerHTML={{ __html: record.content }}
        ></div>
      </Modal>
    </>
  );
};

export default DetailPost;
