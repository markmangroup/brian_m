import React, { useState, useMemo } from 'react';
import { realMatrixNodes } from './realMatrixFlow';
import {
  generateQualityReport,
  calculateNodeQuality,
  getNextImprovements,
  QUALITY_CRITERIA,
  ENHANCEMENT_PRIORITY
} from '../../utils/nodeQualitySystem';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

// Quality Score Circle Component
const QualityScore = ({ score, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base'
  };
  
  const getColor = (score) => {
    if (score >= 9) return 'text-green-400 border-green-400';
    if (score >= 7) return 'text-yellow-400 border-yellow-400';
    if (score >= 5) return 'text-orange-400 border-orange-400';
    return 'text-red-400 border-red-400';
  };
  
  return (
    <div className={`
      ${sizeClasses[size]} 
      ${getColor(score)}
      rounded-full border-2 
      flex items-center justify-center 
      font-bold font-mono
      animate-pulse
    `}>
      {score.toFixed(1)}
    </div>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  const config = ENHANCEMENT_PRIORITY[priority] || ENHANCEMENT_PRIORITY.MEDIUM;
  return (
    <span 
      className="px-2 py-1 rounded text-xs font-mono font-bold"
      style={{ 
        backgroundColor: config.color + '20', 
        color: config.color,
        border: `1px solid ${config.color}40`
      }}
    >
      {config.level.toUpperCase()}
    </span>
  );
};

// Node Quality Card Component
const NodeQualityCard = ({ node, onSelect }) => {
  const quality = calculateNodeQuality(node);
  const improvements = getNextImprovements(node, 3);
  
  return (
    <div 
      className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-4 hover:border-theme-accent transition-all cursor-pointer"
      onClick={() => onSelect(node)}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-theme-bright font-bold font-theme-primary">
            {node.data?.title || node.id}
          </h3>
          <p className="text-theme-muted text-sm">
            {node.type} • {node.group}
          </p>
        </div>
        <QualityScore score={quality.overall} size="sm" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={quality.priority} />
          <span className="text-theme-secondary text-xs">
            {improvements.length} improvements planned
          </span>
        </div>
        
        {improvements.slice(0, 2).map((improvement, index) => (
          <div key={index} className="text-xs text-theme-muted bg-theme-overlay p-2 rounded">
            {improvement.description}
          </div>
        ))}
      </div>
    </div>
  );
};

// Quality Criteria Breakdown
const QualityCriteriaChart = ({ nodes }) => {
  const criteriaAverages = useMemo(() => {
    const averages = {};
    Object.keys(QUALITY_CRITERIA).forEach(criterion => {
      const scores = nodes
        .map(node => node.data?.enhancement?.criteria?.[criterion] || 5)
        .filter(score => score > 0);
      averages[criterion] = scores.length > 0 
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
        : 5;
    });
    return averages;
  }, [nodes]);
  
  return (
    <div className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-6">
      <h3 className="text-xl font-bold text-theme-bright mb-4 font-theme-primary">
        Quality Criteria Breakdown
      </h3>
      
      <div className="space-y-4">
        {Object.entries(QUALITY_CRITERIA).map(([key, criteria]) => {
          const score = criteriaAverages[key];
          const percentage = (score / 10) * 100;
          
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-theme-secondary font-medium">
                  {criteria.name}
                </span>
                <span className="text-theme-accent font-bold">
                  {score.toFixed(1)}/10
                </span>
              </div>
              
              <div className="w-full bg-theme-overlay rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-theme-primary to-theme-accent transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <p className="text-xs text-theme-muted mt-1">
                {criteria.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Quality Dashboard
export default function QualityDashboard() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('quality'); // 'quality', 'priority', 'name'
  
  const report = useMemo(() => generateQualityReport(realMatrixNodes), []);
  
  const filteredNodes = useMemo(() => {
    let nodes = realMatrixNodes;
    
    // Filter by priority
    if (filterPriority !== 'all') {
      nodes = nodes.filter(node => {
        const quality = calculateNodeQuality(node);
        return quality.priority === filterPriority.toUpperCase();
      });
    }
    
    // Sort nodes
    nodes = [...nodes].sort((a, b) => {
      if (sortBy === 'quality') {
        const aQuality = calculateNodeQuality(a).overall;
        const bQuality = calculateNodeQuality(b).overall;
        return aQuality - bQuality; // Lowest quality first
      }
      if (sortBy === 'name') {
        return (a.data?.title || a.id).localeCompare(b.data?.title || b.id);
      }
      return 0;
    });
    
    return nodes;
  }, [filterPriority, sortBy]);
  
  return (
    <MatrixLayout withRain={false}>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-theme-bright mb-2 font-theme-primary">
            Node Quality Dashboard
          </h1>
          <p className="text-theme-secondary">
            Systematic approach to making each Matrix node a 10/10 experience
          </p>
        </div>
        
        {/* Quality Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-6 text-center">
            <QualityScore score={report.averageQuality} size="lg" />
            <h3 className="text-theme-bright font-bold mt-2">Average Quality</h3>
            <p className="text-theme-muted text-sm">Overall rating across all nodes</p>
          </div>
          
          <div className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-theme-accent">{report.totalNodes}</div>
            <h3 className="text-theme-bright font-bold mt-2">Total Nodes</h3>
            <p className="text-theme-muted text-sm">Story components tracked</p>
          </div>
          
          <div className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-400">{report.qualityDistribution.low}</div>
            <h3 className="text-theme-bright font-bold mt-2">Need Improvement</h3>
            <p className="text-theme-muted text-sm">Nodes scoring &lt; 6/10</p>
          </div>
          
          <div className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{report.qualityDistribution.high}</div>
            <h3 className="text-theme-bright font-bold mt-2">High Quality</h3>
            <p className="text-theme-muted text-sm">Nodes scoring ≥ 8/10</p>
          </div>
        </div>
        
        {/* Quality Criteria Chart */}
        <QualityCriteriaChart nodes={realMatrixNodes} />
        
        {/* Filters and Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div>
              <label className="text-theme-secondary text-sm font-medium mr-2">Priority:</label>
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-theme-secondary text-theme-bright border border-theme-primary rounded px-3 py-1 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            
            <div>
              <label className="text-theme-secondary text-sm font-medium mr-2">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-theme-secondary text-theme-bright border border-theme-primary rounded px-3 py-1 text-sm"
              >
                <option value="quality">Quality (Low to High)</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
          
          <div className="text-theme-muted text-sm">
            Showing {filteredNodes.length} of {realMatrixNodes.length} nodes
          </div>
        </div>
        
        {/* Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNodes.map(node => (
            <NodeQualityCard 
              key={node.id} 
              node={node} 
              onSelect={setSelectedNode}
            />
          ))}
        </div>
        
        {/* Selected Node Detail Modal */}
        {selectedNode && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-theme-secondary border-2 border-theme-primary rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-theme-bright font-theme-primary">
                  {selectedNode.data?.title || selectedNode.id}
                </h2>
                <MatrixButton 
                  onClick={() => setSelectedNode(null)}
                  variant="danger"
                  size="sm"
                >
                  ✕
                </MatrixButton>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <QualityScore score={calculateNodeQuality(selectedNode).overall} />
                  <div>
                    <p className="text-theme-secondary">
                      <strong>Type:</strong> {selectedNode.type} • <strong>Group:</strong> {selectedNode.group}
                    </p>
                    <p className="text-theme-muted text-sm">
                      {selectedNode.data?.summary || 'No summary available'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-theme-bright mb-2">Planned Improvements</h3>
                  <div className="space-y-2">
                    {getNextImprovements(selectedNode, 5).map((improvement, index) => (
                      <div key={index} className="bg-theme-overlay p-3 rounded border border-theme-accent">
                        <div className="flex justify-between items-start mb-2">
                          <PriorityBadge priority={improvement.priority} />
                          <span className="text-xs text-theme-muted">{improvement.estimatedEffort}</span>
                        </div>
                        <p className="text-theme-secondary text-sm">{improvement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MatrixLayout>
  );
} 