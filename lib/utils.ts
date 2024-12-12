// source: https://developer.chrome.com/blog/how-to-convert-arraybuffer-to-and-from-string/
export function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function ab2str(buf: ArrayBuffer) {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}

/**
 * Select file(s).
 * @param {String} contentType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 *
 * credit: https://stackoverflow.com/users/4170935/yairopro
 */
export function selectFile(contentType: string, multiple: boolean) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = () => {
      const files = Array.from(input.files as FileList);

      // Read file content
      const readFiles = (file: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);

          reader.readAsText(file);
        });
      };

      if (multiple) {
        Promise.all(files.map(readFiles)).then(resolve).catch(reject);
      } else {
        readFiles(files[0]).then(resolve).catch(reject);
      }
    };

    input.click();
  });
}
