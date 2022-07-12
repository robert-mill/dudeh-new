import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const TnyEditor = ({ value, label, height, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <Editor
        initialValue={value}
        name={label}
        init={{
          automatic_uploads: false,
          file_picker_types: "file image media",
          images_upload_url: process.env.REACT_APP_IMAGEUPLOADER_URL,
          images_reuse_filename: true,
          height: parseInt(height),
          menubar: false,
          plugins: "hr lists table textcolor code link image code table",
          toolbar:
            "undo redo | formatselect | bold italic forecolor backcolor |  alignleft aligncenter alignright alignjustify |  link |  undo redo | image code| bullist numlist outdent indent | removeformat | help | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
        }}
        onEditorChange={onChange}
      />{" "}
    </div>
  );
};

export default TnyEditor;
