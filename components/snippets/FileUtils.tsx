import React, { ReactNode } from 'react';

import { UserPhoto } from '../../utils/BackendAPI';

// TODO maybe a list files component with potential preview
// tab if files are images.

export async function FileUploader(
  files: FileList | Array<File>,
  id: string,
  setProgress: React.Dispatch<React.SetStateAction<number>>
): Promise<void> {
  let numberFiles = files.length;

  for (let i = 0; i < numberFiles; i++) {
    let file = files[i];
    let formData = new FormData();
    formData.append("", file);
    // fire query
    const response = await UserPhoto.addPhotoToAlbum(id, formData);
    // handle result
    if (response !== "Ok") console.error(`Upload of file ${file.name} failed!`);
    else console.info(`Upload of file ${file.name} succeeded!`);
    // increase progress
    setProgress(Math.floor((i / numberFiles) * 100));
  }

  setProgress(100);
}

interface FileSelectorProps {
  children: ReactNode;
  accept: string;
  setFiles: React.Dispatch<React.SetStateAction<FileList>>;
}

export function FileSelector({
  children,
  accept,
  setFiles,
  ...rest
}: FileSelectorProps) {
  return (
    <div {...rest}>
      <input
        accept={accept}
        id="contained-button-file"
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={(e) =>
          setFiles((prev) => (e.target.files != null ? e.target.files : prev))
        }
      />
      <label htmlFor="contained-button-file">{children}</label>
    </div>
  );
}
