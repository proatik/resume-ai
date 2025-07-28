"use client";

type PdfViewerProps = {
  url: string;
  className?: string;
};

const PdfPreviewer = ({ url, className = "" }: PdfViewerProps) => {
  return (
    <div className={`w-full ${className}`}>
      <object
        data={url}
        type="application/pdf"
        className={`w-full h-full ${className}`}
      >
        <iframe
          src={url}
          title="no-browser-support"
          style={{ border: "none" }}
          className={`w-full h-full ${className}`}
        >
          This browser does not support PDFs.
        </iframe>
      </object>
    </div>
  );
};

export default PdfPreviewer;
