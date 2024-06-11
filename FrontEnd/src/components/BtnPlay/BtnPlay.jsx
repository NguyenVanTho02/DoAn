import { styled } from '@mui/material/styles';
const PREFIX = 'index';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../../redux/constrants/ModalTrailer';
const classes = {
  button: `${PREFIX}-button`,
  imgPlay: `${PREFIX}-imgPlay`
};
const Root = styled('div')({
    [`& .${classes.button}`]: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
  
      zIndex: 1,
      opacity: 0,
  
      background: "0 0",
      border: "none",
  
      height: props => props.width ? props.width : 70,
      width: props => props.height ? props.height : 70,
      transition: "all .2s",
    },
    [`& .${classes.imgPlay}`]: {
      height: "100%",
      width: "100%",
      transition: "all .2s",
      '&:hover': { opacity: 0.7 }
    },
  });
const play = '/img/carousel/play-video.png';
const BtnPlay = ({ cssRoot,width, height,urlYoutube }) => {
  const dispatch = useDispatch()
  const openModal = () => {
    dispatch({
      type: OPEN_MODAL, payload: {
        open: true,
        urlYoutube
      }
    })
  };
    return (
    <Root className={`${classes.button} ${cssRoot}`}>
      <img src={play} className={classes.imgPlay} onClick={() => openModal()} alt="play" />
    </Root>
    );
};
BtnPlay.propTypes = {
    urlYoutube: PropTypes.string,
    cssRoot: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  };
export default BtnPlay;