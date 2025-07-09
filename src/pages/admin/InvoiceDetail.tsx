import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { simpleInvoicesApi, SimpleInvoice } from "@/lib/invoices-simple-api";
import InvoiceView from "@/components/InvoiceView";
import { ArrowLeft, Edit, Send, Trash2, Loader2 } from "lucide-react";

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [invoice, setInvoice] = useState<SimpleInvoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/admin/invoices");
      return;
    }

    const loadInvoice = async () => {
      try {
        setLoading(true);
        console.log("🔍 Loading invoice with ID:", id);
        const invoiceData = await simpleInvoicesApi.getById(id);
        console.log("✅ Invoice loaded:", invoiceData);
        setInvoice(invoiceData);
      } catch (error) {
        console.error("❌ Error loading invoice:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast({
          title: "Error loading invoice",
          description: errorMessage,
          variant: "destructive",
        });
        navigate("/admin/invoices");
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id, navigate, toast]);

  useEffect(() => {
    if (!containerRef.current || loading) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );
  }, [loading]);

  const handleSendInvoice = async () => {
    if (!invoice || invoice.status !== "draft") return;

    try {
      setUpdating(true);
      const updatedInvoice = await simpleInvoicesApi.sendInvoice(invoice.id);
      setInvoice(updatedInvoice);

      toast({
        title: "Invoice Sent! 📧",
        description: `Invoice ${updatedInvoice.invoiceNumber} has been sent to ${updatedInvoice.clientName}.`,
      });
    } catch (error) {
      console.error("Error sending invoice:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Error sending invoice",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteInvoice = async () => {
    if (!invoice) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete invoice ${invoice.invoiceNumber}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setUpdating(true);
      // Note: Delete functionality not implemented in simpleInvoicesApi yet
      // await simpleInvoicesApi.delete(invoice.id);

      toast({
        title: "Feature not available",
        description: "Delete functionality is not yet implemented.",
        variant: "destructive",
      });

      // navigate("/admin/invoices");
    } catch (error) {
      console.error("Error deleting invoice:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Error deleting invoice",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = () => {
    if (!invoice) return;

    // Generate PDF (you can enhance this with a proper PDF library)
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${invoice.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              .header { border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
              .company { text-align: right; margin-bottom: 20px; }
              .bill-to { margin-bottom: 30px; }
              .invoice-details { margin-bottom: 30px; }
              .line-items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              .line-items th, .line-items td { border: 1px solid #000; padding: 12px; text-align: left; }
              .line-items th { background-color: #f0f0f0; font-weight: bold; }
              .totals { text-align: right; margin-bottom: 30px; }
              .total-line { margin-bottom: 10px; }
              .grand-total { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; font-size: 1.2em; }
              .notes { margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="company">
              <h1>Design Agency</h1>
              <p>Professional Design Services</p>
            </div>

            <div class="header">
              <h1>INVOICE ${invoice.invoiceNumber}</h1>
              <h2>${invoice.title}</h2>
            </div>

            <div class="bill-to">
              <h3>Bill To:</h3>
              <p><strong>${invoice.clientName}</strong></p>
              <p>${invoice.clientEmail}</p>
            </div>

            <div class="invoice-details">
              <p><strong>Invoice Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</p>
              ${invoice.dueDate ? `<p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>` : ""}
              ${invoice.sentAt ? `<p><strong>Sent Date:</strong> ${new Date(invoice.sentAt).toLocaleDateString()}</p>` : ""}
              ${invoice.paidAt ? `<p><strong>Paid Date:</strong> ${new Date(invoice.paidAt).toLocaleDateString()}</p>` : ""}
            </div>

            <table class="line-items">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.lineItems
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.itemType}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.unitPrice.toFixed(2)}</td>
                    <td>$${(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-line">
                <strong>Subtotal: $${(invoice.amount || 0).toFixed(2)}</strong>
              </div>
              ${
                invoice.taxAmount > 0
                  ? `
                <div class="total-line">
                  <strong>Tax (${invoice.taxRate}%): $${invoice.taxAmount.toFixed(2)}</strong>
                </div>
              `
                  : ""
              }
              <div class="grand-total">
                <strong>Total: $${invoice.totalAmount.toFixed(2)}</strong>
              </div>
            </div>

            ${
              invoice.notes
                ? `
              <div class="notes">
                <h3>Notes:</h3>
                <p>${invoice.notes}</p>
              </div>
            `
                : ""
            }

            ${
              invoice.terms
                ? `
              <div class="notes">
                <h3>Payment Terms:</h3>
                <p>${invoice.terms}</p>
              </div>
            `
                : ""
            }

            <div class="notes">
              <p><em>Thank you for your business!</em></p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-festival-orange" />
          <p className="text-lg font-medium text-black">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-bold text-black mb-2">
            Invoice Not Found
          </h3>
          <p className="text-black/70 mb-6">
            The invoice you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => navigate("/admin/invoices")}
            className="bg-festival-orange hover:bg-festival-amber border-4 border-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invoices
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/admin/invoices")}
            variant="outline"
            className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invoices
          </Button>
          <div>
            <h1 className="text-4xl font-display font-bold text-black">
              Invoice #{invoice.invoiceNumber}
            </h1>
            <p className="text-xl text-black/70 font-medium">
              {invoice.title} • {invoice.clientName}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {invoice.status === "draft" && (
            <Button
              onClick={handleSendInvoice}
              disabled={updating}
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1"
            >
              {updating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send Invoice
            </Button>
          )}

          <Button
            onClick={() => navigate(`/admin/invoices/${invoice.id}/edit`)}
            variant="outline"
            disabled={invoice.status === "paid"}
            className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>

          {invoice.status === "draft" && (
            <Button
              onClick={handleDeleteInvoice}
              disabled={updating}
              variant="outline"
              className="border-4 border-red-500 text-red-500 hover:bg-red-50 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] hover:translate-x-1 hover:translate-y-1"
            >
              {updating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Invoice View */}
      <InvoiceView
        invoice={invoice}
        showPayment={false} // Admin view doesn't show payment
        onDownload={handleDownload}
        onPrint={handlePrint}
      />

      {/* Share Link for Client */}
      <div className="border-4 border-black bg-festival-cream p-6">
        <h3 className="text-lg font-bold text-black mb-2">
          Client Payment Link
        </h3>
        <p className="text-black/70 mb-4">
          Share this link with your client so they can view and pay the invoice:
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={`${window.location.origin}/invoices/${invoice.id}`}
            readOnly
            className="flex-1 p-3 border-2 border-black bg-white font-mono text-sm"
          />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/invoices/${invoice.id}`,
              );
              toast({
                title: "Link Copied!",
                description: "Payment link copied to clipboard",
              });
            }}
            variant="outline"
            className="border-2 border-black"
          >
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
