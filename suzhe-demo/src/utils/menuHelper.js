import _ from "lodash";

// xx.menu.path.name => /path/name
export const menuFilter = (string, baseURL) => {
  // place.myList   /system-cc

  if (_.isEmpty(string)) return "";
  const arr = _.split(string, ".");
  // arr = ["place", "myList"]
  const path = _.slice(arr, 1);
  // path = place
  return `${baseURL}/${_.join(path, "/")}`;
  // /system-cc/place
};
