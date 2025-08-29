import React, { useState, useCallback } from 'react';
import { generateRecipe } from './services/geminiService';
import type { Recipe, ErrorState } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import RecipeDisplay from './components/RecipeDisplay';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    setError(null);
    setRecipe(null);
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (e) {
      if (e instanceof Error) {
        setError({ message: e.message });
      } else {
        setError({ message: 'An unknown error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  const handleExampleClick = () => {
    setIngredients('Chicken breast, broccoli, soy sauce, garlic, ginger, rice');
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Toma
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 mt-1">
            Recipe Generator
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 italic">
            "Out of ideas what to cook? Let Toma help you."
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full">
          <div className="flex flex-col space-y-4">
            <label htmlFor="ingredients" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Your Ingredients
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., ground beef, onions, tomatoes, pasta, cheese"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 h-32 resize-none"
              disabled={isLoading}
            />
             <div className="text-sm text-gray-500 dark:text-gray-400">
              Not sure where to start? Try an <button onClick={handleExampleClick} className="text-indigo-500 hover:underline disabled:text-gray-400" disabled={isLoading}>example</button>.
            </div>
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || !ingredients}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Crafting Recipe...' : 'Generate Recipe'}
            </button>
          </div>
        </div>

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          <ErrorMessage error={error} />
          {recipe && <RecipeDisplay recipe={recipe} />}
        </div>
      </main>
    </div>
  );
};

export default App;
