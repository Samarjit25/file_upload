
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { FileImage, Upload, Shield, Laptop } from "lucide-react";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-cloud-light/30">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-cloud-primary to-cloud-secondary bg-clip-text text-transparent">
                Store, Share, and Access
              </span>
              <br />
              Your Media Anywhere
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Simple, secure cloud storage for your photos and videos. 
              Upload, organize, and access your media from any device, anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  <Upload size={18} />
                  Start Uploading Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Login to Your Account
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for your media
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-cloud-light flex items-center justify-center mb-4">
                <FileImage className="h-6 w-6 text-cloud-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple File Management</h3>
              <p className="text-muted-foreground">
                Upload, download, and delete your media files with an intuitive interface designed for ease of use.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-cloud-light flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-cloud-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
              <p className="text-muted-foreground">
                Your files are securely stored with end-to-end encryption, ensuring your privacy is protected.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-cloud-light flex items-center justify-center mb-4">
                <Laptop className="h-6 w-6 text-cloud-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Anywhere</h3>
              <p className="text-muted-foreground">
                Access your stored media from any device with an internet connection, anywhere in the world.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SnapStash. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
