import { useState, useEffect } from "react";
import { Input, Modal, Upload, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { postService } from "../../../services/PostService";
import { applicationUserService } from "../../../services/ApplicationUserService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AddTextEditor from "./AddTextEditor";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const PostAddNew = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [filePoster, setFilePoster] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");

  const [infoUser, setInfoUser] = useState();
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const userName = currentUser && currentUser.userName;

  const getInfoUser = (value) => {
    applicationUserService.getUserByUserName(value).then((result) => {
      setInfoUser(result.data);
    });
  };

  useEffect(() => {
    getInfoUser(userName);
  }, [userName]);

  const handleValueText = (value) => {
    setEditorHtml(value);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChangePoster = ({ fileList: newFileList }) =>
    setFilePoster(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleAddPost = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      const postVm = {
        title: values.title,
        content: editorHtml,
        userID: infoUser?.id,
      };

      filePoster.forEach((file) => {
        formData.append("filePoster", file.originFileObj);
      });
      formData.append("datajson", JSON.stringify(postVm));

      postService
        .createPost(formData)
        .then(() => {
          toast.success("Thêm thành công", { autoClose: 1000 });
          form.resetFields();
          setEditorHtml("");
          setFilePoster([]);
        })
        .catch(() => {
          toast.error("Thêm không thành công", { autoClose: 1000 });
        });
    });
  };

  return (
    <>
      <Modal
        title="Thêm bài viết mới"
        open={isOpen}
        onCancel={onClose}
        width={1000}
        cancelText="Hủy"
        okText="Thêm"
        okType="default"
        onOk={handleAddPost}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item
            label="Tiêu đề bài viết"
            name="title"
            rules={[
              {
                required: true,
                message: "Hãy nhập tiêu đề bài viết!",
              },
            ]}
          >
            <Input name="title" placeholder="Tiêu đề bài viết" />
          </Form.Item>

          <Form.Item label="Poster" name="poster">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChangePoster}
              fileList={filePoster}
            >
              {uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>

          <Form.Item label="Nội dung" name="content">
            <AddTextEditor
              handleValueText={handleValueText}
              editorHtmlProp={editorHtml}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
PostAddNew.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default PostAddNew;
