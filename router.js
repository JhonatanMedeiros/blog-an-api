const AuthenticationController = require('./controllers/authentication'),
    PostController = require('./controllers/post'),
    CategoryController = require('./controllers/category'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Constants for role types
const REQUIRE_ADMIN = "Admin",
    REQUIRE_OWNER = "Owner",
    REQUIRE_CLIENT = "Client",
    REQUIRE_MEMBER = "Member";

module.exports = function(app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        admRoutes = express.Router();

    //=========================
    // Auth Routes
    //=========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', AuthenticationController.login);

    // Token route
    authRoutes.get('/o/token', AuthenticationController.token);

    //Profile
    authRoutes.get('/me', requireAuth, AuthenticationController.userMe);

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



    app.get('/api', function (req, res, next) {

        res.status(200).send('API works!');
        
    });

    // Set url for API group routes
    app.use('/api', apiRoutes);
};