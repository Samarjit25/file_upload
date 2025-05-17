
import React, { useState } from "react";
import FileCard from "./FileCard";
import { useFiles } from "../contexts/FileContext";
import { Button } from "@/components/ui/button";
import { Image, Video } from "lucide-react";

const FileGallery: React.FC = () => {
  const { files, deleteFile } = useFiles();
  const [filter, setFilter] = useState<"all" | "images" | "videos">("all");

  const filteredFiles = files.filter((file) => {
    if (filter === "all") return true;
    if (filter === "images") return file.type.startsWith("image/");
    if (filter === "videos") return file.type.startsWith("video/");
    return true;
  });

  const sortedFiles = [...filteredFiles].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Files
        </Button>
        <Button
          variant={filter === "images" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("images")}
          className="flex items-center gap-1"
        >
          <Image size={16} /> Images
        </Button>
        <Button
          variant={filter === "videos" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("videos")}
          className="flex items-center gap-1"
        >
          <Video size={16} /> Videos
        </Button>
      </div>

      {sortedFiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No files found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {filter !== "all"
              ? `Try changing your filter or upload new ${filter}`
              : "Upload some files to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {sortedFiles.map((file) => (
            <FileCard key={file.id} file={file} onDelete={deleteFile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileGallery;
