import "./detailPage.scss";
import {
  CustomSlier,
  InfoMovie,
  ItemComment,
  TabsBooking,
} from "../../components";
import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieSevice } from "../../services/MovieService";
import { useSelector } from "react-redux";
import { showService } from "../../services/ShowService";
import { feedbackService } from "../../services/FeedbackService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
const DetailPage = () => {
  const [movie, setMovie] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState({});
  let { id } = useParams();
  const cinemaID = useSelector((state) => state.CinemaReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  let perPage = 2;
  const handleStarClick = (stars) => {
    setRating(stars);
    // Gửi đánh giá đến máy chủ ở đây
  };
  const { userEmail, userName } = useSelector(
    (state) => state.BookTicketReducer
  );
  const fetchMovieDetail = async () => {
    try {
      const result = await movieSevice.getDetailMovie(id);
      setMovie(result.data.data);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    }
  };
  const fetchShow = async () => {
    try {
      const showVm = {
        cinemaID: cinemaID.cinemaID,
        movieID: id,
      };
      const result = await showService.getListShowByMovie(showVm);
      setShow(result.data.data);
    } catch (error) {
      console.error("Error fetching show list:", error);
    }
  };
  const createFeedbacks = async () => {
    event.preventDefault();
    const feedbackVm = {
      content: content,
      rate: rating,
      movieID: id,
      userID: currentUser.userId,
    };
    console.log("feedbackVm", feedbackVm);
    try {
      const result = await feedbackService.createFeedback(feedbackVm);
      console.log("result", result);
      if (result.data.code == 200) {
        toast.success("Bình luận thành công");
      }
      fetchFeedbacks();
      setRating(0);
      setContent("");
    } catch (error) {
      if (error.response.data.status == 112) {
        toast.error("Bạn phải mua vé của phim này rồi mới bình luận được");
      }
    }
  };
  useEffect(() => {
    fetchMovieDetail();
    fetchShow();
  }, [id, cinemaID]);
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const fetchFeedbacks = async () => {
    try {
      const query = queryString.stringify({
        page: currentPage + 1,
        pageSize: perPage,
        movieID: id,
      });
      const result = await feedbackService.getFeedbacks(query);
      setFeedbacks(result.data.items);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected); // Lưu trữ trang hiện tại khi người dùng chuyển trang
  };

  useEffect(() => {
    fetchFeedbacks(); // Fetch phản hồi cho trang hiện tại khi component được tải hoặc currentPage thay đổi
  }, [currentPage, id, cinemaID]); // currentPage và id là dependencies của useEffect

  useEffect(() => {
    setCurrentPage(0); // Reset currentPage về 0 khi id thay đổi
  }, [id, cinemaID]); // id là dependency của useEffect này
  console.log("feedbacks", feedbacks);
  return (
    <>
      <Header />
      <div className="container-detail w-full">
        <div className="container-slider">
          <CustomSlier movie={movie} />
        </div>
        <InfoMovie movie={movie} />
        <TabsBooking show={show} />
        {/* Form comment */}
        <div className="rate-review max-w-[1120px] mx-auto">
          <h2 className="text-2xl font-semibold">Xếp hạng và đánh giá phim</h2>
          <form className="form-commment flex h-[100px]">
            <div className="score-star w-[163px] flex flex-col justify-center items-center">
              <strong>Xếp hạng</strong>
              <div className="stars flex ">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="star"
                    onClick={() => handleStarClick(star)}
                  >
                    {star <= rating ? <StarIcon /> : <StarBorderIcon />}
                  </span>
                ))}
              </div>
              <span>{rating} sao</span>
            </div>
            <div className="grow">
              <textarea
                className="h-[98px] w-full p-[10px] border-none outline-none"
                id="txtComment"
                title="Vui lòng viết đánh giá phim"
                cols="30"
                rows="10"
                value={content} // Gán giá trị từ state vào textarea
                onChange={handleContentChange} // Xử lý sự kiện thay đổi nội dung
              ></textarea>
            </div>
            <div className="w-[163px] relative">
              <button
                className="btn-send-comment w-full h-full"
                onClick={createFeedbacks}
              >
                Bình luận
              </button>
              <span className="score_etc absolute">0/220 Ký tự</span>
            </div>
          </form>
        </div>

        {/* List comment */}
        <div className="max-w-[1120px] mx-auto">
          {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <ItemComment key={feedback.feedbackID} feedback={feedback} />
            ))
          ) : (
            <p>Không có bình luận nào.</p>
          )}
        </div>
        <div className="mt-10 mb-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
