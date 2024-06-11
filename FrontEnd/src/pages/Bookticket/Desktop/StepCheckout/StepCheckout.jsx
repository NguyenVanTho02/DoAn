import React from "react";
import "./stepCheckout.scss";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import WeekendIcon from "@mui/icons-material/Weekend";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StepCheckout = () => {
  const navigate = useNavigate();
  const activeStep = useSelector((state) => state.activeStep);
  const steps = ["CHỌN GHẾ", "THANH TOÁN", "KẾT QUẢ ĐẶT VÉ"];
  const handleUser = () => {
    navigate("/account");
  };
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient(223deg,#b4ec51 0,#429321 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient(223deg,#b4ec51 0,#429321 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage: "linear-gradient(223deg,#b4ec51 0,#429321 100%)",
      boxShadow: "0 0 11px 11px rgba(180, 236, 81,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage: "linear-gradient(223deg,#b4ec51 0,#429321 100%)",
    }),
  }));

  const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props;
    const icons = {
      1: <WeekendIcon />,
      2: <PaymentIcon />,
      3: <CheckCircleIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  return (
    <div className="step-checkout">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className="stepper"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              className="label-step"
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="account" onClick={handleUser}>
        <img
          src="https://cdn.bongdaplus.vn/Assets/Media/2023/08/06/75/Ban-gai-Ho-Tuan-Tai-bia-1.jpg"
          alt=""
          className="account-avt"
        />
        <p className="full-name">{currentUser?.userName}</p>
      </div>
    </div>
  );
};

export default StepCheckout;
