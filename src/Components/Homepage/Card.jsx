import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardComponent = ({ icon, title, content }) => {
  return (
    <div>
      <Card
        height="100%"
        boxShadow="md"
        width="full"
        align="center"
        backgroundColor="whiteAlpha.700"
      >
        <CardHeader display="flex" alignItems="center" gap={2}>
          {icon}
          <Heading size="lg" color="#005858">
            {title}
          </Heading>
        </CardHeader>
        <CardBody textAlign="center">{content}</CardBody>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
};

CardComponent.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.object,
};

export default CardComponent;
