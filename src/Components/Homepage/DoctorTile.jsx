import { Badge, Box, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const specializations = [
  { name: "OB-GYNE", color: "red" },
  { name: "GENERAL PRACTITIONER", color: "blue" },
  { name: "PEDIATRICS", color: "orange" },
];

const DoctorTile = ({ img, name, title, spec }) => {
  return (
    <div>
      <VStack sx={{ width: 280, height: 420 }}>
        <Box
          sx={{
            backgroundColor: "#2EACAC",
            h: "70%",
            w: "100%",
            boxShadow: "lg",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: "relative",
            top: 10,
          }}
        >
          <div>
            <Image
              src={img}
              sx={{ position: "absolute", bottom: 0, left: 5, height: 360 }}
            />
          </div>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            borderBottomRadius: 10,
            pt: 12,
            h: "auto",
            w: "100%",
            boxShadow: "xl",
            px: 4,
            pb: 5,
          }}
        >
          <Text sx={{ fontSize: 13, fontWeight: "bold" }}>{name}</Text>
          <Text sx={{ fontSize: 13, mb: 3 }}>{title}</Text>
          <Badge
            rounded={50}
            px={4}
            py={1}
            fontSize={11}
            colorScheme={
              spec.toUpperCase() == "OB-GYNE"
                ? "red"
                : spec.toUpperCase() == "GENERAL PRACTITIONER"
                ? "purple"
                : spec.toUpperCase() == "PEDIATRICS"
                ? "orange"
                : ""
            }
          >
            {spec}
          </Badge>
        </Box>
      </VStack>
    </div>
  );
};

export default DoctorTile;
