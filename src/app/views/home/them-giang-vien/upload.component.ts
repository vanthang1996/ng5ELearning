import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Output, Input, EventEmitter } from '@angular/core';
import { UploadFileService } from '../../../_services/upload.service';



@Component({
  selector: 'app-upload-avatar',
  templateUrl: 'upload.component.html',
})

export class UploadAvatarComponent implements OnInit {
  public selectedFiles: FileList;
  currentFileUpload: File;
  public progress: { percentage: number } = { percentage: 0 };
  @Output() eventUp: EventEmitter<any> = new EventEmitter();
  thongbao: string;
  constructor(private uploadService: UploadFileService) { }
  ngOnInit() {
    this.thongbao = 'Đang đồng bộ lên Google Drive...';
  }
  public selectFile(event) {
    this.thongbao = 'Đang đồng bộ lên Google Drive...';
    this.selectedFiles = event.target.files;
    // console.log('selected: file', this.selectedFiles);
    this.upload();
  }
  public upload() {
    this.eventUp.emit({ submitted: { value: false } });
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      // console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        // console.log('File is completely uploaded!');
        this.thongbao = '';
        this.eventUp.emit({ res: event });
        this.eventUp.emit({ submitted: { value: true } });
      }
    });
    this.selectedFiles = undefined;
  }
}
