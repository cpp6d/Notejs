const Folders = require('../db/db').Folders
const Users = require('../db/db').Users

const addFolder = (folderName, userId) => {
  return Folders
    .create({folderName: folderName})
      .then((newFolder) => {
        const folder = newFolder
        return Users.findOne({
          where: {id: userId}
        })
        .then((user) => {
          return folder.setUsers(user)
            .then(data => {
              return data
            })
        })
      })
      .catch((err) => {
        console.err('Error in creating folder of ', err)
      })
}

const getUserFolders = (userId) => {
  return Users
    .findOne({
      where: {id: userId}
    })
    .then(user => {
      return user.getFolders({})
    })
    .catch((err) => {
      return err
    })
}

const deleteFolder = (folderId) => {
  return Folders.findOne({
    where: {id: folderId}
  })
    .then(folder => {
      folder.destroy()
    })
    .catch((err) => {
      return err
    })
}

const updateFolderName = (folderId, newName) => {
  return Folders
    .findOne({
      where: {
        id: folderId
      }
    })
    .then(folder => {
      return folder
        .update({
          folderName: newName
        })
    })
    .catch((err) => {
      return err
    })
}

const getFoldersNotes = (folderId) => {
  return Folders.findOne({
    where: {id: folderId}
  })
  .then((folder) => {
    return folder.getNotes({})
  })
  .catch((err) => {
    return err
  })
}

module.exports = {
  addFolder: addFolder,
  deleteFolder: deleteFolder,
  updateFolderName: updateFolderName,
  getUserFolders: getUserFolders,
  getFoldersNotes: getFoldersNotes
}
