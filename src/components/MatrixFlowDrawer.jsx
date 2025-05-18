import React, { useState, useEffect } from 'react';

export default function MatrixFlowDrawer() {
  const [open, setOpen] = useState(false);
  const [diagram, setDiagram] = useState('');

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/matrix-flow.mmd')
      .then(res => res.text())
      .then(setDiagram)
      .catch(() => {});
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/30 backdrop-blur-md p-2 rounded shadow-md"
        aria-label="Matrix flow diagram"
      >
        📈
      </button>

      {open && (
        <div className="fixed bottom-16 right-4 w-80 bg-white text-black rounded shadow-lg max-h-[70vh] overflow-auto">
          <div className="flex justify-between items-center p-2 border-b">
            <h2 className="font-bold">Matrix Flow</h2>
            <button onClick={() => setOpen(false)} className="text-xl font-bold" aria-label="Close">×</button>
          </div>
          <div className="p-2">
            {diagram && <pre className="mermaid text-xs">{diagram}</pre>}
          </div>
        </div>
      )}
    </div>
  );
}
