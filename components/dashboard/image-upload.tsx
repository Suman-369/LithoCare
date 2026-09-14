"use client";

import { useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange?: (files: File[]) => void;
}

export function ImageUpload({ maxImages = 3, onImagesChange }: ImageUploadProps) {
  const [images, setImages] = useState<{ url: string; file: File }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newImages: { url: string; file: File }[] = [];
    const filesArray = Array.from(files);
    
    for (const file of filesArray) {
      if (images.length + newImages.length >= maxImages) break;
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newImages.push({ url, file });
      }
    }
    
    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages].slice(0, maxImages);
      setImages(updatedImages);
      onImagesChange?.(updatedImages.map(img => img.file));
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
    onImagesChange?.(newImages.map(img => img.file));
  };

  return (
    <div className="space-y-4">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragging 
            ? "border-black bg-gray-50" 
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp" 
          multiple 
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <UploadCloud className="w-6 h-6 text-gray-500" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mb-1">Upload battery photos</h4>
        <p className="text-xs text-gray-500 mb-4">PNG, JPG or WEBP • Max 5MB</p>
        <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          Select images
        </span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
              <img
                src={img.url} 
                alt={`Upload preview ${i + 1}`} 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-400 font-medium text-xl">+</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
