// src/components/features/SettingsPanel.tsx

import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface SettingsPanelProps {
  mode: 'standard' | 'academic' | 'creative' | 'casual';
  onModeChange: (mode: 'standard' | 'academic' | 'creative' | 'casual') => void;
  intensity: number;
  onIntensityChange: (intensity: number) => void;
  advancedSettings: {
    perplexity: number;
    burstiness: number;
    vocabularyDiversity: number;
    sentenceVariation: number;
    addHumanElements: boolean;
    preserveFormatting: boolean;
  };
  onAdvancedSettingsChange: (settings: any) => void;
  onSubmit: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  mode,
  onModeChange,
  intensity,
  onIntensityChange,
  advancedSettings,
  onAdvancedSettingsChange,
  onSubmit,
  isProcessing,
  disabled
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const handleModeChange = (newMode: 'standard' | 'academic' | 'creative' | 'casual') => {
    onModeChange(newMode);
  };
  
  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onIntensityChange(parseFloat(e.target.value));
  };
  
  const handleAdvancedSettingChange = (setting: string, value: number | boolean) => {
    onAdvancedSettingsChange({
      ...advancedSettings,
      [setting]: value
    });
  };
  
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Humanization Settings</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3">Mode</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={mode === 'standard' ? 'default' : 'outline'}
            onClick={() => handleModeChange('standard')}
            disabled={isProcessing}
            className="w-full"
          >
            Standard
          </Button>
          <Button
            variant={mode === 'academic' ? 'default' : 'outline'}
            onClick={() => handleModeChange('academic')}
            disabled={isProcessing}
            className="w-full"
          >
            Academic
          </Button>
          <Button
            variant={mode === 'creative' ? 'default' : 'outline'}
            onClick={() => handleModeChange('creative')}
            disabled={isProcessing}
            className="w-full"
          >
            Creative
          </Button>
          <Button
            variant={mode === 'casual' ? 'default' : 'outline'}
            onClick={() => handleModeChange('casual')}
            disabled={isProcessing}
            className="w-full"
          >
            Casual
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="text-md font-medium">Humanization Intensity</h3>
          <span className="text-sm text-gray-500">{Math.round(intensity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={intensity}
          onChange={handleIntensityChange}
          disabled={isProcessing}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>Subtle</span>
          <span>Balanced</span>
          <span>Aggressive</span>
        </div>
      </div>
      
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={toggleAdvanced}
          disabled={isProcessing}
          className="w-full"
        >
          {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </Button>
      </div>
      
      {showAdvanced && (
        <div className="mb-6 space-y-4 border-t border-gray-200 pt-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Perplexity</label>
              <span className="text-xs text-gray-500">{Math.round(advancedSettings.perplexity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={advancedSettings.perplexity}
              onChange={(e) => handleAdvancedSettingChange('perplexity', parseFloat(e.target.value))}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Burstiness</label>
              <span className="text-xs text-gray-500">{Math.round(advancedSettings.burstiness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={advancedSettings.burstiness}
              onChange={(e) => handleAdvancedSettingChange('burstiness', parseFloat(e.target.value))}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Vocabulary Diversity</label>
              <span className="text-xs text-gray-500">{Math.round(advancedSettings.vocabularyDiversity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={advancedSettings.vocabularyDiversity}
              onChange={(e) => handleAdvancedSettingChange('vocabularyDiversity', parseFloat(e.target.value))}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Sentence Variation</label>
              <span className="text-xs text-gray-500">{Math.round(advancedSettings.sentenceVariation * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={advancedSettings.sentenceVariation}
              onChange={(e) => handleAdvancedSettingChange('sentenceVariation', parseFloat(e.target.value))}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Add Human Elements</label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={advancedSettings.addHumanElements}
                onChange={(e) => handleAdvancedSettingChange('addHumanElements', e.target.checked)}
                disabled={isProcessing}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Preserve Formatting</label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={advancedSettings.preserveFormatting}
                onChange={(e) => handleAdvancedSettingChange('preserveFormatting', e.target.checked)}
                disabled={isProcessing}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      )}
      
      <Button
        onClick={onSubmit}
        disabled={isProcessing || disabled}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Humanize Text'}
      </Button>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Mode Guide:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li><strong>Standard:</strong> Balanced approach for most content</li>
          <li><strong>Academic:</strong> Formal style for essays and papers</li>
          <li><strong>Creative:</strong> Expressive style for stories and creative writing</li>
          <li><strong>Casual:</strong> Conversational style for informal content</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPanel;
