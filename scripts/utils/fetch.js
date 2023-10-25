const url = '../../data/recipes.js';

/**
 * Fetch recipe data from a specified URL.
 *
 * @async
 * @function fetchData
 * @returns {Promise<Array>} A promise that resolves to an array of recipe data.
 * @throws {Error} If there is an issue with the fetch operation.
 */
export async function fetchData() {
  try {
    const { recipes } = await import(url);
    return recipes;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
