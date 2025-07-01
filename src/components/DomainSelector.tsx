import React from 'react';
import * as Icons from 'lucide-react';
import { InterviewDomain } from '../types/interview';
import { interviewDomains } from '../data/domains';

interface DomainSelectorProps {
  onDomainSelect: (domain: InterviewDomain) => void;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({ onDomainSelect }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Interview Domain
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select the role you want to practice for. Our AI will generate relevant questions 
          and provide personalized feedback to help you excel in your next interview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewDomains.map((domain) => {
          const IconComponent = Icons[domain.icon as keyof typeof Icons] as React.ComponentType<any>;
          
          return (
            <div
              key={domain.id}
              onClick={() => onDomainSelect(domain)}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transform hover:scale-105 hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-200">
                  <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                  {domain.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {domain.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {domain.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {domain.skills.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-sm">
                    +{domain.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};