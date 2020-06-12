import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_URL + "/files";

function fileUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFiles() {
  return http.get(apiEndpoint);
}

export function getFile(fileId) {
  return http.get(fileUrl(fileId));
}

export function saveFile(file) {
  if (file._id) {
    return http.put(fileUrl(file._id), file);
  }

  return http.post(apiEndpoint, file);
}

export function deleteFile(fileId) {
  return http.delete(fileUrl(fileId));
}
