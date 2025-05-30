import { useState } from 'react';

export default function ShardInit() {
  // Sentence fragments in scrambled order
  const [fragments, setFragments] = useState([
    { id: 1, text: "The signal", correct: 0 },
    { id: 2, text: "fractured upon entry,", correct: 1 },
    { id: 3, text: "leaking packets of truth", correct: 2 },
    { id: 4, text: "into the neural stream.", correct: 3 },
    { id: 5, text: "Can you restore it?", correct: 4 }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const newFragments = [...fragments];
    const draggedIndex = newFragments.findIndex(f => f.id === draggedItem.id);
    const targetIndex = newFragments.findIndex(f => f.id === targetItem.id);

    // Swap positions
    [newFragments[draggedIndex], newFragments[targetIndex]] = 
    [newFragments[targetIndex], newFragments[draggedIndex]];

    setFragments(newFragments);
    setDraggedItem(null);
    setFeedback('');
  };

  const checkOrder = () => {
    const isCorrect = fragments.every((fragment, index) => fragment.correct === index);
    
    if (isCorrect) {
      setFeedback('✅ SEQUENCE RESTORED: Neural clarity reestablished');
      setIsComplete(true);
    } else {
      const incorrectCount = fragments.filter((fragment, index) => fragment.correct !== index).length;
      setFeedback(`❌ NEURAL STATIC: ${incorrectCount} fragments displaced`);
    }
  };

  const resetFragments = () => {
    // Scramble the fragments again
    const scrambled = [...fragments].sort(() => Math.random() - 0.5);
    setFragments(scrambled);
    setFeedback('');
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl text-red-400 mb-2">[Active] Shard Initialization</h1>
        <p className="text-gray-400 text-sm mb-6">Reassemble the fragmented neural transmission</p>
        
        {/* Sentence Fragments */}
        <div className="space-y-2 mb-6">
          {fragments.map((fragment, index) => (
            <div
              key={fragment.id}
              draggable={!isComplete}
              onDragStart={(e) => handleDragStart(e, fragment)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, fragment)}
              className={`
                p-3 border rounded cursor-move transition-all
                ${isComplete 
                  ? 'border-green-400/60 bg-green-900/20' 
                  : 'border-red-400/30 bg-red-900/10 hover:border-red-400/60'
                }
                ${draggedItem?.id === fragment.id ? 'opacity-50' : ''}
              `}
            >
              <span className="text-gray-500 text-xs mr-3">{index + 1}:</span>
              <span className="text-cyan-300">{fragment.text}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={checkOrder}
            disabled={isComplete}
            className={`
              px-4 py-2 rounded border font-medium transition-all
              ${isComplete 
                ? 'border-green-400/60 bg-green-900/20 text-green-300 cursor-not-allowed'
                : 'border-red-400/60 bg-red-900/20 text-red-300 hover:bg-red-900/40'
              }
            `}
          >
            {isComplete ? 'Sequence Verified' : 'Check Order'}
          </button>

          <button
            onClick={resetFragments}
            className="px-4 py-2 rounded border border-gray-600 bg-gray-900/20 text-gray-300 hover:bg-gray-900/40 transition-all"
          >
            Scramble Again
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`
            p-3 rounded border text-sm mb-4
            ${isComplete 
              ? 'border-green-400/30 bg-green-900/10 text-green-300'
              : 'border-yellow-400/30 bg-yellow-900/10 text-yellow-300'
            }
          `}>
            {feedback}
          </div>
        )}

        {/* Success State */}
        {isComplete && (
          <div className="border border-green-400/30 p-4 rounded bg-green-900/10 text-center">
            <p className="text-green-400 mb-2">🧠 Neural transmission restored</p>
            <p className="text-gray-400 text-sm">Signal coherence achieved. Stream stabilizing...</p>
            <div className="mt-4">
              <div className="inline-block px-4 py-2 border border-cyan-400/50 rounded text-cyan-300 text-sm">
                → Ready for Shard Insert
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 text-xs text-gray-600">
          <p>💡 Drag fragments to reorder • Expected: Problem → Cause → Effect → Question</p>
        </div>
      </div>
    </div>
  );
} 