import React from 'react';
import { Award, TrendingUp, Lightbulb, Target, Star, BarChart3 } from 'lucide-react';
import { Feedback, InterviewDomain } from '../types/interview';

interface FeedbackDisplayProps {
  feedback: Feedback;
  domain: InterviewDomain;
  onStartNew: () => void;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ 
  feedback, 
  domain, 
  onStartNew 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getSkillScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
          <Award className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Interview Complete!
        </h2>
        <p className="text-gray-600">
          Here's your comprehensive feedback for the {domain.title} interview
        </p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-3xl font-bold ${getScoreColor(feedback.score)}`}>
            <Star className="w-8 h-8 mr-3" />
            {feedback.score}/100
          </div>
          <p className="text-xl font-semibold text-gray-900 mt-3">
            {getScoreText(feedback.score)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Feedback</h3>
          <p className="text-gray-700 leading-relaxed">
            {feedback.overallFeedback}
          </p>
        </div>
      </div>

      {/* Skill Breakdown */}
      {feedback.skillBreakdown && feedback.skillBreakdown.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Skill Assessment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedback.skillBreakdown.map((skill, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getSkillScoreColor(skill.score)}`}>
                    {skill.score}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillScoreColor(skill.score)}`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
                
                <p className="text-sm text-gray-600">
                  {skill.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-3">
            {feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-lg">•</span>
                <span className="text-gray-700 leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {feedback.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 text-lg">•</span>
                <span className="text-gray-700 leading-relaxed">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-purple-100 rounded-lg mr-3">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Recommended Next Steps</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedback.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStartNew}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Practice Again
        </button>
        <button
          onClick={() => window.print()}
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
        >
          Save Feedback
        </button>
      </div>
    </div>
  );
};