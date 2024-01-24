import { useState, useEffect, useRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import styles from "./CustomEditor.module.css";
// import "draft-js/dist/Draft.css";

export default function CustomEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const editor = useRef(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(convertedContent);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  // function focusEditor() {
  //   editor.current.focus();
  // }
  // onClick={focusEditor}

  return (
    <div>
      <header className={styles.editor}>Rich Text Editor Example</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        ref={editor}
        placeholder="Write something!"
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
}
