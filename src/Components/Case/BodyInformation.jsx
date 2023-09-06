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
  temperature,
  respiratory,
  heart,
  blood,
  oxygen,
  weight,
  height,
}) => {
  return (
    <Box w="inherit" display="flex" flexWrap="wrap" columnGap={5} rowGap={5}>
      {[temperature, respiratory, heart, blood, oxygen, weight, height].map(
        (value, index) => (
          <PatientMedicalBodyInformation
            key={index}
            {...bodyInformation[index]}
            value={value}
          />
        )
      )}
    </Box>
  );
};

BodyInformation.propTypes = {
  temperature: PropTypes.string,
  respiratory: PropTypes.string,
  heart: PropTypes.object,
  blood: PropTypes.string,
  oxygen: PropTypes.string,
  weight: PropTypes.icon,
  height: PropTypes.icon,
};

export default BodyInformation;
