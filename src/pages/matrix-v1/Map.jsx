import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function Map() {
  const [diagram, setDiagram] = useState('');
  const diagramRef = useRef(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/matrix-flow.mmd')
      .then(res => res.text())
      .then(setDiagram)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (diagram && diagramRef.current) {
      mermaid.initialize({ startOnLoad: false });
      mermaid.render('matrixFlowMap', diagram, svg => {
        diagramRef.current.innerHTML = svg;
      });
    }
  }, [diagram]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Matrix Story Map</h1>
      <div className="bg-white text-black p-4 rounded shadow-lg inline-block max-w-full overflow-auto">
        <div ref={diagramRef} />
      </div>
    </div>
  );
}
