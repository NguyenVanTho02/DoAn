import "./itemComment.scss";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const ItemComment = ({ feedback }) => {
  const date = new Date(feedback.dateFeedback);
  // Format date to display only the date part (without time)
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  // Round rate to the nearest integer
  const roundedRate = Math.round(feedback.rate);
  // Create an array with length equal to roundedRate
  const starsArray = [...Array(roundedRate)];
  return (
    <div className="item-comment">
      <div className="item-box">
        <div className="item-box-top flex">
          <strong>Khách</strong>
          <div className="stars-core flex">
            {/* Render filled stars */}
            {starsArray.map((_, index) => (
              <StarIcon key={index} className="item-star" />
            ))}
            {/* Render empty stars for the remaining */}
            {[...Array(5 - roundedRate)].map((_, index) => (
              <StarBorderIcon key={index + roundedRate} className="item-star" />
            ))}
          </div>
          <span>{feedback.rate}</span>
        </div>
        <p className="content-cmt">{feedback?.content}</p>
        <p className="date-up">{formattedDate}</p>
      </div>
      <div className="name-acc">{feedback.userName}</div>
    </div>
  );
};

export default ItemComment;
