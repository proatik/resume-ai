"use client";

import toast from "react-hot-toast";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

import api from "@/lib/aixos";
import { getBaseUrl } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import PdfPreview from "@/components/PdfPreviewer";
import { useMainContext } from "@/contexts/MainContext";

const ResumeUploader = () => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    taskId,
    pdfUrl,
    parsed,
    uploaded,
    progress,
    isParsing,
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
  } = useMainContext();

  const resetStats = () => {
    setProgress(0);
    setTotalBytes(0);
    setParsed(false);
    setUploaded(false);
    setIsUploading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      setSelectedFile(null);
      alert("Please select a valid PDF file.");
      return;
    }

    resetStats();
    setSelectedFile(file);
    setTotalBytes(file.size);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      resetStats();
      setIsUploading(true);

      const { data, status } = await api.post(
        `/resume/upload/${user?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total ?? 0;
            const uploadedBytes = progressEvent.loaded;
            const progress = (uploadedBytes / total) * 100;

            setProgress(progress);
          },
        }
      );

      if (status === 201) {
        setUploaded(true);
        setTaskId(data.task_id);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Resume upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (!taskId) return;

    const baseUrl = getBaseUrl();
    const eventSource = new EventSource(`${baseUrl}/progress/${taskId}`);

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.status === "started") {
        setIsParsing(true);
        toast.success("Resume parsing is in progress");
      }

      if (data.done) {
        setParsed(true);
        setIsParsing(false);

        setResumeData(data.result);
        eventSource.close();
        toast.success("Resume parsed successfully");
      }
    };

    eventSource.onerror = (e) => {
      setIsParsing(false);
      console.error("SSE error: ", e);
    };

    return () => {
      eventSource.close();
    };
  }, [taskId]);

  return (
    <Fragment>
      <div
        className={`flex flex-col ${
          pdfUrl ? "h-screen" : "h-auto"
        } w-full max-w-4xl mx-auto gap-2 p-5 border rounded-md shadow-lg border-zinc-800 bg-zinc-900/50 my-6`}
      >
        <div className="flex items-end w-full gap-3 mb-2">
          <div className="flex-1">
            <label className="hidden mx-1 my-2 text-base font-medium text-dark">
              Upload PDF
            </label>
            <input
              type="file"
              accept=".pdf"
              multiple={false}
              disabled={isUploading}
              onChange={handleFileChange}
              className="w-full font-medium text-teal-700 transition border rounded-md outline-none cursor-pointer bg-zinc-900 file:text-slate-200 border-zinc-800 border-stroke text-body-color file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:bg-zinc-800 file:py-1 file:px-5 file:text-body-color file:hover:bg-zinc-700 file:transition hover:border-zinc-700 focus:border-primary active:border-primary file:disabled:bg-zinc-800 disabled:hover:border-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 file:disabled:cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleFileUpload}
            disabled={!selectedFile || isUploading}
            className="px-5 py-1 transition bg-teal-700 border border-teal-700 rounded-md cursor-pointer hover:bg-teal-600 hover:border-teal-600 disabled:hover:border-teal-700 disabled:hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Upload & Parse
          </button>
        </div>

        {selectedFile && (
          <div className="relative flex items-stretch w-full gap-3">
            <div className="flex items-center justify-between flex-1 h-full px-3 border rounded-md border-zinc-800">
              <span className="text-sm">Upload</span>

              {(isUploading || uploaded) && (
                <span className="text-sm">
                  {parseInt(progress.toString())}%
                </span>
              )}

              {isUploading && (
                <span className="inline-block w-4 h-4 border-[3px] border-green-600 rounded-full border-t-transparent animate-spin" />
              )}

              {uploaded && (
                <CircleCheck
                  size={18}
                  strokeWidth={3}
                  className="text-green-600"
                />
              )}
            </div>
            <div className="flex items-center justify-between flex-1 h-full px-3 border rounded-md border-zinc-800">
              <span className="text-sm">Parse</span>

              {isParsing && (
                <span className="inline-block w-4 h-4 border-[3px] border-green-600 rounded-full border-t-transparent animate-spin" />
              )}

              {parsed && (
                <CircleCheck
                  size={18}
                  strokeWidth={3}
                  className="text-green-600"
                />
              )}
            </div>

            <button
              onClick={() => router.push("/parsed-resume")}
              disabled={!uploaded || !parsed || isUploading}
              className="px-5 py-1 transition bg-indigo-700 border border-indigo-700 rounded-md cursor-pointer hover:bg-indigo-600 hover:border-indigo-600 disabled:border-zinc-700 disabled:bg-zinc-700 disabled:hover:border-zinc-700 disabled:hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Parsed Resume
            </button>

            <button
              onClick={() => router.push("/ai-chat")}
              disabled={!uploaded || !parsed || isUploading}
              className="px-5 py-1 transition border rounded-md cursor-pointer bg-sky-700 border-sky-700 hover:bg-sky-600 hover:border-sky-600 disabled:border-zinc-700 disabled:bg-zinc-700 disabled:hover:border-zinc-700 disabled:hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              AI Chat
            </button>
          </div>
        )}

        {pdfUrl && <PdfPreview url={pdfUrl} className="my-4 rounded-md grow" />}
      </div>
    </Fragment>
  );
};

export default ResumeUploader;
