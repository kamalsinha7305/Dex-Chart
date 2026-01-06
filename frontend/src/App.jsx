import DexChart from "./components/DexChart"

function App() {

  return (
    <>
      <div className="min-h-screen bg-[#0b0e11] text-gray-200 p-6">
      <h1 className="text-xl text-[red] font-semibold mb-4">
        Solana DEX Chart
      </h1>

      <div className="bg-[#111827] rounded-xl p-4 shadow-lg">
         <DexChart /> 
      </div>
    </div>
    </>
  )
}

export default App
