import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DocumentService } from '../../services/documentService';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useDebounce } from '../../hooks/useDebounce';
import { DocumentState, setDocumentMargins } from '../../redux/documentReducer';
import {
  CustomSliderVertical,
  CustomSliderHorizontal,
  MarginRightArrow,
  MarginDownArrow,
  verticalMarks,
  horizontalMarks,
} from './CustomSliderComponents';
import { DOMEventHandlers } from '@mindfiredigital/canvas-editor';

export default function MarginRuler({
  documentId,
}: {
  documentId: string | undefined;
}) {
  const dispatch = useDispatch();

  const document = useSelector(
    (state: RootState) => state.document
  ) as unknown as DocumentState;

  const [verticalSlider, setVerticalSlider] = useState<Array<number>>([]);
  const [horizontalSlider, setHorizontalSlider] = useState<Array<number>>([]);

  const margins = useDebounce(document.margins, 500);

  const handleChange = (e: any, value: Array<number>) => {
    const [bottom, top] = value;
    setVerticalSlider(value);
    const margin = [...margins];
    margin[0] = Math.abs(top);
    margin[1] = 1056 - Math.abs(bottom);
    DOMEventHandlers.setPaperMargins(margin);
    dispatch(setDocumentMargins({ margins: margin }));
  };

  const handleChangeHorizontal = (e: any, value: Array<number>) => {
    const [left, right] = value;
    setHorizontalSlider(value);
    const margin = [...margins];
    margin[2] = left;
    margin[3] = 816 - right;
    DOMEventHandlers.setPaperMargins(margin);
    dispatch(setDocumentMargins({ margins: margin }));
  };

  const updateMargins = async () => {
    try {
      if (documentId) {
        await DocumentService.updateMargins({
          documentId,
          margins: margins,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (margins?.length && documentId) {
      updateMargins();
      setVerticalSlider([Math.abs(1056 - margins[1]) * -1, margins[0] * -1]);
      setHorizontalSlider([margins[2], 816 - margins[3]]);
      if (!verticalSlider.length && !horizontalSlider.length) {
        DOMEventHandlers.setPaperMargins(margins);
      }
    }
  }, [margins, documentId]);

  return (
    <React.Fragment>
      <Stack
        sx={{ height: '1056px', position: 'absolute', left: '0px' }}
        direction="row"
      >
        <CustomSliderVertical
          orientation="vertical"
          value={verticalSlider.length ? verticalSlider : [-956, -100]}
          min={-1056}
          max={0}
          marks={verticalMarks}
          onChange={handleChange}
          step={24}
          track="inverted"
          scale={(x) => -1056}
          size="small"
          slots={{ thumb: MarginRightArrow }}
          valueLabelDisplay="off"
        />
      </Stack>
      <Stack
        sx={{
          height: '1px',
          position: 'absolute',
          top: '-1px',
          width: '816px',
          left: 'calc((100% - 811px) / 2)',
        }}
        direction="row"
      >
        <CustomSliderHorizontal
          orientation="horizontal"
          value={horizontalSlider.length ? horizontalSlider : [120, 696]}
          min={0}
          max={816}
          marks={horizontalMarks}
          onChange={handleChangeHorizontal}
          step={24}
          size="small"
          scale={(x) => 816}
          slots={{ thumb: MarginDownArrow }}
          valueLabelDisplay="off"
        />
      </Stack>
    </React.Fragment>
  );
}
