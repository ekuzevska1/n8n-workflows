import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { exportToPDF, exportToText } from '../utils/exportUtils';
import './ProposalViewer.css';

const ProposalViewer = ({ proposal, isLoading, error }) => {
  const proposalRef = useRef(null);

  const handleExportPDF = async () => {
    if (!proposal) return;
    await exportToPDF(proposalRef.current, 'business-transformation-proposal');
  };

  const handleExportText = () => {
    if (!proposal) return;
    exportToText(proposal, 'business-transformation-proposal');
  };

  // Parse proposal content - handle various response formats
  const getProposalContent = () => {
    if (!proposal) return null;

    // If proposal has a 'proposal' field, use that
    if (proposal.proposal) {
      return proposal.proposal;
    }

    // If proposal has a 'content' field, use that
    if (proposal.content) {
      return proposal.content;
    }

    // If proposal has a 'message' field, use that
    if (proposal.message) {
      return proposal.message;
    }

    // If proposal has a 'response' field, use that
    if (proposal.response) {
      return proposal.response;
    }

    // Otherwise, try to stringify the entire proposal object
    return JSON.stringify(proposal, null, 2);
  };

  const proposalContent = getProposalContent();

  return (
    <div className="proposal-viewer">
      <div className="proposal-header">
        <h2>Proposal</h2>
        {proposal && (
          <div className="export-buttons">
            <button
              className="export-button pdf-button"
              onClick={handleExportPDF}
              title="Export as PDF"
            >
              📄 Export PDF
            </button>
            <button
              className="export-button text-button"
              onClick={handleExportText}
              title="Export as Text"
            >
              📝 Export Text
            </button>
          </div>
        )}
      </div>

      <div className="proposal-content" ref={proposalRef}>
        {error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Error Generating Proposal</h3>
            <p>{error}</p>
            <p className="error-hint">Please try again or rephrase your request.</p>
          </div>
        ) : isLoading ? (
          <div className="loading-state">
            <div className="loader-spinner"></div>
            <h3>Generating Your Proposal</h3>
            <p>Our AI is crafting a comprehensive business transformation proposal...</p>
            <div className="loading-steps">
              <div className="loading-step">
                <span className="step-icon">✓</span>
                <span>Analyzing requirements</span>
              </div>
              <div className="loading-step">
                <span className="step-icon">✓</span>
                <span>Researching best practices</span>
              </div>
              <div className="loading-step active">
                <span className="step-icon">⟳</span>
                <span>Generating proposal sections</span>
              </div>
              <div className="loading-step">
                <span className="step-icon">○</span>
                <span>Formatting document</span>
              </div>
            </div>
          </div>
        ) : proposalContent ? (
          <div className="proposal-document">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="proposal-h1" {...props} />,
                h2: ({ node, ...props }) => <h2 className="proposal-h2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="proposal-h3" {...props} />,
                h4: ({ node, ...props }) => <h4 className="proposal-h4" {...props} />,
                p: ({ node, ...props }) => <p className="proposal-p" {...props} />,
                ul: ({ node, ...props }) => <ul className="proposal-ul" {...props} />,
                ol: ({ node, ...props }) => <ol className="proposal-ol" {...props} />,
                li: ({ node, ...props }) => <li className="proposal-li" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="table-wrapper">
                    <table className="proposal-table" {...props} />
                  </div>
                ),
                blockquote: ({ node, ...props }) => <blockquote className="proposal-blockquote" {...props} />,
                code: ({ node, inline, ...props }) =>
                  inline ? (
                    <code className="proposal-code-inline" {...props} />
                  ) : (
                    <code className="proposal-code-block" {...props} />
                  ),
                hr: ({ node, ...props }) => <hr className="proposal-divider" {...props} />,
              }}
            >
              {proposalContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No Proposal Yet</h3>
            <p>Start a conversation in the chat to generate your first proposal.</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span>AI-powered comprehensive proposals</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>ROI calculations and financial projections</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🗺️</span>
                <span>Detailed implementation roadmaps</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📄</span>
                <span>Professional formatting and export options</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalViewer;
