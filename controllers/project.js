'use strict'
var Project = require('../models/project');

var fs = require('fs');

var path= require('path');

var controller = {

    home : function (req, res) {
        return res.status(200).send({
            message : 'Soy el home'
        });
    },

    test: function (req , res) {
        return res.status(200).send({
            message: "Soy el metodo que se ejecuta con esta ruta"
        })
    },

    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year= params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored)=>{
            if (err) return res.status(500).send({
                message: "Hubo error en la operacion"
            });
            if(!projectStored) return res.status(404).send({message:'No se pudo guardar el proyecto'});

            return res.status(200).send({
                project: projectStored
            });
        })
    },

    getProject: function (req,res) {
        var   projectId = req.params.id ;

        if(projectId == null) return res.status(404).send({message: "El proyecto no existe"});

        Project.findById(projectId, (err,project)=>{
            if(err) return res.status(500).send({message:"Error al buscar el proyecto"});

            if(!project) return res.status(404).send({message:"El proyecto no existe"});

            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function (req, res) {
        
        Project.find({}).sort('-year').exec((err, projects) =>{
            if(err) return res.status(500).send({message: "Ocurrio un error en el proceso"});

            if(!projects) return res.status(404).send({message: "No se encontraron proyectos"});

            return res.status(200).send({
                projects
            })
        });
    },
    updateProjects: function (req, res) {
        
        var projectId= req.params.id;
        var update =req.body;

        Project.findByIdAndUpdate(projectId, update ,{new:true}, (err, project)=>{
            if(err) return res.status(500).send({message:"Error al actualizar"});
            if(!project) return res.status(404).send({message:"No se pudo encontrar el proyecto"});

            return res.status(200).send({
                project
            })
        })
    },

    deleteProjects: function (req , res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId,(err, projectRemove)=>{
            if(err) return res.status(500).send({message: "Ocurrio un error y no se pudo eliminar el proyecto"});
            if (!projectRemove) return res.statud(404).send({message: "No se encontro el proyecto para eliminar"});

            return res.status(200).send({
                project: projectRemove
            })
        })
    },

    uploadImage: function (req , res) {
        var projectId = req.params.id;
        var fileName = "Imagen no subida...";

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName= fileSplit[1];
            var extFile= fileName.split('\.');
            var fileExt = extFile[1];

            if (fileExt == 'png' || fileExt == 'jpg'|| fileExt == 'jpeg' || fileExt == 'gif') {
                
                Project.findByIdAndUpdate(projectId, {image: fileName},{new:true},(err, projectImg)=>{
                    if(err) return res.status(500).send({message:"La imagen no se ha subido"});
    
                    if(!projectImg) return res.status(404).send({message:"El proyecto no existe o no pudo ser encontrado"});
    
                    return res.status(200).send({
                        project: projectImg
                    })
                })
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message: 'La conexion no es valida'});
                })
            }

        }else{
            return res.status(200).send({message: fileName});
        }

    },
    getImageFile: function (req, res) {
        var file= req.params.image;
        var path_file ='./uploads/'+ file;
        fs.exists(path_file,(exists)=>{
            if (exists) {
                return res.sendfile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message:"No existe la imagen..."
                });
            }
        });
    }

};

module.exports = controller;
