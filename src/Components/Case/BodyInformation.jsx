import { Box } from "@chakra-ui/react";
import {
  FaTemperatureLow,
  FaHeartbeat,
  FaLungs,
  FaWeight,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { SiOxygen } from "react-icons/si";
import { GiBodyHeight } from "react-icons/gi";
import PatientMedicalBodyInformation from "./PatientMedicalBodyInformation";
import PropTypes from "prop-types";

const iconSize = 24;

const bodyInformation = [
  {
    title: "Temperature",
    icon: <FaTemperatureLow size={iconSize} color="skyblue" />,
  },
  {
    title: "Respiratory Rate",
    icon: <FaLungs size={iconSize} color="green" />,
  },
  {
    title: "Heart Rate",
    icon: <FaHeartbeat size={iconSize} color="red" />,
  },
  {
    title: "Blood Pressure",
    icon: <MdBloodtype size={iconSize} color="darkred" />,
  },
  {
    title: "Respiratory Rate",
    icon: <SiOxygen size={iconSize} color="darkgreen" />,
  },
  {
    title: "Heart Rate",
    icon: <FaWeight size={iconSize} color="gray" />,
  },
  {
    title: "Blood Pressure",
    icon: <GiBodyHeight size={iconSize} color="gray" />,
  },
];

const BodyInformation = ({
  cases_Temperature,
  cases_Respiratory,
  cases_Heart,
  cases_Blood,
  cases_Oxygen,
  cases_Weight,
  cases_Height,
}) => {
  return (
    <Box w="inherit" display="flex" flexWrap="wrap" columnGap={5} rowGap={5}>
      {[
        cases_Temperature,
        cases_Respiratory,
        cases_Heart,
        cases_Blood,
        cases_Oxygen,
        cases_Weight,
        cases_Height,
      ].map((value, index) => (
        <PatientMedicalBodyInformation
          key={index}
          {...bodyInformation[index]}
          value={value}
        />
      ))}
    </Box>
  );
};

BodyInformation.propTypes = {
  cases_Temperature: PropTypes.string,
  cases_Respiratory: PropTypes.string,
  cases_Heart: PropTypes.icon,
  cases_Blood: PropTypes.string,
  cases_Oxygen: PropTypes.string,
  cases_Weight: PropTypes.icon,
  cases_Height: PropTypes.icon,
};

export default BodyInformation;
