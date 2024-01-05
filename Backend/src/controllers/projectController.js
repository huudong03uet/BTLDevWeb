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
            where: { project_id: project_id }
        })
        const file = await File.findAll({
            where: { project_id: project_id }
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

    for (let i = 0; i < folderChild.length; i++) {
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

async function _getProjectByUserID(user_id) {
    try {
        let projects = Project.findAll({
            attributes: {
                include: [
                    [Sequelize.literal('(SELECT count(like_id) FROM like_table WHERE project.project_id = like_table.project_id)'), 'numlike'],
                    [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE project.project_id = view_table.project_id)'), 'numview'],
                    [Sequelize.literal('(SELECT count(comment_id) FROM comment_table WHERE project.project_id = comment_table.project_id)'), 'numcomment'],
                ]
            },
            where: { user_id: user_id },
        });

        return projects;
    } catch (error) {
        throw error
    }
}

async function getProjectByUserID(req, res) {
    const user_id = req.query.user_id;

    console.log(req.query);

    try {
        let projects = await _getProjectByUserID(user_id);

        res.status(200).json(projects);
    } catch (error) {
        console.log("simp gai 808:", error);
        res.status(500).json("oi gioi oi loi roi cuu pe");
    }
}

async function getProjectByUserSort(req, res) {
    const { user_id, sortby } = req.query;

    try {
        let projects;
        if (sortby == "numlike" || sortby == "numview") {
            projects = await Project.findAll({
                attributes: {
                    include: [
                        [Sequelize.literal('(SELECT count(like_id) FROM like_table WHERE project.project_id = like_table.project_id)'), 'numlike'],
                        [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE project.project_id = view_table.project_id)'), 'numview'],
                    ]
                },
                where: { user_id: user_id },
                order: [[sortby, 'DESC']],
            })
        } else if (sortby == "private" || sortby == "public") {
            projects = await Project.findAll({
                where: { user_id: user_id, status: sortby },
            })
        }
        
        res.status(200).json(projects)
    } catch (error) {
        console.log("simp gai 808:", error);
        console.error(error);
    }
}

module.exports = {
    createProject,
    getFolderChild,
    getFileChild,
    getInfoProject,
    getProjectByUserID,
    getProjectByUserSort,
};