import { useState, useEffect } from "react";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import Editor from "draft-js-plugins-editor";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import "draft-js/dist/Draft.css";

import Toolbar from "./Toolbar";
import styles from "./CustomEditor.module.css";

const plugins = [createMarkdownShortcutsPlugin()];

export default function CustomEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not handled";
  };

  const styleMap = {
    RED: {
      color: "#ff0000",
    },
  };
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    const serializedData = JSON.stringify(rawContent);
    localStorage.setItem("editorData", serializedData);
  };

  useEffect(() => {
    handleSave();
  }, [editorState]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (
    <div className={styles.editorContainer}>
      <header className={styles.editor}>Custom Text Editor</header>
      <div className={styles.toolbar}>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
      </div>
      <div className={styles.draftEditorRoot}>
        <div className={styles.draftEditor}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder="Write something!"
            customStyleMap={styleMap}
            plugins={plugins}
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
