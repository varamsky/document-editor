import React, { useRef, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import EditorHeader from "../../components/EditorHeader/EditorHeader";
import CanvasEditor from "../../components/Editor/CanvasEditor";
import EditorToolbar from "../../components/EditorToolbar/EditorToolbar";
import EditorFooter from "../../components/EditorFooter/EditorFooter";
import CustomizedSnackbar from "../../components/Snackbar/Snackbar";
import { CustomSnackbarType } from "../../utils/types";

function DocumentEditor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [openDocSaveSnackbar, setOpenDocSaveSnackbar] =
    useState<CustomSnackbarType>({
      visibility: false,
    });

  return (
    <>
      <EditorHeader />
      <Toolbar />
      <EditorToolbar ref={canvasRef} setOpenDocSaveSnackbar={setOpenDocSaveSnackbar} />
      <CanvasEditor ref={canvasRef} />
      <EditorFooter />
      <CustomizedSnackbar
        openSnackbar={openDocSaveSnackbar}
        setOpenSnackbar={setOpenDocSaveSnackbar}
      />
    </>
  );
}

export default DocumentEditor;
