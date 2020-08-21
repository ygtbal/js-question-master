type File = {
  id: string;
  name: string;
};
type Folder = {
  id: string;
  name: string;
  files: File[];
};
type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  // let resultArr = [];
  const sourceIndex = list.findIndex((item) =>
    item.files.find((fileItem) => fileItem.id === source),
  );
  const foundDestinationIndex = list.findIndex((item) => item.id === destination);
  if (sourceIndex < 0) {
    throw new Error('Source is wrong');
  }
  if (foundDestinationIndex < 0) {
    throw new Error('Destination is wrong');
  }
  if (list[sourceIndex].id === destination) {
    throw new Error('You cannot move a file to same folder');
  }
  const foundFileItem: File = list[sourceIndex].files.find((item) => item.id === source)!;
  const foundFileItemIndex = list[sourceIndex].files.findIndex(
    (item) => item.id === foundFileItem.id,
  );
  list[foundDestinationIndex].files.push(foundFileItem);
  list[sourceIndex].files.splice(foundFileItemIndex, 1);
  return list;
}
