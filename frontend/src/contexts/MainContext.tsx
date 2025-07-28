"use client";

import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";

import api from "@/lib/aixos";
import { useAuth } from "./AuthContext";

interface MainContextType {
  resumeData: Record<string, any> | null;
  setResumeData: (data: Record<string, any>) => void;

  pdfUrl: string;
  setPdfUrl: (url: string) => void;

  taskId: string | null;
  setTaskId: (id: string | null) => void;

  parsed: boolean;
  setParsed: (val: boolean) => void;

  progress: number;
  setProgress: (val: number) => void;

  uploaded: boolean;
  setUploaded: (val: boolean) => void;

  totalBytes: number;
  setTotalBytes: (val: number) => void;

  isParsing: boolean;
  setIsParsing: (val: boolean) => void;

  isUploading: boolean;
  setIsUploading: (val: boolean) => void;

  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [resumeData, setResumeData] = useState<Record<string, any> | null>(
    null
  );

  const [pdfUrl, setPdfUrl] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [parsed, setParsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [totalBytes, setTotalBytes] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchParsedResumeData = async () => {
    if (user?.id) {
      const { data } = await api.get(`/resume/${user.id}`);

      if (Object.keys(data).length) {
        setResumeData(data);
      }
    }
  };

  useEffect(() => {
    fetchParsedResumeData();
  }, [user]);

  return (
    <MainContext.Provider
      value={{
        taskId,
        pdfUrl,
        parsed,
        uploaded,
        progress,
        isParsing,
        resumeData,
        totalBytes,
        isUploading,
        selectedFile,

        setTaskId,
        setPdfUrl,
        setParsed,
        setUploaded,
        setProgress,
        setIsParsing,
        setResumeData,
        setTotalBytes,
        setIsUploading,
        setSelectedFile,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
