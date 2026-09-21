Supplier Setup -> PO -> Goods Receipt -> Invoice -> Approval -> Payment

Current exception behavior:
- non-PO invoice below 5,000 follows expedited approval
- bank change and payment workflows are separate
- duplicate check uses invoice number only
- no event correlation across vendor master change and subsequent invoice/payment
