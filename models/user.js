const database = require('../database/dbConfig');
const UserRole = require("./user_role");

const add = async (user, role_id=3) => {
    const newUser = await database('users').insert(user).returning('*');
    await UserRole.create(newUser.id, role_id);

    const role = await UserRole.fetch(newUser.id);
    newUser.permissions = role;
    return newUser;
};

const find = async filter => {
    const user = await database('users').where(filter).first();

    const role = await UserRole.fetch(user.id);
    user.permissions = role;
    return user;
};

// Fetch all of a single user's posts
const fetchPosts = userID => {
    return database('posts').where('user_id', userID);
};

// Can we mix these two? Should we?

// Fetch all of a single user's comments
const fetchComments = userID => {
    return database('comments').where('user_id', userID);
};

// Fetch user's liked posts
const fetchUsersLikedPosts = userID => {
    return database('liked_posts').where('user_id', userID);
};

// Fetch user's liked comments
const fetchUsersLikedComments = userID => {
    return database('liked_comments').where('user_id', userID);
};

const update = async (id, value) => {
    const {role_id} = value;
    const user = await database('users').where('id', id).update(value).returning('*');
    await UserRole.update(user.id, role_id);

    const role = await UserRole.fetch(user.id);
    user.permissions = role;
    return user;
};

// Set a user's onboarded field to true
const onboard = userID => {
    return database('users').where('id', userID).update('onboarded', 'true').returning('*');
};

module.exports = {
    add,
    find,
    fetchPosts,
    fetchComments,
    fetchUsersLikedPosts,
    fetchUsersLikedComments,
    update,
    onboard
};