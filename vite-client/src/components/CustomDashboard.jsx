import Uppy from "@uppy/core";
import GoogleDrive from "@uppy/google-drive";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css"; //dashboard styles
import "./CustomDashboard.css"; //custom style changes

export const CustomDashboard = () => {
  const uppy = new Uppy({
    onBeforeFileAdded: (currentFile, files) => {
      console.log({ currentFile, files });
    },
    onBeforeUpload: (files) => {
      console.log("before upload", { files });
    },
  });
  uppy.use(GoogleDrive, { companionUrl: "http://localhost:3030" });

  return (
    <Dashboard
      showProgressDetails={true}
      uppy={uppy}
      theme="crimsom"
      plugins={["GoogleDrive"]}
    />
  );
};
