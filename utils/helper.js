/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';

export const getUserFromAuth = async (req) => {
  // get authorization value from request
  const auth = req.headers.authorization || null;
  // checks if authorization is null
  if (!auth) {
    return null;
  }

  // make array from auth: ['authType', 'authValue']
  const authParts = auth.split(' ');
  // checks authorization values
  if (authParts.length !== 2 || authParts[0] !== 'Basic') {
    return null;
  }

  // Decode the Base64-encoded part of the Authorization header
  //   (authParts[1]) to obtain the authentication token
  const token = Buffer.from(authParts[1], 'base64').toString();
  // Find the index of the colon (':') in the decoded token
  const sepIdx = token.indexOf(':');

  // Extract the email and password from the decoded token based on the colon's position
  const email = token.substring(0, sepIdx);
  const password = token.substring(sepIdx + 1);

  // Query the database to find a user with the extracted email
  const user = await (await dbClient.getUsersCollection()).findOne({ email });
  // check user Info
  if (!user || sha1(password) !== user.password) {
    return null;
  }

  // return user
  return user;
};

export const getUserByToken = async (req) => {
  // get user token
  const token = req.headers['x-token'];
  // checks if user token is null
  if (!token) {
    return null;
  }

  // get user id from redis
  const currentUserId = await redisClient.get(`auth_${token}`);
  // checks if user id is null
  if (!currentUserId) {
    return null;
  }

  // get user by ID from users collection
  const currentUser = await (await dbClient.getUsersCollection())
    .findOne({ _id: new mongoDBCore.BSON.ObjectId(currentUserId) });
  // return user if exists or null
  return currentUser || null;
};
