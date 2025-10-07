import { useState, useRef, useEffect } from "react";

export default function FileUploader({ defaultImage = null, onFileSelect, clear = false }) {
  const [preview, setPreview] = useState(defaultImage);
  const fileInputRef = useRef(null);

  // Update preview when defaultImage changes
  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  // Fully reset uploader when clear is true
  useEffect(() => {
    if (clear) {
      // Revoke old preview URL if any
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      // Reset everything
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;

      // Inform parent no file is selected
      onFileSelect?.(null);
    }
  }, [clear, onFileSelect, preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous preview to avoid memory leaks
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);
      onFileSelect?.(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);
      onFileSelect?.(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="w-full max-w-md">
      <div
        className="border-2 border-dashed rounded-xl p-10 h-64 flex items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition relative"
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <p className="text-gray-500 text-lg">
            Drag & drop or <span className="text-blue-500 font-medium">click to upload</span>
          </p>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
