import { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding,
} from "draft-js";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";

import Toolbar from "./Toolbar";
import styles from "./CustomEditor.module.css";

export default function CustomEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    // If enter key is pressed, then make it normal text
    if (command === "split-block") {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const newContentState = Modifier.setBlockType(
        contentState,
        selectionState,
        "unstyled"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "split-block"
      );
      setEditorState(newEditorState);
      return "handled";
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not handled";
  };

  const handleReturn = (e) => {
    // Handle Return key to create a new line
    e.preventDefault(); // Prevent the default behavior
    const newEditorState = EditorState.push(
      editorState,
      Modifier.splitBlock(
        editorState.getCurrentContent(),
        editorState.getSelection()
      )
    );
    setEditorState(newEditorState);
    return "handled";
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

  const handleBeforeInput = (char, editorState) => {
    const currentContent =
      editorState.getCurrentContent().getPlainText("") + char;

    //  If currentContent starts with # + space, change block type to header-one, and remove # + space from text
    if (currentContent === "# ") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
      return "handled";
    }

    // If currentContent starts with * + space , then make it bold
    if (currentContent === "* ") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      return "handled";
    }

    // If currentContent starts with ** + space , then make it red line
    if (currentContent === "** ") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "RED"));
      return "handled";
    }

    // If currentContent starts with *** + space , then make it underline
    if (currentContent === "*** ") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
      return "handled";
    }

    // If enter key is pressed, then make it normal text
    if (char === "Enter") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "unstyled"));
      return "handled";
    }
  };

  const keyBindingFn = (e) => {
    // If enter key is pressed, then make it normal text
    if (e.keyCode === 13) {
      return "split-block";
    }
    return getDefaultKeyBinding(e);
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
            onChange={(editorState) => {
              setEditorState(editorState);
            }}
            handleKeyCommand={handleKeyCommand}
            placeholder="Write something!"
            customStyleMap={styleMap}
            handleBeforeInput={handleBeforeInput}
            keyBindingFn={keyBindingFn}
            handleReturn={handleReturn}
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
