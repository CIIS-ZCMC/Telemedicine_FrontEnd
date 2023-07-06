import ImageComponent from "./File UI/ImageComponent";
import VideoComponent from "./File UI/VideoComponent";
import FileComponent from "./File UI/FileComponent";
import MP3Component from "./File UI/MP3Component";
import PropTypes from "prop-types";

const MessageFile = ({ filename, file }) => {
  let ext = filename.split(".")[1] ?? "unknown";

  if (ext.includes("png") || ext.includes("jpg")) {
    return <ImageComponent file={file} />;
  }

  if (ext.includes("mp4")) {
    return <VideoComponent file={file} />;
  }

  if (ext.includes("mp3")) {
    return <MP3Component file={file} />;
  }

  return <FileComponent extension={ext} file={file} />;
};

MessageFile.propTypes = {
  filename: PropTypes.object,
  file: PropTypes.object,
};

export default MessageFile;
