import { GenericModel } from './genericModel';

export class ProfileDialogModel {

  image: File;
  path: string;
  response: GenericModel;

  constructor(image?: File, path?: string) {
    this.image = image;
    this.path = path;
  }
}
