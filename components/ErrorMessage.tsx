
import React from 'react';
import type { ErrorState } from '../types';

interface ErrorMessageProps {
  error: ErrorState | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm-1-5a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm0-6a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V7z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold">An Error Occurred</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
