import React, { useState } from "react";
import "./MacroEditorPage.css";

const syntaxTags = [
  'onKeyPress "Ctrl+Shift+M"',
  'openApp "Notepad"',
  'typeText "Hello, world!"',
  "wait 500ms",
  'saveFile "C:\\path\\file.txt"',
  'closeApp "Notepad"',
  "moveMouse 100 200",
  'clickButton "OK"',
];

const initialVariables = {
  username: "Nagi",
  delay: "1000ms",
  filePath: "C:\\Users\\Nagi\\Desktop\\macro.txt",
};

const MacroEditorPage = () => {
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [variables] = useState(initialVariables);

  const insertText = (text) => {
    setCode((prev) => prev + (prev ? "\n" : "") + text);
  };

  const filteredTags = syntaxTags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="macro-editor">
      <div className="editor-panel">
        <div className="line-numbers">
          {code.split("\n").map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your macroscript here..."
        />
      </div>

      <div className="tag-panel">
        <h3>Syntax Tags</h3>
        <input
          type="text"
          className="search-bar"
          placeholder="Search syntax..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="tags">
          {filteredTags.map((tag, i) => (
            <div key={i} className="tag" onClick={() => insertText(tag)}>
              {tag}
            </div>
          ))}
        </div>

        <h3>Variables</h3>
        <div className="tags">
          {Object.entries(variables).map(([key, value], i) => (
            <div key={i} className="tag" onClick={() => insertText(`$${key}`)}>
              {key}: {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MacroEditorPage;
