'use strict';
import express from 'express';

import initializePassaport from '../config/passport'

import AuthenticationController from '../controllers/authentication';
import ProfileController from '../controllers/profile';
import PostController from '../controllers/post';
import CategoryController from '../controllers/category';

// Middleware to require login/auth
// const requireAuth = passport.authenticate('jwt', {session: false});
const requireAuth = initializePassaport();

// Constants for role types
const REQUIRE_ADMIN = 'Admin';
const REQUIRE_OWNER = 'Owner';
const REQUIRE_CLIENT = 'Client';
const REQUIRE_MEMBER = 'Member';

module.exports = function (app) {

  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const admRoutes = express.Router();
  const blogRoutes = express.Router();
  const profileRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', AuthenticationController.login);

  //=========================
  // Profile Routes
  //=========================

  apiRoutes.use('/profile', profileRoutes);

  // Get Profile Info
  profileRoutes.get('/me/:userId', requireAuth, ProfileController.userMe);

  profileRoutes.put('/me', requireAuth, ProfileController.editMe);

  //=========================
  // Adm Routes
  //=========================

  apiRoutes.use('/adm', admRoutes);

  /* Post Routes */

  admRoutes.get('/posts', requireAuth, PostController.getPosts);

  admRoutes.get('/post/:postId', requireAuth, PostController.getPost);

  admRoutes.post('/post', requireAuth, PostController.createPost);

  admRoutes.put('/post/:postId', requireAuth, PostController.editPost);

  admRoutes.delete('/post/:postId', requireAuth, PostController.delPost);

  /* END Post Routes */

  /* Category Routes */

  admRoutes.get('/categories', requireAuth, CategoryController.getCategories);

  admRoutes.get('/category/:categoryId', requireAuth, CategoryController.getCategory);

  admRoutes.post('/category', requireAuth, CategoryController.createCategory);

  admRoutes.put('/category/:categoryId', requireAuth, CategoryController.editCategory);

  admRoutes.delete('/category/:categoryId', requireAuth, CategoryController.deleteCategory);

  /* END Category Routes */

  //=========================
  // BLOG Routes
  //=========================

  apiRoutes.use('/blog', blogRoutes);

  blogRoutes.get('/posts', PostController.getPosts);

  blogRoutes.get('/post/:postUrl', PostController.getPostURL);

  app.get('/api', function (req, res, next) {

    res.status(200).send('API works!');

  });

  // Set url for API group routes
  app.use('/api', apiRoutes);
};