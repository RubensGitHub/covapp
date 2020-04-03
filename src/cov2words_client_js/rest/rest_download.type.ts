import {saveAs} from 'file-saver/FileSaver';

export class RestDownload {

  constructor (private fileName: string,
               private contents: Blob) { }

  ////////

  getFileName (): string {
    // As a fileName enquoted in "" will result in Chrome and Firefox wrapping the fileName in underscores
    return this.fileName.replace (/"/g, '');
  }

  getContents (): Blob {
    return this.contents;
  }

  download () {
    saveAs (this.getContents (), this.getFileName ());
  }

}
