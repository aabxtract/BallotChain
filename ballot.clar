;; Optimized Voting Contract
;; Allows users to vote for campaigns

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-ALREADY-VOTED (err u2))
(define-constant ERR-CAMPAIGN-NOT-FOUND (err u3))
(define-constant ERR-VOTING-CLOSED (err u4))
(define-constant ERR-INVALID-CAMPAIGN (err u5))

;; Contract owner
(define-constant CONTRACT-OWNER tx-sender)

;; Data variables
(define-data-var campaign-count uint u0)

;; Campaign data structure
(define-map campaigns
  uint
  {
    name: (string-ascii 50),
    description: (string-ascii 200),
    votes: uint,
    is-active: bool,
    creator: principal
  }
)

;; Track who voted for which campaign
(define-map votes
  {campaign-id: uint, voter: principal}
  bool
)

;; Create a new campaign (only owner)
(define-public (create-campaign (name (string-ascii 50)) (desc (string-ascii 200)))
  (let
    ((campaign-id (var-get campaign-count)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (map-set campaigns campaign-id
      {
        name: name,
        description: desc,
        votes: u0,
        is-active: true,
        creator: tx-sender
      }
    )
    (var-set campaign-count (+ campaign-id u1))
    (ok campaign-id)
  )
)

;; Vote for a campaign
(define-public (vote (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns campaign-id) ERR-CAMPAIGN-NOT-FOUND))
      (has-voted (default-to false (map-get? votes {campaign-id: campaign-id, voter: tx-sender})))
    )
    (asserts! (get is-active campaign) ERR-VOTING-CLOSED)
    (asserts! (not has-voted) ERR-ALREADY-VOTED)
    
    ;; Record vote
    (map-set votes {campaign-id: campaign-id, voter: tx-sender} true)
    
    ;; Increment vote count
    (map-set campaigns campaign-id
      (merge campaign {votes: (+ (get votes campaign) u1)})
    )
    (ok true)
  )
)

;; Close voting for a campaign (only owner)
(define-public (close-campaign (campaign-id uint))
  (let
    ((campaign (unwrap! (map-get? campaigns campaign-id) ERR-CAMPAIGN-NOT-FOUND)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (map-set campaigns campaign-id
      (merge campaign {is-active: false})
    )
    (ok true)
  )
)

;; Reopen voting for a campaign (only owner)
(define-public (reopen-campaign (campaign-id uint))
  (let
    ((campaign (unwrap! (map-get? campaigns campaign-id) ERR-CAMPAIGN-NOT-FOUND)))
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (map-set campaigns campaign-id
      (merge campaign {is-active: true})
    )
    (ok true)
  )
)

;; Read-only functions

;; Get campaign details
(define-read-only (get-campaign (campaign-id uint))
  (map-get? campaigns campaign-id)
)

;; Get total number of campaigns
(define-read-only (get-campaign-count)
  (var-get campaign-count)
)

;; Check if user has voted for a campaign
(define-read-only (has-voted (campaign-id uint) (voter principal))
  (default-to false (map-get? votes {campaign-id: campaign-id, voter: voter}))
)

;; Get vote count for a campaign
(define-read-only (get-votes (campaign-id uint))
  (match (map-get? campaigns campaign-id)
    campaign (ok (get votes campaign))
    ERR-CAMPAIGN-NOT-FOUND
  )
)

;; Check if campaign is active
(define-read-only (is-active (campaign-id uint))
  (match (map-get? campaigns campaign-id)
    campaign (ok (get is-active campaign))
    ERR-CAMPAIGN-NOT-FOUND
  )
)
