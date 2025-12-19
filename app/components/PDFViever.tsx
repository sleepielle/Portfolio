import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Styles (required)
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ pdfRoute }: { pdfRoute: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="border border-black/30" style={{ height: "750px" }}>
          <Viewer fileUrl={pdfRoute} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    </div>
  );
};

export default PDFViewer;
