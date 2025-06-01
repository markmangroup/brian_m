import React from 'react';

export default function SidebarFilters({
  show,
  onClose,
  searchInputRef,
  searchQuery,
  setSearchQuery,
  searchMatchCount,
  activeFilterCount,
  resetAllFilters,
  filterOptions,
  filteredOptions,
  collapsedSections,
  toggleSection,
  activeCharacterFilters,
  activePuzzleFilters,
  activeInteractionFilters,
  activeFeatureFilters,
  toggleCharacterFilter,
  togglePuzzleFilter,
  toggleInteractionFilter,
  toggleFeatureFilter,
  itemMatchesSearch,
}) {
  return (
    <div
      className={`bg-black/95 border-r border-green-400/30 transition-all duration-300 ease-in-out flex-shrink-0 ${show ? 'w-80' : 'w-0'} overflow-hidden`}
    >
      <div className="w-80 max-h-[90vh] flex flex-col">
        <div className="px-3 py-2 border-b border-green-400/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-mono text-green-400 font-bold">🎛️ Filters</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
        </div>
        <div className="px-3 py-2 border-b border-gray-600/20">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Filter nodes... (Press / to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1 text-sm bg-[#111827] border border-cyan-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && <div className="text-xs text-cyan-400 mt-1">{searchMatchCount} matches found</div>}
        </div>
        {activeFilterCount > 0 && (
          <div className="px-3 py-1.5 bg-purple-900/20 border-b border-purple-400/30">
            <div className="text-purple-400 font-mono text-[10px] font-bold mb-1">
              Active: {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
            </div>
            <button onClick={resetAllFilters} className="text-[10px] text-red-300 hover:text-red-100 transition-colors">
              ✕ Clear All
            </button>
          </div>
        )}
        <div className="flex-1 overflow-auto px-3 py-2 space-y-3">
          {filterOptions.characters.length > 0 && (
            <div>
              <button
                onClick={() => toggleSection('characters')}
                className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
              >
                <span className="text-sm">🎭</span>
                <span className="text-purple-400 font-mono text-xs font-bold flex-1">
                  Characters {searchQuery && `(${filteredOptions.characters.length})`}
                </span>
                <span className="bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  {activeCharacterFilters.length}
                </span>
                <span className={`text-xs transition-transform ${collapsedSections.characters ? 'rotate-0' : 'rotate-90'}`}>▶</span>
              </button>
              {!collapsedSections.characters && (
                <div className="grid grid-cols-1 gap-1.5 ml-4">
                  {filteredOptions.characters.map((character) => (
                    <button
                      key={character.name}
                      onClick={() => toggleCharacterFilter(character.name)}
                      className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                        activeCharacterFilters.includes(character.name)
                          ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                          : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                              itemMatchesSearch(character.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                            }`
                      }`}
                    >
                      <span className="truncate">{character.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                          activeCharacterFilters.includes(character.name)
                            ? 'bg-cyan-700 text-cyan-100'
                            : 'bg-cyan-900/60 text-cyan-400'
                        }`}
                      >
                        {character.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {filterOptions.puzzles.length > 0 && (
            <div>
              <button
                onClick={() => toggleSection('puzzles')}
                className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
              >
                <span className="text-sm">🧩</span>
                <span className="text-yellow-400 font-mono text-xs font-bold flex-1">
                  Puzzles {searchQuery && `(${filteredOptions.puzzles.length})`}
                </span>
                <span className="bg-yellow-900/40 text-yellow-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  {activePuzzleFilters.length}
                </span>
                <span className={`text-xs transition-transform ${collapsedSections.puzzles ? 'rotate-0' : 'rotate-90'}`}>▶</span>
              </button>
              {!collapsedSections.puzzles && (
                <div className="grid grid-cols-1 gap-1.5 ml-4">
                  {filteredOptions.puzzles.map((puzzle) => (
                    <button
                      key={puzzle.name}
                      onClick={() => togglePuzzleFilter(puzzle.name)}
                      className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                        activePuzzleFilters.includes(puzzle.name)
                          ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                          : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                              itemMatchesSearch(puzzle.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                            }`
                      }`}
                    >
                      <span className="truncate">{puzzle.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                          activePuzzleFilters.includes(puzzle.name)
                            ? 'bg-cyan-700 text-cyan-100'
                            : 'bg-cyan-900/60 text-cyan-400'
                        }`}
                      >
                        {puzzle.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {filterOptions.interactions.length > 0 && (
            <div>
              <button
                onClick={() => toggleSection('interactions')}
                className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
              >
                <span className="text-sm">🎬</span>
                <span className="text-blue-400 font-mono text-xs font-bold flex-1">
                  Interactions {searchQuery && `(${filteredOptions.interactions.length})`}
                </span>
                <span className="bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  {activeInteractionFilters.length}
                </span>
                <span className={`text-xs transition-transform ${collapsedSections.interactions ? 'rotate-0' : 'rotate-90'}`}>▶</span>
              </button>
              {!collapsedSections.interactions && (
                <div className="grid grid-cols-1 gap-1.5 ml-4">
                  {filteredOptions.interactions.map((interaction) => (
                    <button
                      key={interaction.name}
                      onClick={() => toggleInteractionFilter(interaction.name)}
                      className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                        activeInteractionFilters.includes(interaction.name)
                          ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                          : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                              itemMatchesSearch(interaction.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                            }`
                      }`}
                    >
                      <span className="truncate">{interaction.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                          activeInteractionFilters.includes(interaction.name)
                            ? 'bg-cyan-700 text-cyan-100'
                            : 'bg-cyan-900/60 text-cyan-400'
                        }`}
                      >
                        {interaction.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {filterOptions.features.length > 0 && (
            <div>
              <button
                onClick={() => toggleSection('features')}
                className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
              >
                <span className="text-sm">💠</span>
                <span className="text-emerald-400 font-mono text-xs font-bold flex-1">
                  Features {searchQuery && `(${filteredOptions.features.length})`}
                </span>
                <span className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  {activeFeatureFilters.length}
                </span>
                <span className={`text-xs transition-transform ${collapsedSections.features ? 'rotate-0' : 'rotate-90'}`}>▶</span>
              </button>
              {!collapsedSections.features && (
                <div className="grid grid-cols-1 gap-1.5 ml-4">
                  {filteredOptions.features.map((feature) => {
                    const getFeatureIcon = (feat) => {
                      switch (feat.name) {
                        case 'hasTransition':
                          return '🌊';
                        case 'hasCombat':
                          return '⚔️';
                        case 'hasChoice':
                          return '🤔';
                        case 'hasNPC':
                          return '👤';
                        case 'hasAnimation':
                          return '✨';
                        default:
                          return '💠';
                      }
                    };
                    const getFeatureLabel = (feat) => feat.name.replace('has', '').replace(/([A-Z])/g, ' $1').trim();
                    return (
                      <button
                        key={feature.name}
                        onClick={() => toggleFeatureFilter(feature.name)}
                        className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                          activeFeatureFilters.includes(feature.name)
                            ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                            : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                                itemMatchesSearch(feature.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                              }`
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px]">{getFeatureIcon(feature)}</span>
                          <span className="truncate">{getFeatureLabel(feature)}</span>
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                            activeFeatureFilters.includes(feature.name)
                              ? 'bg-cyan-700 text-cyan-100'
                              : 'bg-cyan-900/60 text-cyan-400'
                          }`}
                        >
                          {feature.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

