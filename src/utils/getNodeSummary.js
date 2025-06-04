export const getNodeSummary = (data, currentWorld, getWorldDialogueFn = null) => {
  if (!data) return null;
  if (data.summary) return data.summary;
  if (data.description) return data.description;
  if (data.setting) return data.setting;
  if (data.dialogue) {
    const getWorldDialogue = getWorldDialogueFn || ((d) => (Array.isArray(d) ? d : Object.values(d).flat()));
    const lines = Array.isArray(data.dialogue)
      ? data.dialogue.length
      : getWorldDialogue(data.dialogue, currentWorld).length;
    if (lines > 0) return `${lines} dialogue line${lines !== 1 ? 's' : ''}`;
  }
  return null;
};
