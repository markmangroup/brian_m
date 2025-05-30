export default function EchoLoop() {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-xl text-blue-400 mb-4">[Stub] Echo Loop</h1>
      <p className="mb-4">This is a placeholder for the Echo Loop experience.</p>
      <div className="border border-blue-400/30 p-4 rounded bg-blue-900/10">
        <h2 className="text-green-400 mb-2">🔧 Planned Features:</h2>
        <ul className="text-gray-300 space-y-1">
          <li>• Recursive conversation mechanics</li>
          <li>• Pattern detection challenges</li>
          <li>• Loop breaking interactions</li>
          <li>• Echo entity dialogue system</li>
        </ul>
      </div>
      <div className="mt-6 bg-gray-900/50 p-4 rounded">
        <div className="space-y-2">
          <p className="text-blue-300">"Did I already say that?"</p>
          <p className="text-gray-400">"You must listen harder."</p>
          <p className="text-blue-300 opacity-70">"Did I already say that?"</p>
          <p className="text-gray-400 opacity-50">"You must listen harder."</p>
          <p className="text-xs text-yellow-400 mt-4">⚡ Notice the pattern to break free...</p>
        </div>
      </div>
    </div>
  );
} 