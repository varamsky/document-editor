import { createSlice } from '@reduxjs/toolkit';

export interface DocumentState {
  documentId: string;
  title: string;
  reloadRecentDoc: boolean;
  margins: number[];
  isUnderLine: boolean;
}

const initialState = {
  documentId: '',
  title: '',
  reloadRecentDoc: false,
  margins: [],
  isUnderLine: false,
} as DocumentState;

const docSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocumentTitle: (state, action) => {
      state.title = action.payload.title;
    },
    reloadRecentDoc: (state, action) => {
      state.reloadRecentDoc = action.payload.reloadRecentDoc;
    },
    setDocumentMargins: (state, action) => {
      state.margins = action.payload.margins;
    },
    setDocumentId: (state, action) => {
      state.documentId = action.payload.documentId;
    },
    setIsUnderLine: (state, action) => {
      state.isUnderLine = action.payload.isUnderLine;
    },
  },
});

export const {
  setDocumentTitle,
  reloadRecentDoc,
  setDocumentId,
  setDocumentMargins,
  setIsUnderLine,
} = docSlice.actions;
export default docSlice.reducer;
