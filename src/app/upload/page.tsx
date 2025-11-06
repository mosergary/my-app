"use client";

import { useState } from "react";
import { processPdfFile } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPdfFile(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed successfully",
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-[#002F87]">
      {/* Header */}
      <header className="w-full bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1
                className="text-black text-2xl sm:text-3xl font-bold tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                STATE OF IDAHO
              </h1>
              <h2
                className="text-black text-lg sm:text-xl font-normal tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                JUDICIAL BRANCH
              </h2>
            </div>
            <div className="text-right">
              <h3
                className="text-black text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Document Upload
              </h3>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <Card className="bg-white rounded-xl shadow-2xl overflow-hidden border-0">
            {/* Gold accent bar */}
            <div className="h-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500]" />

            <CardContent className="pt-8 pb-8 px-8">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2
                    className="text-3xl font-bold text-black mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Upload PDF Document
                  </h2>
                  <p className="text-gray-600">
                    Upload HR policy documents to the knowledge base
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="pdf-upload"
                    className="text-black font-semibold text-lg mb-3 block"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Select PDF File
                  </Label>
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="mt-2 border-2 border-[#002F87] rounded-lg file:bg-[#FFD700] file:text-[#002F87] file:font-bold file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 hover:border-[#FFD700] transition-colors cursor-pointer"
                  />
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center gap-3 bg-blue-50 p-4 rounded-lg border-2 border-[#002F87]">
                    <Loader2 className="h-6 w-6 animate-spin text-[#002F87]" />
                    <span className="text-[#002F87] font-semibold text-lg">
                      Processing PDF...
                    </span>
                  </div>
                )}

                {message && (
                  <Alert
                    variant={
                      message.type === "error" ? "destructive" : "default"
                    }
                    className={`rounded-lg border-2 ${
                      message.type === "error"
                        ? "bg-red-50 border-red-500"
                        : "bg-green-50 border-green-500"
                    }`}
                  >
                    <AlertTitle
                      className="text-lg font-bold"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {message.type === "error" ? "Error!" : "Success!"}
                    </AlertTitle>
                    <AlertDescription className="text-base">
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Note:</strong> Only PDF files are accepted. Maximum
                    file size: 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#001F57] py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white text-sm">
            © 2025 State of Idaho Judicial Branch. All rights reserved.
          </p>
          <p className="text-[#FFD700] text-xs mt-1">ESTO PERPETUA</p>
        </div>
      </footer>
    </div>
  );
}
