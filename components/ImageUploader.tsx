
import React, { useRef, useState } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onImageUpload: (imageFile: ImageFile | null) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, icon, onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini API inline data
        alert("File size exceeds 4MB. Please choose a smaller file.");
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
      const base64 = await fileToBase64(file);
      onImageUpload({
        base64,
        mimeType: file.type,
        name: file.name
      });
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileName(null);
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-lg font-medium text-gray-200 mb-2 text-center">{label}</label>
      <div 
        className="group aspect-w-1 aspect-h-1 w-full bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center text-gray-400 hover:border-purple-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer relative overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 p-2 text-center">
              <span className="text-white text-sm font-semibold truncate">{fileName}</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            {icon}
            <p className="mt-2">Click to upload</p>
            <p className="text-xs">PNG, JPG, WEBP (Max 4MB)</p>
          </div>
        )}
      </div>
      {previewUrl && (
         <button 
          onClick={handleRemove} 
          className="mt-2 w-full text-sm text-red-400 hover:text-red-300 transition-colors">
            Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
