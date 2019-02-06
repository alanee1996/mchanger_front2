import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProfileDialogModel } from '../Models/ProfileImgModel';
import { UserService } from '../Services/user-service.service';

@Component({
  selector: 'app-profile-img-dialog',
  templateUrl: './profile-img-dialog.component.html',
  styleUrls: ['./profile-img-dialog.component.css']
})
export class ProfileImgDialogComponent {

  public inProgress = false;
  public url: any = null;

  constructor( public dialogRef: MatDialogRef<ProfileImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogModel, private userService: UserService) {
     }

     onNoClick(): void {
      this.dialogRef.close();
     }

  onBrowse(fileBtn: HTMLElement) {
    fileBtn.click();
  }

  fileOnChange(fileElement: any) {
    if (fileElement.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.url = (<FileReader>e.target).result;
      };
      reader.readAsDataURL(fileElement.files[0]);
      this.data.image = fileElement.files[0];
    }
  }

  async upload(event) {
    event.preventDefault();
    this.inProgress = true;
    await this.userService.uploadProfileImage(this.data)
    .toPromise().then((d) => {
      this.data.response = d;
    });
    this.dialogRef.close(this.data);
  }
}
