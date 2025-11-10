import { migrateRecipe } from "./createRecipeTable";

(async () => {
  await migrateRecipe();

  console.log('Toutes les migrations terminées');
})();
