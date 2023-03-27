export type BaseStats = {
  dev: number;
  ino: number;
  mode: number;
  nlink: number;
  uid: number;
  gid: number;
  rdev: number;
  size: number;
  blksize: number;
  blocks: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isFIFO: boolean;
  isSocket: boolean;
  isSymbolicLink: boolean;
};

export type RequiredStats = BaseStats & {
  isDirectory: boolean;
  isFile: boolean;
};

export type FileStats = BaseStats &
  RequiredStats & {
    isDirectory: false;
    isFile: true;
  };

export type DirectoryStats = BaseStats &
  RequiredStats & {
    isDirectory: true;
    isFile: false;
  };

export type BaseFile = FileStats & {
  name: string;
  path: string;
};

export type BinaryFile = BaseFile & {
  type: 'binary';
  binary: string;
};

export type TextFile = BaseFile & {
  type: 'text';
  text: string;
};

export type File = BinaryFile | TextFile;

export type Directory = DirectoryStats & {
  name: string;
  path: string;
  children: File[];
};

export type VirtualFileStats = {
  isDirectory: false;
  isFile: true;
};

export type VirtualBaseFile = VirtualFileStats & {
  name: string;
};

export type VirtualBinaryFile = VirtualBaseFile & {
  type: 'binary';
  binary: string;
};

export type VirtualTextFile = VirtualBaseFile & {
  type: 'text';
  text: string;
};

export type VirtualFile = VirtualBinaryFile | VirtualTextFile;

export type VirtualDirectoryStats = {
  isDirectory: true;
  isFile: false;
};

export type VirtualDirectory = VirtualDirectoryStats & {
  name: string;
  path: string;
  children: File[];
};
