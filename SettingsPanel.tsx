import React, { useState } from 'react';
import Button from '../ui/Button';

const SettingsPanel = () => {
  const [mode, setMode] = useState('standard');
  const [intensity, setIntensity] = useState(0.7);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    perplexity: 0.6,
    burstiness: 0.8,
    vocabularyDiversity: 0.7,
    sentenceVariation: 0.6,
    addHumanElements: true,
    preserveFormatting: true
  });

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntensity(parseFloat(e.target.value));
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleAdvancedSettingChange = (setting: string, value: number | boolean) => {
    setAdvancedSettings({
      ...advancedSettings,
      [setting]: value
    });
  };

  const handleHumanize = () => {
    // This would call the API in a real implementation
    console.log('Humanizing with settings:', {
      mode,
      intensity,
      ...advancedSettings
    });
    
    // For now, we'll just show an alert
    alert('Humanization feature will be implemented in the backend phase');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Humanization Settings</h2>
        <Button 
          onClick={toggleAdvanced} 
          variant="outline"
          className="text-sm"
        >
          {showAdvanced ? 'Hide Advanced' : 'Advanced'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode
          </label>
          <select
            value={mode}
            onChange={handleModeChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="standard">Standard</option>
            <option value="academic">Academic</option>
            <option value="creative">Creative</option>
            <option value="casual">Casual</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Humanization Intensity: {intensity.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={intensity}
            onChange={handleIntensityChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
      
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Advanced Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perplexity: {advancedSettings.perplexity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={advancedSettings.perplexity}
                onChange={(e) => handleAdvancedSettingChange('perplexity', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Burstiness: {advancedSettings.burstiness.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={advancedSettings.burstiness}
                onChange={(e) => handleAdvancedSettingChange('burstiness', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vocabulary Diversity: {advancedSettings.vocabularyDiversity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={advancedSettings.vocabularyDiversity}
                onChange={(e) => handleAdvancedSettingChange('vocabularyDiversity', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sentence Variation: {advancedSettings.sentenceVariation.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={advancedSettings.sentenceVariation}
                onChange={(e) => handleAdvancedSettingChange('sentenceVariation', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          
          <div className="flex space-x-6 mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={advancedSettings.addHumanElements}
                onChange={(e) => handleAdvancedSettingChange('addHumanElements', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Add Human Elements</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={advancedSettings.preserveFormatting}
                onChange={(e) => handleAdvancedSettingChange('preserveFormatting', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Preserve Formatting</span>
            </label>
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <Button 
          onClick={handleHumanize} 
          variant="primary"
          className="px-8 py-3 text-lg"
        >
          Humanize Text
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
