import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalBlob } from '../../backend';

interface ArtworkUploadProps {
  onUpload: (blob: ExternalBlob) => void;
}

export default function ArtworkUpload({ onUpload }: ArtworkUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to blob
    setIsUploading(true);
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
      setUploadProgress(percentage);
    });

    onUpload(blob);
    setIsUploading(false);
  };

  const handleClear = () => {
    setPreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 transition-colors bg-gradient-to-br from-orange-50 to-pink-50"
        >
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-gray-700 font-medium mb-2">Click to upload artwork</p>
          <p className="text-sm text-gray-500">PNG, JPG, or GIF (max 10MB)</p>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border-2 border-orange-200"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleClear}
          >
            <X size={18} />
          </Button>
          {isUploading && uploadProgress < 100 && (
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 rounded p-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center mt-1 text-gray-600">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
