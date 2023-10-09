const url = '../../data/recipes.js';

export async function fetchData() {
  try {
    const { recipes } = await import(url);
    return recipes;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
