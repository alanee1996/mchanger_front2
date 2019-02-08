import { FileUploadModel } from './file-upload-model';

export class GenericModel<T> {
  data: T;
  status: string;
  message: string;
  fileResponse: FileUploadModel;
  pagination: Pagination;
}

export class Pagination {
  currentPage: Number;
  nextPage: Number;
  totalPage: Number;
  pageSize: Number;
  haveNext: boolean;
}
