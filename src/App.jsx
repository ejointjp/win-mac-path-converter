import { useState, useCallback } from "react";
import { ArrowSmallDownIcon, ArrowSmallRightIcon, CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { FaApple, FaWindows } from "react-icons/fa6";

function App() {
  const [inputPath, setInputPath] = useState("");
  const [resultPath, setResultPath] = useState("");
  const [pathIs, setPathIs] = useState("");

  console.log("inputPath", inputPath);
  console.log("resultPath", resultPath);
  console.log("pathIs", pathIs);

  const changePath = () => {
    if (inputPath.indexOf("\\") > -1) {
      setPathIs("win");
      const replaced = inputPath.replace(/\\/g, "/");
      const resultPath = "smb:" + replaced;
      setResultPath(resultPath);
      navigator.clipboard.writeText(resultPath);
    } else if (inputPath.indexOf("/") > -1) {
      setPathIs("mac");
      const replaced = inputPath.replace(/^smb:\/\//, "\\\\");
      const resultPath = replaced.replace(/\//g, "\\");
      setResultPath(resultPath);
      navigator.clipboard.writeText(resultPath);
    } else {
      setPathIs("error");
      setResultPath("");
    }
  };

  const ResultMessage = () => {
    const Icons = () => {
      return (
        <>
          <FaWindows className="w-6 h-6 text-sky-400" />
          <ArrowSmallRightIcon className="w-4 h-4 text-gray-500" />
          <FaApple className="w-6 h-6 text-gray-800" />
        </>
      );
    };
    if (pathIs === "win") {
      return (
        <div className="flex items-center gap-2">
          <Icons />
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 flex-row-reverse justify-end">
          <Icons />
        </div>
      );
    }
  };

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    setInputPath(e.target.value);
    changePath();
  };

  const Alert = useCallback(
    ({ icon, className, children }) => {
      return (
        <p className={`${className} alert border text-sm p-3 rounded-md inline-flex items-center gap-1`}>
          {icon}
          {children}
        </p>
      );
    },
    [pathIs]
  );
  // const Alert = ({ icon, className, children }) => {
  //   return (
  //     <p className={`${className} alert border text-sm p-3 rounded-md bg-white inline-flex items-center gap-1`}>
  //       {icon}
  //       {children}
  //     </p>
  //   );
  // };

  return (
    <div className="app text-gray-700 bg-gray-100 pt-[5rem] min-h-[100svh]">
      <header className="flex items-center gap-8 h-[5rem] px-4 bg-white absolute left-0 top-0 right-0">
        <h1 className="font-bold">Win - Mac Path Converter</h1>
        <p className="text-sm hidden sm:block">WindowsとMacのPathを相互に変換</p>
      </header>
      <div className="flex flex-col justify-between max-w-2xl mx-auto">
        <div className="px-4 mt-10">
          <p className="text-sm font-bold mb-2 flex items-end gap-2">
            <ArrowSmallDownIcon className={`w-10 h-10 text-sky-500 ${!resultPath && "shake"}`} />
            Windows または Macのパスをペーストして <kbd>Enter</kbd>
          </p>

          <textarea
            className="code block p-2.5 rounded-md max-w-full bg-white w-full h-[10rem] outline-sky-500"
            name="input"
            type="text"
            placeholder="ここにパスを入力"
            size="100"
            onChange={(e) => setInputPath(e.target.value)}
            onKeyDown={(e) => onKeyDown(e)}
            autoFocus={true}
          />
          <div className="flex justify-end">
            <button
              className="bg-sky-500 text-white max-w-full py-2.5 px-6 rounded-md font-semibold mt-3 w-full lg:w-[10rem]"
              onClick={changePath}
            >
              パスを変換
            </button>
          </div>

          {resultPath && (
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex items-center gap-4">
                <ResultMessage />
                <p className="text-sm font-bold">変換しました</p>
              </div>
              <div className="code p-2.5 rounded-md max-w-full bg-white w-full h-[10rem] break-all">{resultPath}</div>
            </div>
          )}
          {pathIs !== "error" && resultPath && (
            <div className="text-center mt-4">
              <Alert icon={<CheckIcon className="w-5 h-5" />} className="border-sky-400 text-sky-500 bg-sky-50">
                クリップボードにコピーしました
              </Alert>
            </div>
          )}
          {pathIs === "error" && (
            <div className="text-center mt-4">
              <Alert
                icon={<ExclamationCircleIcon className="w-5 h-5" />}
                className="border-red-400 text-red-500 bg-red-50"
              >
                パスの形式で入力してください
              </Alert>
            </div>
          )}
        </div>

        <footer className="px-4 h-8 mt-24">
          <p className="text-xs text-center">
            &copy; 2023
            <a className="hover:underline ml-2" href="https://e-joint.jp" target="_blank" rel="noreferrer">
              e-JOINT.jp
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
