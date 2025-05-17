
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FileUploader from "../components/FileUploader";
import FileGallery from "../components/FileGallery";
import { useAuth } from "../contexts/AuthContext";
import { FileProvider } from "../contexts/FileContext";

const Dashboard: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <FileProvider>
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">Your Media Files</h1>
          
          <div className="mb-8">
            <FileUploader />
          </div>
          
          <FileGallery />
        </main>
      </div>
    </FileProvider>
  );
};

export default Dashboard;
