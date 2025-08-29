
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 w-full animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          {recipe.recipeName}
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {recipe.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
          <div className="bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg">
              <p className="font-bold text-indigo-800 dark:text-indigo-200">Servings</p>
              <p className="text-gray-700 dark:text-gray-300">{recipe.servings}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
              <p className="font-bold text-green-800 dark:text-green-200">Prep Time</p>
              <p className="text-gray-700 dark:text-gray-300">{recipe.prepTime}</p>
          </div>
           <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg">
              <p className="font-bold text-yellow-800 dark:text-yellow-200">Ingredients</p>
              <p className="text-gray-700 dark:text-gray-300">{recipe.ingredients.length} items</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 border-b-2 border-indigo-200 dark:border-indigo-700 pb-2">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 border-b-2 border-indigo-200 dark:border-indigo-700 pb-2">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-indigo-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
