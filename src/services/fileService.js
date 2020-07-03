import http from "./httpService";
import download from 'downloadjs';
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

export function downloadFiles(selectedData) {
  const items = Object.values(selectedData);
  const fileIds = items.filter(item => item.kind === 'FILE').map(item => item._id);
  const filename = items.length > 1 ? 'QubeeFiles.zip' : items[0].name
  return http
    .post(process.env.REACT_APP_API_URL + '/download', {
      files: fileIds,
    }, {
      responseType: 'blob'
    })
    .then(res => download(res.data, filename))
}
