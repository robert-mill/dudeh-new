import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const MessageTnyEditor = ({ value, label, height, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <Editor
        initialValue={value}
        name={label}
        onChange={onChange}
        init={{
          automatic_uploads: false,
          file_picker_types: "file image media",
          images_upload_url: process.env.REACT_APP_IMAGEUPLOADER_URL,
          images_reuse_filename: true,
          height: parseInt(height),
          menubar: false,

          plugins: "hr lists table textcolor code link",
          toolbar:
            "undo redo | formatselect | bold italic forecolor backcolor |  link |  undo redo | help ",
        }}
        onEditorChange={onChange}
      />{" "}
    </div>
  );
};

export default MessageTnyEditor;
