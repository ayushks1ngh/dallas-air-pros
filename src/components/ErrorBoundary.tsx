import { Component, type ReactNode } from "react";
import { BUSINESS } from "@/lib/constants";

interface Props { children: ReactNode }
interface State { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="text-center max-w-md">
            <h1 className="font-heading font-bold text-2xl text-foreground mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">We're sorry for the inconvenience. Please try refreshing the page.</p>
            <div className="space-y-3">
              <button onClick={() => window.location.reload()} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Refresh Page
              </button>
              <p className="text-sm text-muted-foreground">
                Or call us: <a href={BUSINESS.phoneHref} className="text-primary font-semibold">{BUSINESS.phone}</a>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
