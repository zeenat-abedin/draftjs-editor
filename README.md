# Custom Text Editor

This project demonstrates a custom text editor built using React, Draft.js, and custom styling. It provides a rich text editing experience with various formatting options and the ability to save and load content.

## Getting Started

To run the application, follow these steps:

1. Clone the repository:

```
git clone https://github.com/your-username/custom-text-editor.git
```

2. Install the dependencies:

```
npm i --legacy-peer-deps
```

3. Start the development server:

```
npm start
```

The application will be available at http://localhost:3000.

## Code Overview

The `CustomEditor` component is the main component of the application. It manages the state of the editor, handles user interactions, and renders the editor UI.

### State Management

The `CustomEditor` component uses the `useState` hook to manage the state of the editor. The state consists of the following properties:

- `editorState`: This property stores the current state of the editor content. It is an instance of `EditorState` from Draft.js.
- `convertedContent`: This property stores the HTML representation of the editor content. It is used to display the content in a human-readable format.

### Event Handling

The `CustomEditor` component handles various user interactions, such as key presses, button clicks, and changes to the editor content.

- **Key press handling:** The `handleKeyCommand` function is used to handle key presses in the editor. It checks if the key press corresponds to a supported command, such as bold, italic, or undo, and updates the editor state accordingly.
- **Button click handling:** The `handleSave` function is used to save the editor content to local storage. It converts the editor state to a JSON string and stores it in the browser's local storage.

### Rendering

The `CustomEditor` component renders the editor UI, which consists of the following elements:

- **Toolbar:** The toolbar contains buttons for various formatting options, such as bold, italic, and underline.
- **Editor:** The editor is where the user can enter and edit text. It is implemented using Draft.js's `Editor` component.
- **Save button:** The save button allows the user to save the editor content to local storage.

## Custom Styling

The `CustomEditor` component uses custom styling to enhance the appearance of the editor.
