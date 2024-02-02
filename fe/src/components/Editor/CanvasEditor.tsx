import React, { forwardRef, useEffect, useState } from 'react';
import {
  DOMEventHandlers,
  EditorMode,
  PageMode,
  IElement,
} from '@mindfiredigital/canvas-editor';
import './CanvasEditor.scss';
import { SOCKET_URL, SocketEvents } from '../../utils/constant';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  DocumentState,
  setDocumentId,
  setDocumentTitle,
  setDocumentMargins,
} from '../../redux/documentReducer';
import MarginRuler from '../MarginRuler/MarginRuler';
import { SelectionRect } from '../../utils/types';
import useSelectionPosition from '../../hooks/useSelectionPosition';
import FloatingBox from '../FloatingBox/FloatingBox';
import { useCreateVersion } from '../../hooks/useCreateVersion';
import { debounce, isChanging } from '../../utils/utility';

const CanvasEditor = forwardRef<HTMLDivElement, unknown>(function Editor(
  _props,
  ref
) {
  const [dropdown, setDropdown] = useState<SelectionRect>({
    left: 1180,
    top: 250,
    visiblity: false,
  });
  const [editorContent, setEditorContent] = useState<IElement[]>([]);
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [selectedText, setSelectedText] = useState<string>('');
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);
  const { documentId } = useParams();
  useSelectionPosition(setSelectedText, setDropdown);
  const doc = useSelector(
    (state: RootState) => state.document
  ) as DocumentState;

  useCreateVersion();

  const dispatch = useDispatch();

  useEffect(() => {
    // socket connection
    const s = io(SOCKET_URL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = document.querySelector(
      '.canvas-editor'
    ) as HTMLDivElement;
    const editorOptions = {
      height: 1056,
      width: 816,
      mode: EditorMode.EDIT,
      pageMode: PageMode.PAGING,
      pageNumber: {
        format: '{pageNo}/{pageCount}',
      },
      minSize: 1,
      maxSize: 72,
    };

    DOMEventHandlers.register(container, editorContent, editorOptions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const content = DOMEventHandlers.getContent();
  //     setEditorContent(content.data.main);
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [editorContent]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isKeyPressed) {
      timeout = setTimeout(() => {
        const content = DOMEventHandlers.getContent();
        setEditorContent(content.data.main);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isKeyPressed]);

  useEffect(() => {
    if (!socket) return;
    dispatch(setDocumentId({ documentId }));
    socket.emit(SocketEvents.GET_DOC, documentId);
    socket.once(SocketEvents.LOAD_DOC, (document) => {
      dispatch(setDocumentTitle({ title: document.title }));
      dispatch(
        setDocumentMargins({
          margins: document?.margins?.length
            ? document.margins
            : [100, 100, 120, 120],
        })
      );
      if (document.data) {
        console.log(document.data);

        setEditorContent(document.data);
        DOMEventHandlers.setContent({ main: document.data });
      }
    });
  }, [socket, documentId, dispatch]);

  // debounce on change
  const debouncedEmitChanges = debounce((content: any) => {
    if (socket) {
      // send
      socket.emit(SocketEvents.SEND_CHANGES, content);
    }
  }, 10);

  // Multi User
  useEffect(() => {
    const content = DOMEventHandlers.getContent();
    if (!isChanging(content.data.main, editorContent)) {
      setEditorContent(content.data.main);
    }
    debouncedEmitChanges(editorContent);
  }, [editorContent, debouncedEmitChanges, doc.isUnderLine]);

  // Multi User
  useEffect(() => {
    if (!socket) return;
    // receive
    const handler = (data: any) => {
      DOMEventHandlers.setContent({ main: data });
    };
    socket.on(SocketEvents.RECEIVE_CHANGES, handler);
  }, [socket]);

  useEffect(() => {
    if (!socket || !documentId) return;
    socket.emit(SocketEvents.SAVE_DOC, {
      id: documentId,
      data: editorContent,
      title: doc.title,
    });
  }, [editorContent, documentId, doc.title, socket]);

  // Checking key is continuously pressing or not
  useEffect(() => {
    let keyPressTimer: any;
    const handleKeyDown = () => {
      clearTimeout(keyPressTimer);
      setIsKeyPressed(true);
    };
    const handleKeyUp = () => {
      keyPressTimer = setTimeout(() => {
        setIsKeyPressed(false);
      }, 1000);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(keyPressTimer);
    };
  }, []);

  return (
    <div className="canvas-editor-main">
      <div className="canvas-editor editor" ref={ref}>
        <MarginRuler documentId={documentId} />
      </div>
      {dropdown.visiblity && (
        <FloatingBox
          left={dropdown.left}
          top={dropdown.top}
          selectedText={selectedText}
          setDropdown={setDropdown}
        />
      )}
    </div>
  );
});

export default CanvasEditor;
