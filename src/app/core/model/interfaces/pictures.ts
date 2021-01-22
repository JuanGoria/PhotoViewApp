export interface PicturesPage {
  pictures: Array<PictureThumbnail>,
  page: number;
  pageCount: number;
  hasMore: boolean;
}

export interface PictureThumbnail {
  id: string;
  cropped_picture: string;
}

export interface Picture {
  id: string;
  author: string;
  camera: string;
  tags: string,
  cropped_picture: string;
  full_picture: string;
}
