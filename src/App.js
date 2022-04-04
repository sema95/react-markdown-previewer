import React, { useState } from 'react'
import Prism from 'prismjs';
import './App.css';
import { marked } from 'marked';

const initialContent = `

# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:


\`<div>Inline code</div>\`

\`\`\`
const multipleLineCode = (param) => {
    if(param) {
        return param
    }
}
\`\`\`

**Some bold text**

> Block Quote

There's also [links](https://www.freecodecamp.org)

1. First list item
2. Second list item

This project was done as part of the FreeCodeCamp  Front End Development Libraries Certification.

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const Editor = ({ content, handleTextareaChange }) => <textarea id ="editor" value={content} onChange={handleTextareaChange} />
 
const Previewer = ({ content}) => <div id="preview" dangerouslySetInnerHTML={{__html: marked(content, {renderer: renderer })}} />

const App = () => {
  const [content, setContent] = React.useState(initialContent)

  const handleTextareaChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <div className="main">
      <Editor content={content} handleTextareaChange={handleTextareaChange}/>
      <Previewer content={content}/>
    </div>
  );
}

export default App;
