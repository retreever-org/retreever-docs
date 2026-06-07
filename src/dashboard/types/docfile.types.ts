
export interface DocFile {
  type: "file";
  name: string;
  title: string;
  path: string;
  hidden?: boolean;
}

export interface DocFolder {
  type: "folder";
  name: string;             // Display name
  children: DocNode[];      // Recursive
}

export type DocNode = DocFolder | DocFile;
