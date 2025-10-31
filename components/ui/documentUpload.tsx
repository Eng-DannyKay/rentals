import React, { useState, useCallback } from "react";
import { UploadCloud, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadProps {
  readonly title: string;
  readonly required?: boolean;
}

export default function DocumentUpload({
  title,
  required,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </h4>
      <button
        type="button"
        aria-label="Upload document"
        className={`border-2 border-dashed rounded-lg p-6 text-center bg-[#F8F9FA] transition-colors w-full ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
        {file ? (
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <File className="w-4 h-4" />
              <span>{file.name}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              aria-label="Remove file"
              onClick={() => setFile(null)}
              child={<X className="w-4 h-4" />}
            ></Button>
          </div>
        ) : (
          <div className="space-y-2 ">
            <div className="flex justify-center">
              <UploadCloud className="w-9 h-9 text-[#1A73E8]" />
            </div>
            <p className="text-sm text-[#45535F]">
             <span> Click to upload or drag and drop</span><br />
              <span className="text-[#889BA8] text-[12px]">Format: .jpeg, .png & Max file size: 25 MB</span>
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-[242px] border-[#1A73E8] text-[#1A73E8] bg-[#F8F9FA]"
              size="sm"
              aria-label="Upload Image"
              onClick={onButtonClick}
              child="Upload Image"
            ></Button>
          </div>
        )}
      </button>
    </div>
  );
}
