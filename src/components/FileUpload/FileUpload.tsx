import { useState } from "react";
import { useBEM } from "@/utils/component/useBEM";
import SvgIcon from "../SvgIcon/SvgIcon";
import Image from "../Image/Image";
import "./FileUpload.scss";

/**
 * Component for handling file uploads, displaying an interactive dropzone or selection button.
 * @param {string} ctaCopy - The text label for the upload button or call-to-action.
 * @param {string} accept - A comma-separated list of allowed file extensions or MIME types.
 * @param {(files: string[]) => void} [onFileSelect] - Optional callback triggered when files are successfully selected.
 */
type FileUploadProps = {
  ctaCopy: string;
  accept: string;
  onFileSelect?: (files: string[]) => void;
};

export default function FileUpload({
  ctaCopy,
  accept,
  onFileSelect,
}: FileUploadProps) {
  const b = useBEM("file-upload");

  const [files, setFiles] = useState<string[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);

    const uploadPromises = filesArray.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "references_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsirfm9gd/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      return data.secure_url;
    });

    try {
      const newUploadedUrls = await Promise.all(uploadPromises);

      setFiles((prev) => {
        const updatedFiles = [...prev, ...newUploadedUrls];

        if (onFileSelect) onFileSelect(updatedFiles);

        return updatedFiles;
      });
    } catch (error) {
      console.error("Error al subir las imágenes a Cloudinary:", error);
    }
  };

  const handleRemove = (url: string) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((f) => f !== url);
      if (onFileSelect) onFileSelect(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div className={b()}>
      <p className={b("accept")}>{accept}</p>
      {files.length > 0 && (
        <div className={b("file-preview")}>
          {files.map((file) => (
            <div key={file}>
              <SvgIcon
                classname={b("icon-close")}
                icon="close"
                onClick={() => handleRemove(file)}
              />
              <Image
                classname={b("preview")}
                src={file}
                alt="Uploaded reference preview"
                borderRadius="sm"
              />
            </div>
          ))}
        </div>
      )}
      <label className={b("btn")}>
        <SvgIcon classname={b("icon-upload")} icon="upload" size={20} />
        <input
          className={b("file-upload")}
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleChange}
          multiple
        />
        {ctaCopy}
      </label>
    </div>
  );
}
