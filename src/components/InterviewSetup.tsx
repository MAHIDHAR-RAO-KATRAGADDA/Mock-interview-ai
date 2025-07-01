import React from 'react';
import { Play, Clock, MessageSquare } from 'lucide-react';
import { InterviewDomain } from '../types/interview';

interface InterviewSetupProps {
  domain: InterviewDomain;
  onStartInterview: () => void;
}

export const InterviewSetup: React.FC<InterviewSetupProps> = ({ 
  domain, 
  onStartInterview 
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {domain.title} Interview
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get ready for your mock interview session
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">5-7 Questions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tailored to your domain</p>
          </div>
          
          <div className="text-center p-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">20-30 Minutes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Realistic interview timing</p>
          </div>
          
          <div className="text-center p-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit mx-auto mb-3">
              <Play className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Instant Feedback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered analysis</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills Covered:</h4>
          <div className="flex flex-wrap gap-2">
            {domain.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Tips for Success:</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Think out loud to demonstrate your problem-solving process</li>
            <li>• Take your time to provide thoughtful, detailed answers</li>
            <li>• Ask clarifying questions when needed</li>
            <li>• Be specific with examples from your experience</li>
          </ul>
        </div>

        <button
          onClick={onStartInterview}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Play className="w-5 h-5" />
          <span>Start Interview</span>
        </button>
      </div>
    </div>
  );
};