'use strict'

var express = require('express');
var ProjectController= require ('../controllers/project');

var router = express.Router();

var multyPart= require('connect-multiparty');
var multipartMiddleware = multyPart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/edit-project/:id', ProjectController.updateProjects);
router.delete('/delete-project/:id', ProjectController.deleteProjects);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports= router;
