import { Code, X, GitPullRequest, Settings } from "lucide-react";
const StatusBar = () => {
  <footer className="bg-blue-600 text-white flex items-center justify-between px-4 py-1.5 shadow-inner">
    <div className="flex items-center space-x-4">
      <span className="text-sm">
        <Code size={16} className="inline-block mr-1" />
        main
      </span>
      <span className="text-sm">
        <GitPullRequest size={16} className="inline-block mr-1" />
        Git
      </span>
      <span className="text-sm">
        <X size={16} className="inline-block mr-1" />0 errors, 0 warnings
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm">Ln 1, Col 1</span>
      <span className="text-sm">Spaces: 2</span>
      <span className="text-sm">UTF-8</span>
      <span className="text-sm">LF</span>
      <span className="text-sm">React JSX</span>
    </div>
  </footer>;
};

export default StatusBar;
