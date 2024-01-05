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
            where: { project_id: project_id, deleted: false },
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
            where: { user_id: user_id, deleted: false },
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
                where: { user_id: user_id, deleted: false },
                order: [[sortby, 'DESC']],
            })
        } else if (sortby == "private" || sortby == "public") {
            projects = await Project.findAll({
                where: { user_id: user_id, deleted: false, status: sortby },
            })
        }
        
        res.status(200).json(projects)
    } catch (error) {
        console.log("simp gai 808:", error);
        console.error(error);
    }
}

import { _formatDateString } from "./userController";
async function getAllProject(req, res) {
    const attr_sort = req.query.attr_sort
    const order_by = req.query.order_by;
    const deleted = req.query.deleted == '' ? false : (req.query.deleted == "true" ? true : false);

    console.log(deleted)
  
    try {
      let projects = await Project.findAll({
        attributes: {
          exclude: ['password', 'html_code', 'js_code', 'css_code', 'type_css'],
          include: [
            [Sequelize.literal('(SELECT user_name FROM user WHERE user_id = project.user_id)'), 'user_name'],
            [Sequelize.literal('(SELECT count(like_id) FROM like_table WHERE like_table.project_id = project.project_id)'), 'numlike'],
            [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE view_table.project_id = project.project_id)'), 'numview'],
            [Sequelize.literal('(SELECT count(comment_id) FROM comment_table WHERE comment_table.project_id = project.project_id)'), 'numcomment'],
          ],
        },
        where: { deleted: deleted },
        order: attr_sort != '' ? [[attr_sort, order_by || 'ASC']] : undefined,
      });
  
      projects = projects.map(project => ({
        ...project.toJSON(),
        id: project.project_id,
        name: (project.name == null ? "Untitled" : project.name),
        createdAt: _formatDateString(project.createdAt),
        updatedAt: _formatDateString(project.updatedAt),
      }));
  
      res.status(200).json(projects);
    } catch (error) {
      console.log("chan gai 808", error);
    }
  }

  async function removeProject(req, res) {
    const project_id = req.body.project_id;
    try {
        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await project.update({ deleted: true });

        res.status(200).json({ message: 'Project removed successfully' });
    } catch (error) {
        console.error('Error removing project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function restoreProject(req, res) {
    const project_id = req.body.project_id;

    try {
        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await project.update({ deleted: false });

        res.status(200).json({ message: 'Project restored successfully' });
    } catch (error) {
        console.error('Error restoring project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function toggleProjectStatus(req, res) {
    const { project_id } = req.body;
  
    try {
      const existingProject = await Project.findOne({ where: { project_id: project_id, deleted: false } });
  
      if (!existingProject) {
        return res.status(404).json({ code: 404, message: 'Không tìm thấy project' });
      }
  
      // Toggle the status between 'public' and 'private'
      existingProject.status = existingProject.status === 'public' ? 'private' : 'public';
      await existingProject.save();
  
      return res.status(200).json({ code: 200, project: existingProject, message: 'Change project status successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, error: 'Error during project state transition' });
    }
  }

  async function checkProjectStatus(req, res) {
    const { project_id } = req.body;
  
    try {
      const project = await Project.findByPk(project_id, { where: { deleted: false } });
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      return res.status(200).json({ status: project.status, message: 'Lấy trạng thái project thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

module.exports = {
    createProject,
    getFolderChild,
    getFileChild,
    getInfoProject,
    getProjectByUserID,
    getProjectByUserSort,
    getAllProject,
    removeProject,
    restoreProject,
    toggleProjectStatus,
    checkProjectStatus,
};