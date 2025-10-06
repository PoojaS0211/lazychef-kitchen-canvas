export interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  servings: number;
  calories: number;
  category: "vegetarian" | "non-veg" | "contains-egg";
  ingredients: string[];
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: "mediterranean-quinoa-bowl",
    title: "Mediterranean Quinoa Bowl",
    image: "/src/assets/recipe-quinoa-bowl.jpg",
    time: "25 min",
    servings: 4,
    calories: 380,
    category: "vegetarian",
    ingredients: [
      "1 cup quinoa",
      "2 cups water",
      "1 can chickpeas, drained",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, diced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "Fresh parsley, chopped",
      "Lemon juice",
      "Olive oil",
      "Salt and pepper to taste"
    ],
    steps: [
      "Rinse quinoa and cook in water according to package instructions. Let cool.",
      "In a large bowl, combine cooked quinoa, chickpeas, tomatoes, cucumber, and olives.",
      "Drizzle with olive oil and lemon juice.",
      "Season with salt and pepper to taste.",
      "Top with crumbled feta and fresh parsley.",
      "Toss gently and serve at room temperature or chilled."
    ]
  },
  {
    id: "grilled-chicken-salad",
    title: "Grilled Chicken Salad",
    image: "/src/assets/recipe-chicken-salad.jpg",
    time: "30 min",
    servings: 2,
    calories: 420,
    category: "non-veg",
    ingredients: [
      "2 chicken breasts",
      "Mixed salad greens",
      "1 cup cherry tomatoes, halved",
      "1 avocado, sliced",
      "1/4 red onion, thinly sliced",
      "Lemon juice",
      "Olive oil",
      "Garlic powder",
      "Salt and pepper"
    ],
    steps: [
      "Season chicken breasts with garlic powder, salt, and pepper.",
      "Grill chicken for 6-7 minutes per side until fully cooked.",
      "Let chicken rest for 5 minutes, then slice.",
      "In a large bowl, combine salad greens, tomatoes, avocado, and red onion.",
      "Top with sliced grilled chicken.",
      "Drizzle with olive oil and lemon juice before serving."
    ]
  },
  {
    id: "vegetable-stir-fry",
    title: "Colorful Vegetable Stir Fry",
    image: "/src/assets/recipe-stir-fry.jpg",
    time: "20 min",
    servings: 4,
    calories: 220,
    category: "vegetarian",
    ingredients: [
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "1 cup snap peas",
      "2 carrots, julienned",
      "3 cloves garlic, minced",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tsp ginger, grated",
      "Sesame seeds for garnish"
    ],
    steps: [
      "Heat sesame oil in a large wok or skillet over high heat.",
      "Add garlic and ginger, stir-fry for 30 seconds.",
      "Add carrots and broccoli, stir-fry for 3 minutes.",
      "Add bell peppers and snap peas, continue cooking for 2-3 minutes.",
      "Pour in soy sauce and toss everything together.",
      "Garnish with sesame seeds and serve hot over rice or noodles."
    ]
  },
  {
    id: "pasta-carbonara",
    title: "Classic Pasta Carbonara",
    image: "/src/assets/recipe-pasta-carbonara.jpg",
    time: "20 min",
    servings: 4,
    calories: 580,
    category: "contains-egg",
    ingredients: [
      "400g spaghetti",
      "200g bacon or pancetta, diced",
      "4 large eggs",
      "1 cup parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Black pepper",
      "Salt",
      "Fresh parsley"
    ],
    steps: [
      "Cook spaghetti according to package instructions. Reserve 1 cup pasta water.",
      "In a pan, cook bacon until crispy. Add garlic for the last minute.",
      "In a bowl, whisk eggs with parmesan cheese and black pepper.",
      "Drain pasta and add to the bacon pan (off heat).",
      "Quickly mix in the egg mixture, adding pasta water to create a creamy sauce.",
      "Serve immediately with extra parmesan and parsley."
    ]
  },
  {
    id: "greek-salad",
    title: "Fresh Greek Salad",
    image: "/src/assets/recipe-greek-salad.jpg",
    time: "15 min",
    servings: 4,
    calories: 180,
    category: "vegetarian",
    ingredients: [
      "4 tomatoes, cut into wedges",
      "1 cucumber, sliced",
      "1 red onion, thinly sliced",
      "1 cup kalamata olives",
      "200g feta cheese, cubed",
      "Olive oil",
      "Red wine vinegar",
      "Dried oregano",
      "Salt and pepper"
    ],
    steps: [
      "Combine tomatoes, cucumber, onion, and olives in a large bowl.",
      "Top with feta cheese cubes.",
      "Drizzle with olive oil and red wine vinegar.",
      "Sprinkle with dried oregano, salt, and pepper.",
      "Toss gently to combine.",
      "Let sit for 5 minutes before serving to allow flavors to meld."
    ]
  },
  {
    id: "mushroom-risotto",
    title: "Creamy Mushroom Risotto",
    image: "/src/assets/recipe-risotto.jpg",
    time: "35 min",
    servings: 4,
    calories: 420,
    category: "vegetarian",
    ingredients: [
      "1.5 cups arborio rice",
      "300g mixed mushrooms, sliced",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "4 cups vegetable broth, warm",
      "1/2 cup white wine",
      "1/2 cup parmesan cheese, grated",
      "2 tbsp butter",
      "Fresh thyme",
      "Salt and pepper"
    ],
    steps: [
      "In a large pan, melt butter and sauté onion and garlic until soft.",
      "Add mushrooms and cook until golden. Set aside half for garnish.",
      "Add rice and stir for 2 minutes until lightly toasted.",
      "Pour in white wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring constantly.",
      "When rice is creamy and al dente (about 20 minutes), stir in parmesan.",
      "Top with reserved mushrooms and fresh thyme. Serve immediately."
    ]
  }
];
