
import React from "react";
import { File } from "../contexts/FileContext";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";

interface FileCardProps {
  file: File;
  onDelete: (id: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onDelete }) => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  return (
    <div className="file-card rounded-lg border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="aspect-square bg-muted">
        {isImage && (
          <img 
            src={file.thumbnail} 
            alt={file.name} 
            className="w-full h-full object-cover"
          />
        )}
        {isVideo && (
          <div className="relative w-full h-full">
            <img 
              src={file.thumbnail} 
              alt={file.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 w-12 h-12 flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 bg-card">
        <p className="font-medium truncate" title={file.name}>{file.name}</p>
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
          <span>{formatDate(file.createdAt)}</span>
          <span>{formatSize(file.size)}</span>
        </div>
      </div>
      <div className="file-card-overlay">
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={handleDownload}
        >
          <Download size={18} />
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={() => onDelete(file.id)}
        >
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
