import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { DOMEventHandlers } from '@mindfiredigital/canvas-editor';
import { DocumentService } from '../../services/documentService';
import { useParams } from 'react-router-dom';

const SaveAsDocumentButton: React.FC = () => {
  const { documentId } = useParams();

  const handleButtonClick = async () => {
    const content = DOMEventHandlers.getContent();
    if (content.data.main.length === 0) return;
    try {
      //create a new version each time user manually saves a document
      if (documentId) {
        await DocumentService.createVersion(documentId);
      }
    } catch (err) {
      console.log(err);
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
