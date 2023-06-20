import React from "react";
import { Text } from "@chakra-ui/react";

export const getContentForId = (id) => {
  switch (id) {
    case 1:
      return (
        <Text fontSize={20}>
          ZCMC Regional Telemedicine Center will be the primary multi-specialty
          telehealth referral center in Zamboanga Peninsula and beyond by 2028.
        </Text>
      );
    case 2:
      return (
        <Text fontSize={20}>
          To provide competent specialized telehealth services through state-of
          the-art technology across Zamboanga Peninsula and beyond.
        </Text>
      );
    case 3:
      return (
        <Text fontSize={20}>
          <b>T</b>eamwork,&nbsp;
          <b>E</b>fficiency,&nbsp;
          <b>L</b>ove and loyalty,&nbsp;
          <b>E</b>xcellence,&nbsp;
          <b>M</b>eritocracy,&nbsp;
          <b>E</b>quality in gender and ethnicity,&nbsp;
          <b>D</b>ependability and responsibility safety&nbsp;
        </Text>
      );
    default:
      return null;
  }
};
