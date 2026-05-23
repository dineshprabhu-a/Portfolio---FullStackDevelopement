import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] dark:bg-[#0f172a]">
          <div className="text-center px-6">
            <h1 className="text-4xl font-bold text-[#38bdf8] mb-4">Oops!</h1>
            <p className="text-[#64748b] dark:text-[#94a3b8] mb-6">
              Something went wrong. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#38bdf8] text-[#0f172a] px-6 py-3 rounded-lg font-semibold hover:bg-[#7dd3fc] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
