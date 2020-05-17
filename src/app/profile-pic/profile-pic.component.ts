import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private requests : UserService) { 
    
 
  }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  console.log(event)

    this.croppedImage = event.base64
    


}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

upload(){

  // var blob = new Blob([this.croppedImage], {type: 'image/png'});
  var file = new File([this.dataURItoBlob(this.croppedImage)], 'filename.png');
  // const formData: FormData = new FormData();
 
  console.log(file)
  let data ={

    file : file
  }
  this.requests.uploadProfileImage(file)
  .subscribe((response)=>{

  },(error)=>{

  })


}
dataURItoBlob(dataURI): Blob {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
}


