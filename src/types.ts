
export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  servings: string;
  prepTime: string;
}

export interface ErrorState {
  message: string;
}
