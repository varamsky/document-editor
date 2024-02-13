import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { DOMEventHandlers } from "@mindfiredigital/canvas-editor";
import { DocumentService } from "../../services/documentService";
import { useParams } from "react-router-dom";
import { setIsDocumentSaveLoading } from "../../redux/documentReducer";
import { useDispatch } from "react-redux";
import { MSGSEVERITY } from "../../utils/constant";
import { CustomSnackbarType } from "../../utils/types";

interface EditorToolbarProps {
  setOpenDocSaveSnackbar: React.Dispatch<
    React.SetStateAction<CustomSnackbarType>
  >;
}

const SaveAsDocumentButton = (props: EditorToolbarProps) => {
  const { documentId } = useParams();
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    dispatch(setIsDocumentSaveLoading({ isDocumentSaveLoading: true }));
    const content = DOMEventHandlers.getContent();
    if (content.data.main.length === 0) return;
    try {
      //create a new version each time user manually saves a document
      if (documentId) {
        const response = await DocumentService.createVersion(documentId);

        if (response.status === 200) {
          dispatch(setIsDocumentSaveLoading({ isDocumentSaveLoading: false }));
          props.setOpenDocSaveSnackbar({
            visibility: true,
            message: "Document Saved",
            severity: MSGSEVERITY.SUCCESS,
          });
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setIsDocumentSaveLoading({ isDocumentSaveLoading: false }));
      props.setOpenDocSaveSnackbar({
        visibility: true,
        message: "Error while saving document",
        severity: MSGSEVERITY.ERROR,
      });
    }
  };

  return (
    <>
      <IconButton onClick={handleButtonClick}>
        <Tooltip title="save as document">
          <BookmarkIcon />
        </Tooltip>
      </IconButton>
    </>
  );
};

export default SaveAsDocumentButton;
