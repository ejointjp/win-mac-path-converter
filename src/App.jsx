import './App.css'
import { useState } from 'react'

function App () {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [pathIs, setPathIs] = useState('')

  const changePath = (e) => {
    if (text.indexOf('\\') > -1) {
      setPathIs('win')
      const replaced = text.replace(/\\/g, '/')
      const result = 'smb:' + replaced
      setResult(result)
      navigator.clipboard.writeText(result)
    } else if (text.indexOf('/') > -1) {
      setPathIs('mac')
      const replaced = text.replace(/^smb:\/\//, '\\\\')
      const result = replaced.replace(/\//g, '\\')
      setResult(result)
      navigator.clipboard.writeText(result)
    } else {
      setPathIs('error')
      setResult('')
    }
  }
  // const ResultMessage = () => {
  //   if (pathIs === 'win') {
  //     return <span>Windows &gt;&gt; <b>Mac</b></span>
  //   } else if (pathIs === 'mac') {
  //     return <span>Mac &gt;&gt; <b>Windows</b></span>
  //   }
  // }

  const onKeyDown = (key) => {
    switch (key) {
      case 'Enter':
        changePath()
        break

      default:
        break
    }
  }

  return (
    <div className="App">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mt-10">Win - Mac Path Converter</h1>
        <p className="text-sm mt-4 text-zinc-600">WindowsとMacのPathを相互に変換</p>
        <div className="my-10 flex flex-col items-center">
          <input
            className="border p-2.5 rounded-md max-w-full"
            name="input"
            type="text"
            placeholder="Win または Macのパスを入力してEnter"
            size="100"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => onKeyDown(e.key)}
            autoFocus={true}
          />
          <button
            className="bg-sky-500 text-white w-[10rem] max-w-full py-2.5 px-6 rounded-md font-semibold mt-4"
            onClick={changePath}>
            パスを変換
          </button>
        </div>
        {
          pathIs === 'error' &&
          <p className="border border-red-200 bg-red-50 text-red-600 text-xs inline-block p-1.5 rounded">パスの形式で入力してください</p>
        }
        {
          result &&
          <>
            {/* <ResultMessage /> */}
            <p className="bg-zinc-200 p-2.5 rounded-md mt-2">{result}</p>
            {
              pathIs !== 'error' &&
              <p className="border border-sky-200 bg-sky-50 text-sky-600 text-xs inline-block p-1.5 rounded mt-3">クリップボードにコピーしました</p>
            }
          </>
        }
      </div>

      <div className="px-4 mt-24">
        <p className="text-xs">&copy; 2023 <a className="hover:underline" href="https://e-joint.jp" target="_blank" rel="noreferrer">e-JOINT.jp</a></p>
      </div>
    </div>
  )
}

export default App
