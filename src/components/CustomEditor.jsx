import { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";

import "draft-js/dist/Draft.css";
import styles from "./CustomEditor.module.css";

export default function CustomEditor() {
  const [editorState, setEditorState] = useState(() => {
    // Retrieve data from local storage
    const savedData = localStorage.getItem("editorData");

    if (savedData) {
      const contentState = convertFromRaw(JSON.parse(savedData));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });
  const [convertedContent, setConvertedContent] = useState(null);

  const handleChange = (newState) => {
    setEditorState(newState);
  };

  // const handleKeyCommand = (command, newState) => {
  //   const newEditorState = RichUtils.handleKeyCommand(newState, command);

  //   if (newEditorState) {
  //     handleChange(newEditorState);
  //     return "handled";
  //   }

  //   return "not-handled";
  // };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const serializedData = JSON.stringify(rawContent);
    localStorage.setItem("editorData", serializedData);
  };

  useEffect(() => {
    // Update local storage whenever the editor state changes
    handleSave();
  }, [editorState]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(convertedContent);

  const handleHeading = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
  };

  const handleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleRedLine = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const handleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <div className={styles.editorContainer}>
      <header className={styles.editor}>Custom Text Editor</header>
      <div className={styles.toolbar}>
        <button onClick={handleHeading}>Heading</button>
        <button onClick={handleBold}>Bold</button>
        <button onClick={handleRedLine}>Red Line</button>
        <button onClick={handleUnderline}>Underline</button>
      </div>
      <div className={styles.draftEditorRoot}>
        <div className={styles.draftEditor}>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Write something!"
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <button className={styles.save} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
