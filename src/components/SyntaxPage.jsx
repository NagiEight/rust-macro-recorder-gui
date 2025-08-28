// components/SyntaxPage.jsx
import React from "react";
import { useUI } from "../context/UIContext.jsx";

/**
 * The SyntaxPage component displays the syntax guide data in a formatted way.
 * This provides a more user-friendly view of the syntax information.
 */
const SyntaxPage = () => {
  const { syntaxData } = useUI();

  return (
    <div className="p-6 overflow-y-auto h-full text-gray-300">
      <h1 className="text-xl font-bold mb-4">Syntax Guide</h1>
      {Object.entries(syntaxData).map(([language, data], index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-semibold text-blue-400 mb-2">
            {data.label} Syntax
          </h2>
          <p className="mb-2 text-sm">{data.description}</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            {data.rules.map((rule, ruleIndex) => (
              <li key={ruleIndex} className="text-gray-400 text-sm">
                <span className="font-mono text-white bg-zinc-700 px-1 py-0.5 rounded mr-2">
                  {rule.example}
                </span>
                {rule.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SyntaxPage;
