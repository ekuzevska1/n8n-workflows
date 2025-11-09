import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export proposal to PDF
 * @param {HTMLElement} element - The DOM element to export
 * @param {string} filename - The filename for the PDF (without extension)
 */
export const exportToPDF = async (element, filename = 'proposal') => {
  try {
    // Create a clone of the element to modify for PDF export
    const clone = element.cloneNode(true);
    clone.style.width = '210mm'; // A4 width
    clone.style.padding = '20mm';
    clone.style.background = 'white';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    // Generate canvas from the element
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Remove the clone
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

/**
 * Export proposal to plain text
 * @param {Object} proposal - The proposal object
 * @param {string} filename - The filename for the text file (without extension)
 */
export const exportToText = (proposal, filename = 'proposal') => {
  try {
    let content = '';

    // Extract content from various possible formats
    if (proposal.proposal) {
      content = proposal.proposal;
    } else if (proposal.content) {
      content = proposal.content;
    } else if (proposal.message) {
      content = proposal.message;
    } else if (proposal.response) {
      content = proposal.response;
    } else {
      content = JSON.stringify(proposal, null, 2);
    }

    // Convert markdown to plain text (basic conversion)
    const plainText = convertMarkdownToPlainText(content);

    // Create a blob and download
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating text file:', error);
    alert('Failed to generate text file. Please try again.');
  }
};

/**
 * Convert basic markdown to plain text
 * @param {string} markdown - Markdown content
 * @returns {string} Plain text content
 */
const convertMarkdownToPlainText = (markdown) => {
  let text = markdown;

  // Remove markdown syntax while preserving structure
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '$1\n' + '='.repeat(50)); // Headers
  text = text.replace(/\*\*(.+?)\*\*/g, '$1'); // Bold
  text = text.replace(/\*(.+?)\*/g, '$1'); // Italic
  text = text.replace(/`(.+?)`/g, '$1'); // Inline code
  text = text.replace(/\[(.+?)\]\(.+?\)/g, '$1'); // Links
  text = text.replace(/^>\s+(.+)$/gm, '  $1'); // Blockquotes
  text = text.replace(/^-\s+/gm, '  • '); // Unordered lists
  text = text.replace(/^\d+\.\s+/gm, '  '); // Ordered lists
  text = text.replace(/---/g, '\n' + '-'.repeat(50) + '\n'); // Horizontal rules

  return text;
};
