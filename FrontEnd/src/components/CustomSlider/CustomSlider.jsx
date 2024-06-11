import { useRef } from "react";
import "./customSlider.scss";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PropTypes from "prop-types";
import { HOST } from "../../constrants/config";

const CustomSlide = (props) => {
  const { index, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <img
        src={props.urlImage}
        alt=""
        style={{
          width: "100%",
          height: "470px",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#CECECE",
        fontSize: "50px",
        right: "-60px",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#CECECE",
        fontSize: "50px",
        left: "-60px",
      }}
      onClick={onClick}
    />
  );
};

const CustomSlider = ({ movie }) => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const imageArr = movie.images ? movie.images.split(";").filter(Boolean) : [];
  if (imageArr.length > 0) {
    for (let i = 0; i < imageArr.length; i++) {
      imageArr[i] = HOST + imageArr[i];
    }
  }
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    customPaging: (index) => (
      <a href="">
        <img src={imageArr[index]} alt="" />
      </a>
    ),
  };

  return (
    <div className="slider-container max-w-[1120px] mx-auto pt-10">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {imageArr.map((item, index) => (
          <CustomSlide key={item} index={index} urlImage={item} />
        ))}
      </Slider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "40px",
        }}
      >
        <button className="button-prev" onClick={previous}>
          <ArrowBackIosNewIcon style={{ color: "#CECECE" }} />
        </button>
        <button className="button-next" onClick={next}>
          <ArrowForwardIosIcon style={{ color: "#CECECE" }} />
        </button>
      </div>
    </div>
  );
};
CustomSlider.propTypes = {
  movie: PropTypes.object,
};
export default CustomSlider;
