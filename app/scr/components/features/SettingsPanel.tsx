import React from 'react';
import Button from '../ui/Button';

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

export default function SettingsPanel({
  mode,
  onModeChange,
  intensity,
  onIntensityChange,
  advancedSettings,
  onAdvancedSettingsChange,
  onSubmit,
  isProcessing,
  disabled
}: SettingsPanelProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Humanization Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === 'standard'
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onModeChange('standard')}
              disabled={isProcessing}
            >
              Standard
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === 'academic'
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onModeChange('academic')}
              disabled={isProcessing}
            >
              Academic
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === 'creative'
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onModeChange('creative')}
              disabled={isProcessing}
            >
              Creative
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                mode === 'casual'
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onModeChange('casual')}
              disabled={isProcessing}
            >
              Casual
            </button>
          </div>
        </div>
        
        {/* Intensity Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Humanization Intensity
            </label>
            <span className="text-sm text-gray-500">
              {Math.round(intensity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={intensity}
            onChange={(e) => onIntensityChange(parseFloat(e.target.value))}
            className="slider w-full"
            disabled={isProcessing}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Subtle</span>
            <span>Balanced</span>
            <span>Strong</span>
          </div>
        </div>
        
        {/* Advanced Settings Toggle */}
        <div>
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            onClick={() => setShowAdvanced(!showAdvanced)}
            disabled={isProcessing}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 transition-transform ${
                showAdvanced ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        
        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 border border-gray-200 rounded-md p-4 bg-gray-50">
            {/* Perplexity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Perplexity
                </label>
                <span className="text-xs text-gray-500">
                  {Math.round(advancedSettings.perplexity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={advancedSettings.perplexity}
                onChange={(e) =>
                  onAdvancedSettingsChange({
                    ...advancedSettings,
                    perplexity: parseFloat(e.target.value),
                  })
                }
                className="slider w-full"
                disabled={isProcessing}
              />
            </div>
            
            {/* Burstiness */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Burstiness
                </label>
                <span className="text-xs text-gray-500">
                  {Math.round(advancedSettings.burstiness * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={advancedSettings.burstiness}
                onChange={(e) =>
                  onAdvancedSettingsChange({
                    ...advancedSettings,
                    burstiness: parseFloat(e.target.value),
                  })
                }
                className="slider w-full"
                disabled={isProcessing}
              />
            </div>
            
            {/* Vocabulary Diversity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Vocabulary Diversity
                </label>
                <span className="text-xs text-gray-500">
                  {Math.round(advancedSettings.vocabularyDiversity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={advancedSettings.vocabularyDiversity}
                onChange={(e) =>
                  onAdvancedSettingsChange({
                    ...advancedSettings,
                    vocabularyDiversity: parseFloat(e.target.value),
                  })
                }
                className="slider w-full"
                disabled={isProcessing}
              />
            </div>
            
            {/* Sentence Variation */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Sentence Variation
                </label>
                <span className="text-xs text-gray-500">
                  {Math.round(advancedSettings.sentenceVariation * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={advancedSettings.sentenceVariation}
                onChange={(e) =>
                  onAdvancedSettingsChange({
                    ...advancedSettings,
                    sentenceVariation: parseFloat(e.target.value),
                  })
                }
                className="slider w-full"
                disabled={isProcessing}
              />
            </div>
            
            {/* Checkboxes */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="add-human-elements"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={advancedSettings.addHumanElements}
                  onChange={(e) =>
                    onAdvancedSettingsChange({
                      ...advancedSettings,
                      addHumanElements: e.target.checked,
                    })
                  }
                  disabled={isProcessing}
                />
                <label
                  htmlFor="add-human-elements"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Add human elements (filler words, contractions)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="preserve-formatting"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={advancedSettings.preserveFormatting}
                  onChange={(e) =>
                    onAdvancedSettingsChange({
                      ...advancedSettings,
                      preserveFormatting: e.target.checked,
                    })
                  }
                  disabled={isProcessing}
                />
                <label
                  htmlFor="preserve-formatting"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Preserve original formatting
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <div>
          <Button
            onClick={onSubmit}
            disabled={disabled || isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 'Humanize Text'}
          </Button>
        </div>
      </div>
    </div>
  );
}
