import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mermaid from 'mermaid';
import MatrixRain from '../../components/MatrixRain';

export default function Map() {
  const [diagram, setDiagram] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const diagramRef = useRef(null);
  const location = useLocation();

  // Hardcoded minimal diagram for debugging
  const HARDCODED_DIAGRAM = `graph TD\n  A[Start] --> B[End]`;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      flowchart: {
        curve: 'basis',
        padding: 20,
        htmlLabels: true,
        useMaxWidth: true,
      },
      themeVariables: {
        darkMode: true,
        fontFamily: 'monospace',
        fontSize: '16px',
      },
    });

    // Fetch the diagram content
    fetch(process.env.PUBLIC_URL + '/anomaly-route.mmd')
      .then(res => res.text())
      .then(text => {
        console.log('[MatrixV1 Map] Loaded diagram from file:', text);
        setDiagram(text);
      })
      .catch((err) => {
        console.error('[MatrixV1 Map] Error loading diagram:', err);
        setDiagram('');
      });
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    // Try rendering the loaded diagram, then fallback to hardcoded
    let toRender = diagram && diagram.trim().length > 0 ? diagram : HARDCODED_DIAGRAM;
    console.log('[MatrixV1 Map] Rendering diagram:', toRender);
    if (diagramRef.current) {
      try {
        mermaid.render('anomalyRouteMap', toRender, svg => {
          diagramRef.current.innerHTML = svg;
          // Add hover effects and tooltips
          const nodes = diagramRef.current.querySelectorAll('.node');
          nodes.forEach(node => {
            const nodeId = node.id;
            const isCurrentPath = nodeId.toLowerCase().includes(currentPath.replace(/\//g, '-').toLowerCase());
            if (isCurrentPath) {
              node.classList.add('animate-pulse');
              node.style.filter = 'brightness(1.2)';
            }
            const title = node.querySelector('title');
            if (title) {
              node.setAttribute('data-tooltip', title.textContent);
            }
          });
        });
      } catch (err) {
        console.error('[MatrixV1 Map] Mermaid render error:', err);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<div style="color:red">Mermaid render error: ' + err + '</div>';
        }
      }
    }
  }, [diagram, currentPath]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 p-4 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Anomaly Route Map</h1>
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg shadow-lg w-full overflow-auto">
          <div ref={diagramRef} className="mermaid-diagram" />
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Current path: {currentPath || 'Not in route'}
        </p>
      </div>
    </div>
  );
}
