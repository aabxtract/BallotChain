;; Optimized Fund Transfer Contract
;; Minimal, gas-efficient STX transfer

;; Error codes
(define-constant ERR-INVALID-AMOUNT (err u1))
(define-constant ERR-SAME-ADDRESS (err u2))

;; Public transfer function
(define-public (send (amt uint) (to principal))
  (begin
    (asserts! (> amt u0) ERR-INVALID-AMOUNT)
    (asserts! (not (is-eq tx-sender to)) ERR-SAME-ADDRESS)
    (stx-transfer? amt tx-sender to)
  )
)

;; Batch transfer (max 20 recipients for efficiency)
(define-public (send-many (transfers (list 20 {to: principal, amt: uint})))
  (fold send-one transfers (ok true))
)

(define-private (send-one (transfer {to: principal, amt: uint}) (prev (response bool uint)))
  (match prev
    ok-val (stx-transfer? (get amt transfer) tx-sender (get to transfer))
    err-val (err err-val)
  )
)

;; Read-only: Get balance
(define-read-only (balance (who principal))
  (stx-get-balance who)
)
