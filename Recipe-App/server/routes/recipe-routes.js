import express, { Router } from 'express' ;
import { addRecipe, getAllRecipes, updateRecipe ,getById, deleteRecipe,getByUserId, SearchItems  } from '../controllers/recipe-controller';

const recipeRouter = express.Router() ;

recipeRouter.get('/',getAllRecipes) ;
recipeRouter.post('/add',addRecipe) ;
recipeRouter.put('/update/:id', updateRecipe);
recipeRouter.get('/:id',getById) ;
recipeRouter.delete('/:id',deleteRecipe) ; // colon is for declaring the variable
recipeRouter.get('/user/:id' ,getByUserId) ;
recipeRouter.get('/items/searchitem',SearchItems);


export default recipeRouter ;