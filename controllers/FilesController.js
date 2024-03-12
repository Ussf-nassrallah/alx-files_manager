/* eslint-disable import/no-named-as-default */
import Queue from 'bull';
import { ObjectID } from 'mongodb';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from '../utils/db';
import { createFile, createFolder } from '../utils/helper';

const fileQueue = new Queue('fileQueue', 'redis://127.0.0.1:6379');

const DEFAULT_FOLDER_ID = 0;

const FILE_TYPES = {
  folder: 'folder',
  file: 'file',
  image: 'image',
};

class FilesController {
  static async postUpload(req, res) {
    // Retrieve user information from the request, as populated by middlewares
    const { user } = req;

    // Retrieve file information from the client
    const fileName = req.body ? req.body.name : null;
    const fileType = req.body ? req.body.type : null;
    const parentId = req.body && req.body.parentId ? req.body.parentId : DEFAULT_FOLDER_ID;
    const isPublic = req.body && req.body.isPublic ? req.body.isPublic : false;
    const fileData = req.body && req.body.data; // only for type=file|image

    // Check file information received from the client
    if (!fileName) {
      res.status(400).json({ error: 'Missing name' });
      return;
    }

    if (!fileType || !Object.values(FILE_TYPES).includes(fileType)) {
      res.status(400).json({ error: 'Missing type' });
      return;
    }

    if (!fileData && fileType !== FILE_TYPES.folder) {
      res.status(400).json({ error: 'Missing data' });
      return;
    }

    // Retrieve files collection from DB
    const files = await dbClient.getFilesCollection();

    if (parentId) {
      // Assuming parentId is a string containing a valid hexadecimal ObjectId
      const objId = new ObjectID(parentId);
      const parent = await files.findOne({ _id: objId, userId: user._id });

      // Check if file parent exists or not
      if (!parent) {
        res.status(400).json({ error: 'Parent not found' });
        return;
      }

      console.log(parent);

      // check if the file parent has a 'folder' type
      if (parent.type !== FILE_TYPES.folder) {
        res.status(400).json({ error: 'Parent is not a folder' });
        return;
      }
    }

    // Create a folder if the specified type is 'folder'
    if (fileType === FILE_TYPES.folder) {
      await createFolder(
        files,
        user,
        res,
        fileName,
        fileType,
        parentId,
        isPublic,
        DEFAULT_FOLDER_ID,
      );
    } else {
      await createFile(
        files,
        user,
        res,
        fileName,
        fileType,
        parentId,
        isPublic,
        fileData,
        fileQueue,
      );
    }
  }

  static async getShow(req, res) {
    const { user } = req;
    try {
      const fileId = req.params.id;
      const file = await (await dbClient.getFilesCollection()).findOne({
        _id: mongoDBCore.BSON.ObjectId(fileId),
        userId: user._id,
      });
      if (!file) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.status(201).json({
        id: file._id,
        userId: file.userId,
        name: file.name,
        type: file.type,
        isPublic: file.isPublic,
        parentId: file.parentId,
      });
    } catch (error) {
      console.log(`Error in getShow: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getIndex(req, res) {
    try {
      const { user } = req;
      const { parentId, page } = req.query;
      const pageNum = parseInt(page, 10) || 0;
      const filesCollection = await dbClient.getFilesCollection();

      const query = parentId
        ? { userId: ObjectID(user._id), parentId: ObjectID(parentId).toString() }
        : { userId: ObjectID(user._id) };

      const aggregationPipeline = [
        { $match: query },
        { $sort: { _id: -1 } },
        {
          $facet: {
            metadata: [{ $count: 'total' }, { $addFields: { page: parseInt(pageNum, 10) } }],
            data: [{ $skip: 20 * parseInt(pageNum, 10) }, { $limit: 20 }],
          },
        },
      ];

      const result = await filesCollection.aggregate(aggregationPipeline).toArray();

      if (result && result.length > 0) {
        const formattedData = result[0].data.map(({ _id, localPath, ...file }) => ({
          ...file,
          id: _id,
        }));
        return res.status(200).json(formattedData);
      }

      console.log('Error occurred');
      return res.status(404).json({ error: 'Not found' });
    } catch (error) {
      console.error('Error in getIndex:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default FilesController;
