import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Welcome
          </h1>
          <p className="text-lg text-gray-400">
            Edit <code className="bg-gray-800 px-2 py-1 rounded text-sm text-purple-400">src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Count is {count}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-800">
          <a
            href="https://vite.dev/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <img src="/vite.svg" alt="" className="w-8 h-8" />
            <span className="text-gray-300">Explore Vite</span>
          </a>
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <img src="/react.svg" alt="" className="w-8 h-8" />
            <span className="text-gray-300">Learn React</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
