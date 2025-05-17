
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail: string;
  createdAt: Date;
  userId: string;
}

interface FileContextType {
  files: File[];
  uploadFile: (file: globalThis.File) => Promise<void>;
  deleteFile: (id: string) => void;
  loading: boolean;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
};

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load files from localStorage on mount
  useEffect(() => {
    if (currentUser) {
      const savedFiles = localStorage.getItem(`cloudFiles-${currentUser.id}`);
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles).map((file: any) => ({
            ...file,
            createdAt: new Date(file.createdAt)
          }));
          setFiles(parsedFiles);
        } catch (error) {
          console.error("Failed to parse files:", error);
        }
      }
    } else {
      setFiles([]);
    }
    setLoading(false);
  }, [currentUser]);

  // Save files to localStorage whenever they change
  useEffect(() => {
    if (currentUser && files.length >= 0) {
      localStorage.setItem(`cloudFiles-${currentUser.id}`, JSON.stringify(files));
    }
  }, [files, currentUser]);

  const createThumbnail = async (file: globalThis.File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        resolve(URL.createObjectURL(file));
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          video.currentTime = 1; // Seek to 1 second
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        video.src = URL.createObjectURL(file);
      } else {
        // Default thumbnail for other file types
        resolve('/placeholder.svg');
      }
    });
  };

  const uploadFile = async (file: globalThis.File) => {
    if (!currentUser) {
      toast.error("You must be logged in to upload files");
      return;
    }

    setLoading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a local URL for the file
      const url = URL.createObjectURL(file);
      
      // Generate a thumbnail
      const thumbnail = await createThumbnail(file);
      
      const newFile: File = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url,
        thumbnail,
        createdAt: new Date(),
        userId: currentUser.id
      };
      
      setFiles(prevFiles => [...prevFiles, newFile]);
      toast.success(`${file.name} uploaded successfully!`);
    } catch (error) {
      toast.error("Upload failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = (id: string) => {
    if (!currentUser) {
      toast.error("You must be logged in to delete files");
      return;
    }

    try {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  const value = {
    files,
    uploadFile,
    deleteFile,
    loading
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
