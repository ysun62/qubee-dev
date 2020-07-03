export function sortFiles(models, attribute, direction) {
  models.sort((model1, model2) => {
    if (attribute === 'name') {
      return _sortByString(model1.name, model2.name, direction);
    } else if (attribute === 'createdDate') {
      return _sortByDate(model1.createdDate, model2.createdDate, direction);
    } else if (attribute === 'size') {
      return _sortByNumber(model1.size || 0, model2.size || 0, direction);
    }
  });
}

function _sortByString(name1, name2, direction) {
  if (name1.localeCompare(name2) > 0) {
    return direction === 'ASC' ? 1 : -1;
  } else if (name1.localeCompare(name2) < 0) {
    return direction === 'ASC' ? -1 : 1;
  } else {
    return 0;
  }
}

function _sortByDate(date1, date2, direction) {
  if (date1 > date2) {
    return direction === 'ASC' ? 1 : -1;
  } else if (date1 < date2) {
    return direction === 'ASC' ? -1 : 1;
  } else {
    return 0;
  }
}

function _sortByNumber(size1, size2, direction) {
  if (size1 < size2) {
    return direction === 'ASC' ? -1 : 1;
  } else if (size1 > size2) {
    return direction === 'ASC' ? 1 : -1;
  } else {
    return 0;
  }
}
