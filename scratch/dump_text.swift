
import PDFKit
import Foundation
let url = URL(fileURLWithPath: "scratch/whatsapp_pdf/‎WhatsApp.pdf")
if let doc = PDFDocument(url: url) {
    for i in 0..<doc.pageCount {
        if let page = doc.page(at: i) {
            print("=== PAGE \(i+1) ===")
            print(page.string ?? "[No text]")
        }
    }
}
