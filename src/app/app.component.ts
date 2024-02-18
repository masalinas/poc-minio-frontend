import { Component, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { FileUploadService } from '../app/service/FileUploadService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {
  selectedFiles?: FileList;
  progressInfos: any = {};
  message: string[] = [];  

  fileInfos?: Observable<any>;

  uploadedFiles: any[] = [];
  
  @ViewChild('fileUpload', {static: false}) 
  fileUpload: any;

  constructor(private uploadService: FileUploadService, private messageService: MessageService) {}

  private selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(files: File[]): void {
    this.uploadService.upload(files).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          console.log(percentDone);
          //this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          console.log(event);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);

          // clear files loaded
          this.fileUpload.clear();

          // send a info toast
          this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});  
        }
      },
      error: (err: any) => {
        /*this.progressInfos[idx].value = 0;
        let msg = file.name + ": Failed!";

        if (err.error && err.error.message) {
          msg += " " + err.error.message;
        }

        this.message.push(msg);
        this.fileInfos = this.uploadService.getFiles();*/

        console.error(err);                
      }
    });
  }

  uploadFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];  
    
    for(let file of event.files) {
      this.uploadedFiles.push(file);

      this.progressInfos[file.name ] = { value: 0 };
    }
  
    this.upload(this.uploadedFiles);  
  }
}
