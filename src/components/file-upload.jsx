import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the PLD file here ...</p>
          ) : (
            <div>
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p>Drag and drop your PLD file here, or click to select file</p>
            </div>
          )}
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => document.querySelector("input").click()}
        >
          Select File
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
