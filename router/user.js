const express=require('express');
const UserController =require('../controller/userController');
const MovieController=require('../controller/movieController');
const router=express.Router();

router.get('/getquote',UserController.getquote);
router.post('/createquote',UserController.createquote);
router.post('/register',UserController.register);
router.post('/login',UserController.login);

router.get('/getMovieList',MovieController.getMovieList);
router.get('/getMoviebyid/:id',MovieController.getMovieById);
router.post('/createMovie',MovieController.createMovie);
router.put('/updateMovie/:id',MovieController.updateMovie);
router.delete('/deleteMovie/:id',MovieController.deleteMovie);

module.exports=router;