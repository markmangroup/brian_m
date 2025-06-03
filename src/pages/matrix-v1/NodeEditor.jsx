import React, { useState, useEffect } from 'react';
import MatrixLayout, { MatrixButton, MatrixInput } from '../../components/MatrixLayout';
import { realMatrixNodes } from './realMatrixFlow';
import { SceneNode, DialogueNode, ChoiceNode, EndingNode } from './CustomNode';
import { calculateNodeQuality } from '../../utils/nodeQualitySystem';

const nodeTypes = {
  scene: SceneNode,
  dialogue: DialogueNode,
  choice: ChoiceNode,
  ending: EndingNode
};

function NodePreview({ node }) {
  if (!node) return null;
  const Component = nodeTypes[node.type] || SceneNode;
  return (
    <div className="mt-2">
      <Component data={node.data} />
    </div>
  );
}

export default function NodeEditor() {
  const [selectedId, setSelectedId] = useState('');
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (!selectedId) return;
    const stored = JSON.parse(localStorage.getItem('nodeEditorDrafts') || '{}');
    const saved = stored[selectedId];
    const base = realMatrixNodes.find(n => n.id === selectedId);
    setDraft(saved || JSON.parse(JSON.stringify(base)));
  }, [selectedId]);

  const updateData = (field, value) => {
    setDraft(d => ({ ...d, data: { ...d.data, [field]: value } }));
  };

  const updateEnhancement = (field, value) => {
    setDraft(d => ({
      ...d,
      data: {
        ...d.data,
        enhancement: { ...(d.data.enhancement || {}), [field]: value }
      }
    }));
  };

  const handleSave = () => {
    const drafts = JSON.parse(localStorage.getItem('nodeEditorDrafts') || '{}');
    drafts[selectedId] = draft;
    localStorage.setItem('nodeEditorDrafts', JSON.stringify(drafts));
  };

  const handleSuggest = () => {
    const quality = calculateNodeQuality(draft);
    updateEnhancement('qualityRating', quality.overall);
    updateEnhancement('priority', quality.priority);
  };

  const featureString = (draft && draft.data.features)
    ? Object.keys(draft.data.features).filter(k => draft.data.features[k]).join(', ')
    : '';

  const setFeatureString = str => {
    const obj = {};
    str.split(',').map(s => s.trim()).filter(Boolean).forEach(k => { obj[k] = true; });
    updateData('features', obj);
  };

  return (
    <MatrixLayout withRain={false} contentClassName="p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Node Editor</h1>
        <div>
          <label className="block mb-1">Select Node</label>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            className="input-theme px-3 py-2 rounded w-full"
          >
            <option value="">-- choose --</option>
            {realMatrixNodes.map(n => (
              <option key={n.id} value={n.id}>{n.id}</option>
            ))}
          </select>
        </div>

        {draft && (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Status</label>
                <select
                  value={draft.data.status || 'stub'}
                  onChange={e => updateData('status', e.target.value)}
                  className="input-theme px-3 py-2 rounded w-full"
                >
                  <option value="stub">Stub</option>
                  <option value="wip">WIP</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Quality</label>
                <MatrixInput
                  type="number"
                  value={draft.data.enhancement?.qualityRating || 0}
                  onChange={e => updateEnhancement('qualityRating', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Priority</label>
                <select
                  value={draft.data.enhancement?.priority || 'MEDIUM'}
                  onChange={e => updateEnhancement('priority', e.target.value)}
                  className="input-theme px-3 py-2 rounded w-full"
                >
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1">Summary</label>
              <textarea
                value={draft.data.summary || ''}
                onChange={e => updateData('summary', e.target.value)}
                className="input-theme w-full h-24 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Dialogue (one per line)</label>
              <textarea
                value={(draft.data.dialogue || []).join('\n')}
                onChange={e => updateData('dialogue', e.target.value.split('\n'))}
                className="input-theme w-full h-24 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Features</label>
              <MatrixInput
                value={featureString}
                onChange={e => setFeatureString(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-3">
              <MatrixButton onClick={handleSave}>Save Draft</MatrixButton>
              <MatrixButton variant="secondary" onClick={handleSuggest}>Suggest Score</MatrixButton>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="text-xl font-bold">Dashboard Preview</h2>
                <p>Status: {draft.data.status}</p>
                <p>Quality: {draft.data.enhancement?.qualityRating || 0}/10</p>
                <p>Priority: {draft.data.enhancement?.priority || 'MEDIUM'}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">D3 Preview</h2>
                <NodePreview node={draft} />
              </div>
            </div>
          </>
        )}
      </div>
    </MatrixLayout>
  );
}
