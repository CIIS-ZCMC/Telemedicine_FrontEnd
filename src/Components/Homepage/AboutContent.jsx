import { Text, Box } from "@chakra-ui/react";

export const getContentForId = (id) => {
  switch (id) {
    case 1:
      return (
        <Text fontSize={16}>
          ZCMC Regional Telemedicine Center will be the primary multi-specialty
          telehealth referral center in Zamboanga Peninsula and beyond by 2028.
        </Text>
      );
    case 2:
      return (
        <Text fontSize={16}>
          To provide competent specialized telehealth services through state-of
          the-art technology across Zamboanga Peninsula and beyond.
        </Text>
      );
    case 3:
      return (
        <Box whiteSpace="pre-line">
          <p>
            <b>T</b>eamwork,
          </p>
          <p>
            <b>E</b>fficiency,
          </p>
          <p>
            <b>L</b>ove and loyalty,
          </p>
          <p>
            <b>E</b>xcellence,
          </p>
          <p>
            <b>M</b>eritocracy,
          </p>
          <p>
            <b>E</b>quality in gender and ethnicity,
          </p>
          <p>
            <b>D</b>ependability and responsibility,
          </p>
          <p>
            <b>S</b>afety.
          </p>
        </Box>
      );
    default:
      return null;
  }
};
