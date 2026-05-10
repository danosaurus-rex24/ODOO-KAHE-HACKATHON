import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import "./index.css";

class RenderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  state = { hasError: false, message: "" };

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown) {
    console.error("React render error", error);
    if (error instanceof Error) {
      this.setState({ message: error.stack ?? error.message });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: "#ef4444", color: "white", padding: 16 }}>
          <strong>DASHBOARD WORKING</strong>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RenderErrorBoundary>
        <AppRouter />
      </RenderErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error("React failed to render", error);
  rootElement.innerHTML =
    '<div style="background:#ef4444;color:white;padding:16px;font-family:system-ui,sans-serif;">DASHBOARD WORKING</div>';
}
