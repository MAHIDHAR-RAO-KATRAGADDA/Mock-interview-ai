import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { InterviewDomain, InterviewSettings } from '../types/interview';

interface SkillSelectorProps {
  domain: InterviewDomain;
  onSkillsSelected: (skills: string[], settings: InterviewSettings) => void;
  onBack: () => void;
}

export const SkillSelector: React.FC<SkillSelectorProps> = ({ 
  domain, 
  onSkillsSelected, 
  onBack 
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [settings, setSettings] = useState<InterviewSettings>({
    numberOfQuestions: 8,
    includeFollowUps: true,
    difficulty: 'mixed'
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleContinue = () => {
    if (selectedSkills.length === 0) {
      setSelectedSkills(domain.skills); // Select all if none selected
    }
    onSkillsSelected(selectedSkills.length > 0 ? selectedSkills : domain.skills, settings);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Customize Your {domain.title} Interview
          </h2>
          <p className="text-gray-600">
            Select the skills you want to focus on and configure your interview settings
          </p>
        </div>

        {/* Skill Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Skills to Focus On
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Choose specific skills or leave empty to include all skills
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {domain.skills.map((skill) => (
              <div
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedSkills.includes(skill)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{skill}</span>
                  {selectedSkills.includes(skill) && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Settings */}
        <div className="mb-8 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Interview Settings
          </h3>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Questions
            </label>
            <select
              value={settings.numberOfQuestions}
              onChange={(e) => setSettings(prev => ({ ...prev, numberOfQuestions: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5 Questions (15-20 min)</option>
              <option value={8}>8 Questions (25-30 min)</option>
              <option value={10}>10 Questions (35-40 min)</option>
              <option value={12}>12 Questions (45-50 min)</option>
            </select>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              value={settings.difficulty}
              onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mixed">Mixed Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Follow-up Questions */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.includeFollowUps}
                onChange={(e) => setSettings(prev => ({ ...prev, includeFollowUps: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Include follow-up questions for deeper evaluation
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              Follow-up questions provide more comprehensive feedback but extend interview time
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-blue-900 mb-2">Interview Summary</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Skills:</strong> {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'All skills'}</li>
            <li>• <strong>Questions:</strong> {settings.numberOfQuestions} main questions</li>
            <li>• <strong>Follow-ups:</strong> {settings.includeFollowUps ? 'Enabled' : 'Disabled'}</li>
            <li>• <strong>Difficulty:</strong> {settings.difficulty}</li>
            <li>• <strong>Estimated Time:</strong> {settings.numberOfQuestions * (settings.includeFollowUps ? 4 : 3)}-{settings.numberOfQuestions * (settings.includeFollowUps ? 6 : 4)} minutes</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Back to Setup
          </button>
          
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Start Interview</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};