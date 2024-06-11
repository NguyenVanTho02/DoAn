import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import getVideoId from "../../util/getVideoIdFromUrlyoutube";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../redux/constrants/ModalTrailer";
const PREFIX = "index";
const classes = {
  paper: `${PREFIX}-paper`,
  closeButton: `${PREFIX}-closeButton`,
  iframe: `${PREFIX}-iframe`,
};
const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    overflowY: "visible",
    backgroundColor: "black",
  },

  [`& .${classes.closeButton}`]: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translate(50%,-50%)",
    border: "2px solid white",
    "&:focus": {
      outline: "none",
    },
    "&:hover": { opacity: 0.7 },
    transition: "all .2s",
  },

  [`& .${classes.iframe}`]: {
    width: "898px",
    height: "505px",
    [theme.breakpoints.down("xl")]: {
      width: "598px",
      height: "336px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
      height: "fit-content",
    },
  },
}));
const ModalTrailer = () => {
  const { open, urlYoutube } = useSelector(
    (state) => state.ModalTrailerReducer
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: CLOSE_MODAL, payload: { open: false } });
  };
  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      classes={{ paper: classes.paper }}
    >
      <iframe
        className={classes.iframe}
        src={`https://www.youtube.com/embed/${getVideoId(
          urlYoutube
        )}?autoplay=1`}
        allowFullScreen
        frameBorder="0"
        allow="autoplay"
        title="trailer movie"
      ></iframe>
      <IconButton
        className={classes.closeButton}
        onClick={handleClose}
        size="large"
      >
        <CloseIcon style={{ color: "white" }} fontSize="small" />
      </IconButton>
    </StyledDialog>
  );
};

export default ModalTrailer;
