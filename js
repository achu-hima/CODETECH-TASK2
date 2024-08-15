document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipes');
    const searchInput = document.getElementById('search');
    const recipeDetails = document.getElementById('details');
    const gotoAddRecipe = document.getElementById('goto-add-recipe');
    const gotoRecipeList = document.getElementById('goto-recipe-list');
    const backToFrontPage = document.getElementById('back-to-front-page');
    const backToFrontPage2 = document.getElementById('back-to-front-page-2');
    const backToRecipeList = document.getElementById('back-to-recipe-list');

    const sections = {
        frontPage: document.getElementById('front-page'),
        addRecipe: document.getElementById('add-recipe'),
        recipeList: document.getElementById('recipe-list'),
        recipeDetails: document.getElementById('recipe-details'),
    };

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const displayRecipes = () => {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.textContent = recipe.name;
            li.addEventListener('click', () => showRecipeDetails(index));
            recipeList.appendChild(li);
        });
    };

    const addRecipe = (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;
        const category = document.getElementById('category').value;

        const newRecipe = { name, ingredients, instructions, category };
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        recipeForm.reset();
        displayRecipes();
        showSection('recipeList');
    };

    const showRecipeDetails = (index) => {
        const recipe = recipes[index];
        recipeDetails.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong></p>
            <p>${recipe.ingredients}</p>
            <p><strong>Instructions:</strong></p>
            <p>${recipe.instructions}</p>
            <p><strong>Category:</strong> ${recipe.category}</p>
        `;
        showSection('recipeDetails');
    };

    const searchRecipes = () => {
        const query = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query) ||
            recipe.ingredients.toLowerCase().includes(query)
        );
        displayFilteredRecipes(filteredRecipes);
    };

    const filterRecipesByCategory = () => {
        const categoryFilter = document.getElementById('category-filter').value;
        const filteredRecipes = categoryFilter === 'all' ? recipes : recipes.filter(recipe => recipe.category === categoryFilter);
        displayFilteredRecipes(filteredRecipes);
    };

    const displayFilteredRecipes = (filteredRecipes) => {
        recipeList.innerHTML = '';
        filteredRecipes.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.textContent = recipe.name;
            li.addEventListener('click', () => showRecipeDetails(index));
            recipeList.appendChild(li);
        });
    };

    const showSection = (section) => {
        Object.values(sections).forEach(sec => sec.classList.add('hidden'));
        sections[section].classList.remove('hidden');
    };

    recipeForm.addEventListener('submit', addRecipe);
    searchInput.addEventListener('input', searchRecipes);
    document.getElementById('category-filter').addEventListener('change', filterRecipesByCategory);
    
    gotoAddRecipe.addEventListener('click', () => showSection('addRecipe'));
    gotoRecipeList.addEventListener('click', () => showSection('recipeList'));
    backToFrontPage.addEventListener('click', () => showSection('frontPage'));
    backToFrontPage2.addEventListener('click', () => showSection('frontPage'));
    backToRecipeList.addEventListener('click', () => showSection('recipeList'));

    // Initial display of front page
    showSection('frontPage');
});
