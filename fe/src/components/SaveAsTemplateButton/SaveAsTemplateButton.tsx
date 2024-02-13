import React, { forwardRef, useEffect, useState } from 'react';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { DOMEventHandlers } from '@mindfiredigital/canvas-editor';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import { DocumentService } from '../../services/documentService';
import { RootState } from '../../redux/store';
import { DocumentState, setIsDocumentSaveLoading } from '../../redux/documentReducer';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';
import { CustomSnackbarType } from '../../utils/types';
import { MSGSEVERITY } from '../../utils/constant';

interface SaveAsTemplateButtonProps {
  setOpenDocSaveSnackbar: React.Dispatch<
    React.SetStateAction<CustomSnackbarType>
  >;
}


const SaveAsTemplateButton = forwardRef<HTMLDivElement, SaveAsTemplateButtonProps>(function TemplateButton(
  props: SaveAsTemplateButtonProps,
  ref
) {
  const [image, setImage] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState();
  const doc = useSelector(
    (state: RootState) => state.document
  ) as DocumentState;
  const dispatch = useDispatch();

  useEffect(() => {
    //save image
    const formData = new FormData();
    const uploadimage = async () => {
      if (image) formData.append('image', image);
      try {
        if (templateId) await DocumentService.uploadImage(templateId, formData);
      } catch (err) {
        console.log(err);
      }
    };
    if (templateId && image) uploadimage();
  }, [image, templateId]);

  const handleScreenshot = async () => {
    if (ref && 'current' in ref && ref.current) {
      try {
        const canvas = ref.current;
        const container = document.querySelector(
          '.ce-page-container'
        ) as HTMLDivElement;
        const FirstPage = container.querySelector("canvas[data-index='0']") as HTMLDivElement;
        const screenshot = await html2canvas(FirstPage);

        const data = screenshot.toDataURL('image/png');
        setImage(data);
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  };

  const handleClick = () => {
    dispatch(setIsDocumentSaveLoading({ isDocumentSaveLoading: true }));
    const content = DOMEventHandlers.getContent();
    if (content) {
      handleScreenshot();
      DocumentService.saveAsTemplate({
        userId: 'user1',
        title: doc.title,
        data: content.data.main,
      }).then(
        (resp) => {
          setTemplateId(resp.data.data);
          dispatch(setIsDocumentSaveLoading({ isDocumentSaveLoading: false }));
          props.setOpenDocSaveSnackbar({
            visibility: true,
            message: "Template Saved",
            severity: MSGSEVERITY.SUCCESS,
          });
        },
        (err) => {
          console.log(err);
          dispatch(setIsDocumentSaveLoading({ isDocumentSaveLoading: false }));
          props.setOpenDocSaveSnackbar({
            visibility: true,
            message: "Error while saving template",
            severity: MSGSEVERITY.ERROR,
          });
        }
      );
    }
  };
  return (
    <ButtonWrapper title="save as template" handleClick={handleClick}>
      <SaveAsIcon />
    </ButtonWrapper>
  );
});

export default SaveAsTemplateButton;
