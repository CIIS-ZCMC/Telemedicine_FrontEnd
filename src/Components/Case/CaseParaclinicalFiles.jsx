import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GetRequest } from "../../Services/api";
import { Case } from "../../Services/Paths";
import {
  AiFillFileWord,
  AiFillFilePpt,
  AiFillFilePdf,
  AiFillFileExcel,
  AiFillFileUnknown,
} from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { MdVideoLibrary } from "react-icons/md";
import PropTypes from "prop-types";

const CaseParaclinicalFiles = ({ id }) => {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(true);

  function retrieveExtension(value, isIcon) {
    const splitString = value.split("/");
    const fileName = splitString[splitString.length - 1];
    const extension = fileName.split(".");

    if (
      extension[1] === "png" ||
      extension[1] === "jpg" ||
      extension[1] === "jpeg"
    ) {
      if (isIcon) {
        return <BsImageFill color="gray" />;
      }
      return "IMAGE";
    }

    if (extension[1] === "mp4") {
      if (isIcon) {
        return <MdVideoLibrary color="gray" />;
      }
      return "VIDEO";
    }

    if (extension[1] === "docx") {
      if (isIcon) {
        return <AiFillFileWord color="gray" />;
      }
      return "WORD";
    }

    if (extension[1] === "ppt") {
      if (isIcon) {
        return <AiFillFilePpt color="gray" />;
      }
      return "PowerPoint";
    }

    if (extension[1] === "xls") {
      if (isIcon) {
        return <AiFillFileExcel color="gray" />;
      }
      return "EXCEL";
    }

    if (extension[1] === "pdf") {
      if (isIcon) {
        return <AiFillFilePdf color="gray" />;
      }
      return "PDF";
    }

    if (isIcon) {
      return <AiFillFileUnknown color="gray" />;
    }

    return value === "NULL" ? "MISSING" : "FILE";
  }

  useEffect(() => {
    GetRequest({ url: `${Case}/f/${id}` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        if (res.data === null) {
          return;
        }

        setFiles(res.data);
      })
      .catch((err) => {
        const { status, message } = err;

        switch (status) {
          case 400:
            console.log(message);
            break;
          case 404:
            console.log(message);
            break;
          default:
            console.log(message);
            break;
        }
      });

    return () => setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  if (files === null) {
    return null;
  }

  return (
    <Box w="inherit" h="6rem" mt={5} display="flex" columnGap={5}>
      {files.map((data, index) => {
        if (data.file_url === "NULL") {
          return;
        }
        return (
          <Box key={index}>
            <a
              href={`http://${data.file_url}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                w="8rem"
                pl={5}
                pr={5}
                pt={2}
                pb={2}
                rounded={5}
                boxShadow="sm"
                bg="rgba(0,0,0,0.1)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                columnGap={3}
              >
                {retrieveExtension(data.file_url, true)}
                {retrieveExtension(data.file_url, false)}
              </Box>
            </a>
          </Box>
        );
      })}
    </Box>
  );
};

CaseParaclinicalFiles.propTypes = {
  id: PropTypes.string,
};

export default CaseParaclinicalFiles;
