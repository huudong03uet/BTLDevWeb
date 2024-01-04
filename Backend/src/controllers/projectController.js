const Sequelize = require('sequelize');
const { Op } = require("sequelize");
import Pin from '../models/pin';
import Pen from '../models/pen';
import Collection from '../models/collection';
import Folder from '../models/folder';
import File from '../models/file';
import Project from '../models/project';

let createProject = async (req, res) => {
    try {
        const { project_name, project_description, user_id } = req.body;
        
        // Create a Project with the given description and associate it with the Folder
        const project = await Project.create({
          description: project_description,
          name: project_name,
          user_id: user_id,
        });
    
        res.status(201).json({ message: 'Project created successfully', project });
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


let getInfoProject = async (req, res) => {
    try {
        const project_id = req.query.project_id;
        const project = await Project.findOne({
            where: { project_id: project_id },
        });
        const folder = await Folder.findAll({
            where: {project_id: project_id}
        })
        const file = await File.findAll({
            where: {project_id: project_id}
        })

        res.status(200).json({ project, folder, file });
    } catch (error) {
        console.error('Error getting project information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


let getInfoFolder = async (folderId) => {
    const foldersInFolder = await Folder.findAll({
        where: { folder_id: folderId },
    });
    
    let fileChild = await getFileChild(folderId);
    let folderChild = await getFolderChild(folderId);

    let child = [];

    for(let i = 0; i < folderChild.length; i++) {
        child[i] = await getInfoFolder(folderChild[i].folder_id);
        folderChild[i].add(child[i]);
    }

    return { foldersInFolder, fileChild, folderChild };
};

let getFileChild = async (folderId) => {
    try {
        // Use Sequelize to get all files in the specified folder
        const filesInFolder = await File.findAll({
            where: { folder_id: folderId },
        });

        if (!filesInFolder) {
            return [];
        }

        return filesInFolder;
    } catch (error) {
        console.error('Error getting files in folder:', error);
        // You might want to throw the error here or handle it appropriately
        throw error;
    }
};

let getFolderChild = async (folderId) => {
    try {
        // Use Sequelize to get all folders in the specified folder
        const foldersInFolder = await Folder.findAll({
            where: { parent_folder: folderId },
        });

        if (!foldersInFolder) {
            return [];
        }

        return foldersInFolder;
    } catch (error) {
        console.error('Error getting folders in folder:', error);
        // You might want to throw the error here or handle it appropriately
        throw error;
    }
};


module.exports = {
    createProject, getFolderChild, getFileChild, getInfoProject
};