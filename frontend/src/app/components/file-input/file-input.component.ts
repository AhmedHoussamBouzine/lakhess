import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-file-input",
  standalone: true,
  imports: [],
  templateUrl: "./file-input.component.html",
})
export class FileInputComponent implements OnInit {
  _id: string = "";

  @Input() extensions: string[] = [];
  @Input() multiple: boolean = false;

  @Output() filesSelected = new EventEmitter<File[]>();

  inputSelectedFiles: File[] = [];
  urls: string[] = [];

  ngOnInit(): void {
    this._id = Math.random().toString(36).substring(2);
  }

  onFilesSelected(event: any) {
    // If there is no file selected, exit
    if (!event.target.files) return;
    const files = event.target.files;

    // Store the selected files
    this.inputSelectedFiles.push(...files);

    // Create files preview
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }

    // Emit the selected files
    this.filesSelected.emit(this.inputSelectedFiles);
  }

  removeFiles(index: number) {
    this.urls.splice(index, 1);
    this.inputSelectedFiles.splice(index, 1);

    // Emit the selected files
    this.filesSelected.emit(this.inputSelectedFiles);
  }
}
