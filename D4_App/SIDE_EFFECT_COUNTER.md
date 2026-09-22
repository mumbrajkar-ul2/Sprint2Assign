# Side-effect counter — Pay and Notify

Lab 29 asks for three counts of the same irreversible action: naive, safe, and cached.

This session measured the safe count only. Naive and cached are Unknown.

The local app was `http://localhost:3000`. The hosted Studio page was not used past Google sign-in.

## What each count means

| Count | What it counts | How this session treats it |
|---|---|---|
| Safe | Writes that go through the idempotency key. The key is the case id plus the step name. A second click returns the first record. | Measured. The on-screen Payment Count or Notify Count is the safe count. Honesty: REAL. |
| Naive | Writes when the idempotency check is removed. The same case id and the same step name are used again. | Unknown. This session did not run that path. |
| Cached | A separate counter that returns a stored result without a new write, shown apart from Payment Count and Notify Count. | Unknown. Payment Count and Notify Count are the only counters those screens showed. |

Worked example for safe Pay: INV-1005 started that pass at Payment Count 0. The first click wrote one payment under key `INV-1005:payment` and the count became 1. The second click returned that same payment. The count stayed 1.

## Pay

| Case | Key on screen | Safe count | Naive count | Cached count |
|---|---|---|---|---|
| INV-1001 | `INV-1001:payment` | 1. Already PAID. Retry banner: payment already completed under that key. Count remained 1. | Unknown | Unknown |
| INV-1005 | `INV-1005:payment` | 1. Count was 0 before the first click. After the first click the count was 1 and status was PAID & SETTLED. Audit ID `AUDIT-INV-1005-PAY`. After the second click the count stayed 1. | Unknown | Unknown |
| INV-1002 | No payment key consumed. | 0. Status PAYMENT LOCKED. Outcome REVIEW. Lock text said payment runs only for APPROVE. Pay was not clicked. | Unknown | Unknown |

Header side effect on the INV-1005 first click: WORM Ref changed from 1 row to 2 rows. That is a reference-row count, not a second payment. Honesty: REAL.

The scorer-down pass left INV-1005 as REVIEW. The pay pass recorded INV-1005 as APPROVE before the first pay click. The notes do not name the click that restored APPROVE. Repeat the pay pass only while the case list shows APPROVE.

## Notify

| Case | Key on screen | Safe count | Naive count | Cached count |
|---|---|---|---|---|
| INV-1001 | `INV-1001:notify` | 1. Count was already 1. Retry banner: notification already sent under that key. Count remained 1. Supplier line: Alpha Industrial Supply (V-201). | Unknown | Unknown |
| INV-1003 after Disagree | No notify key consumed in the notes. | 0 at the moment the screen moved to Notify. Decision Outcome on the payload was APPROVE. This session did not click a send on that screen, and did not retry it. | Unknown | Unknown |

## How to measure the Unknown cells

**Naive Pay.** Remove the idempotency check for step `payment`. Use the same case id twice. Count payment writes. Compare that write count with Payment Count on the Pay screen. This session did not do that removal, so the naive Pay cell stays Unknown.

**Naive Notify.** Remove the idempotency check for step `notify`. Use the same case id twice. Count notify writes. Compare that write count with Notify Count on the Notify screen. This session did not do that removal, so the naive Notify cell stays Unknown.

**Cached Pay and cached Notify.** Add a counter that increments only when the handler returns a stored result and skips a new write. Show that counter next to Payment Count and Notify Count. Read it after the second click. Those screens showed only Payment Count and Notify Count, so both cached cells stay Unknown.

Record a naive or cached number only after that measurement. The safe count of 1 is the measured cell. It is a separate measurement from naive and from cached.
