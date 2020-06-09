import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_URL + "/folders";

function folderUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFolders() {
  return http.get(apiEndpoint);
}

export function getFolder(folderId) {
  return http.get(folderUrl(folderId));
}

export function saveFolder(folder) {
  if (folder._id) {
    return http.put(folderUrl(folder._id), folder);
  }

  return http.post(apiEndpoint, folder);
}

export function deleteFolder(folderId) {
  return http.delete(folderUrl(folderId));
}
