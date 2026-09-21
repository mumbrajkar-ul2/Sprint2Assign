OCR extracts invoice number, supplier name, amount, tax ID, PO and bank details.

Known issues:
- invoice number formatting differs by supplier
- supplier aliases cause duplicate misses
- bank details are not cryptographically verified
- confidence threshold differs between batch and API processing
