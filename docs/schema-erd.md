# Sơ đồ cơ sở dữ liệu Tizia

> Sinh tự động từ [`server/schema.sql`](../server/schema.sql) (PostgreSQL, 87 bảng).
> Cập nhật: 2026-10-09. Sinh lại khi schema đổi bằng script trong repo (hoặc nhờ Claude chạy lại).

## Cách đọc

- Đường **liền** `||--o{`: khoá ngoại **có ràng buộc thật** trong DB (`FOREIGN KEY`).
- Đường **đứt** `||..o{`: quan hệ **logic** — code tự nối, DB không ép ràng buộc (vd. `attempts.player_name` khớp `users.display_name`, `gpp_*` nối bằng mã SV).
- `PK` khoá chính · `FK` khoá ngoại/khoá nối · `UK` unique.
- Thời gian lưu dạng `bigint` (epoch ms/s); cờ boolean lưu `bigint 0/1`; nhiều cột `text` chứa JSON (`*_json`, `payload`, `body`, `props`…).
- Bảng `users` xuất hiện ở nhiều sơ đồ nhưng chỉ in đầy đủ cột ở nhóm 1; các nhóm khác chỉ hiện `id` để gọn.

## Tổng quan theo nhóm

```mermaid
flowchart TB
  U(("👤 users<br/>(trung tâm)"))
  ID["1 · Danh tính & phân quyền<br/>sessions · oauth · school_admins · domain_grants · family_links · subscriptions · classes"]
  EC["2 · Game hoá & kinh tế<br/>wallets · pet · shop · inventory · daily quests · battle pass · league · team quest"]
  SK["3 · Năng lực & kỹ năng<br/>competencies → skills → user_skills"]
  LE["4 · Nội dung & học thích ứng<br/>curriculum · lessons · SRS · UGC · attempts · IRT/BKT · codelab"]
  PL["5 · Nền tảng & vận hành<br/>portal apps/agents · requests · notifications · flags/A-B · analytics · AI usage · outbox"]
  PH["6 · Nhà thuốc 3D<br/>pharmacy_* (độc lập, định danh bằng mã SV)"]
  GP["7 · GPP 2D<br/>gpp_* (độc lập, định danh bằng mã SV)"]
  U --- ID
  U --- EC
  U --- SK
  U --- LE
  U --- PL
  PH ~~~ GP
  classDef hub fill:#fde68a,stroke:#b45309,stroke-width:2px,color:#000
  classDef iso fill:#e5e7eb,stroke:#6b7280,stroke-dasharray:4 3,color:#000
  class U hub
  class PH,GP iso
```

## 1 · Danh tính & phân quyền

Tài khoản, phiên đăng nhập, OAuth, quyền theo cấp học (domain), quan hệ phụ huynh–con, gói dịch vụ, lớp.

```mermaid
erDiagram
  users {
    bigint id PK
    citext username UK
    text display_name
    text password_hash
    text role
    bigint created_at
    bigint last_login
    text email
    text avatar_url
    bigint age
    text plan
    bigint plan_expires_at
    text billing_cycle
    bigint grade
    text major
    text cohort
    text school_name
    text enrolled_domain
  }
  sessions {
    text token PK
    bigint user_id FK
    bigint created_at
    bigint expires_at
  }
  oauth_identities {
    bigint id PK
    bigint user_id FK
    text provider
    text subject
    text email
    bigint created_at
  }
  school_admins {
    bigint id PK
    bigint user_id FK
    text domain_id
    bigint granted_at
    bigint granted_by FK
    text note
  }
  user_domain_grants {
    bigint id PK
    bigint user_id FK
    text domain_id
    bigint granted_at
    bigint granted_by FK
    bigint expires_at
    text note
  }
  family_links {
    bigint id PK
    bigint parent_user_id FK
    bigint child_user_id FK
    bigint created_at
  }
  subscriptions {
    bigint id PK
    bigint user_id FK
    text plan
    text status
    bigint seats
    bigint current_period_end
    text order_ref
    bigint created_at
    bigint updated_at
  }
  classes {
    bigint id PK
    text code UK
    text name
    text teacher_name
    bigint created_at
  }
  users ||--o{ sessions : "có phiên"
  users ||--o{ oauth_identities : "liên kết OAuth"
  users ||--o{ school_admins : "là admin trường"
  users ||--o{ school_admins : "cấp quyền"
  users ||--o{ user_domain_grants : "được cấp"
  users ||--o{ user_domain_grants : "cấp bởi"
  users ||--o{ family_links : "phụ huynh"
  users ||--o{ family_links : "con"
  users ||..o{ subscriptions : "gói dịch vụ"
```

## 2a · Game hoá — ví, pet, cửa hàng, nhiệm vụ ngày

Ví XP/coin theo domain, pet, cửa hàng + kho đồ, streak/tim, nhiệm vụ ngày, huy hiệu.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  user_wallets {
    bigint user_id PK,FK
    text domain PK
    bigint coins
    bigint xp
    bigint streak
    bigint longest_streak
    bigint streak_shields
    text last_visit_day
    text achievements
    bigint vr_sessions
    bigint meta_sessions
    bigint quizzes_passed
    text modules_by_day
    text daily
    text quests_claimed
    bigint updated_at
  }
  user_state {
    bigint user_id PK,FK
    text key PK
    text value
    bigint updated_at
  }
  user_pet {
    bigint user_id PK,FK
    text pet_id
    text nickname
    bigint stage
    bigint xp
    bigint last_fed_at
    bigint created_at
    bigint updated_at
  }
  shop_items {
    text id PK
    text type
    text name
    text description
    bigint price_coin
    text icon
    text payload
    text rarity
    bigint available
  }
  user_inventory {
    bigint user_id PK,FK
    text item_id PK,FK
    bigint acquired_at
    bigint equipped
  }
  daily_login {
    bigint user_id PK,FK
    bigint streak
    text last_date
    bigint total_claims
  }
  engagement_state {
    bigint user_id PK,FK
    bigint streak
    bigint longest_streak
    text last_active_date
    bigint hearts
    bigint hearts_refill_at
    bigint updated_at
  }
  engagement_daily_quests {
    bigint user_id PK,FK
    text quest_date PK
    bigint slot PK
    text kind
    bigint target
    bigint progress
    bigint claimed
    bigint reward_coin
    bigint reward_xp
    text label
  }
  user_activity {
    bigint user_id PK
    bigint at PK
    text kind
  }
  achievements {
    bigint id PK
    text player_name FK
    text badge_id
    bigint unlocked_at
  }
  users ||--o{ user_wallets : "ví theo domain"
  users ||--o{ user_state : "trạng thái KV"
  users ||--o{ user_pet : "nuôi pet"
  users ||--o{ user_inventory : "sở hữu"
  shop_items ||--o{ user_inventory : "được mua"
  users ||--o{ daily_login : "điểm danh"
  users ||--o{ engagement_state : "streak / tim"
  users ||--o{ engagement_daily_quests : "nhiệm vụ ngày"
  users ||..o{ achievements : "huy hiệu (display_name)"
```

## 2b · Game hoá — thi đấu (Battle Pass, League, nhiệm vụ nhóm)

Battle Pass theo mùa, League hằng tuần (hạng/nhóm), nhiệm vụ nhóm theo lớp.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  bp_seasons {
    bigint id PK
    text code UK
    text name
    text theme
    bigint started_at
    bigint ends_at
    bigint is_active
  }
  bp_progress {
    bigint user_id PK,FK
    bigint season_id PK,FK
    bigint season_xp
    bigint has_premium
    text claimed_free
    text claimed_premium
    bigint updated_at
  }
  league_seasons {
    bigint id PK
    text week_start UK
    bigint started_at
    bigint ended_at
    bigint created_at
  }
  league_groups {
    bigint id PK
    bigint season_id FK
    text tier
    bigint seq
    bigint member_count
  }
  league_memberships {
    bigint season_id PK,FK
    bigint user_id PK,FK
    bigint group_id FK
    text tier
    bigint week_xp
    bigint final_rank
    bigint promoted
    bigint relegated
  }
  league_user_tier {
    bigint user_id PK,FK
    text tier
    bigint updated_at
  }
  team_quests {
    bigint id PK
    text class_code FK
    bigint creator_id FK
    text title
    text description
    bigint target_xp
    bigint reward_coin
    bigint reward_xp
    text reward_item
    bigint starts_at
    bigint ends_at
    text status
    bigint completed_at
    bigint created_at
  }
  team_quest_contribs {
    bigint team_quest_id PK,FK
    bigint user_id PK,FK
    bigint xp_contributed
    bigint last_at
  }
  team_quest_claims {
    bigint team_quest_id PK,FK
    bigint user_id PK,FK
    bigint claimed_at
  }
  classes {
    bigint id PK
  }
  users ||--o{ bp_progress : "tiến độ BP"
  bp_seasons ||--o{ bp_progress : "mùa"
  league_seasons ||--o{ league_groups : "chia nhóm"
  league_seasons ||--o{ league_memberships : "mùa"
  league_groups ||--o{ league_memberships : "nhóm"
  users ||--o{ league_memberships : "thi đấu"
  users ||--o{ league_user_tier : "hạng hiện tại"
  users ||--o{ team_quests : "tạo"
  team_quests ||--o{ team_quest_contribs : "đóng góp"
  users ||--o{ team_quest_contribs : "đóng góp"
  classes ||..o{ team_quests : "lớp"
  team_quests ||..o{ team_quest_claims : "nhận thưởng"
  users ||..o{ team_quest_claims : "nhận thưởng"
```

## 3 · Năng lực & kỹ năng (GDPT 2018)

15 năng lực → 207 kỹ năng, đồ thị tiên quyết, kỹ năng người học đạt được.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  competencies {
    bigint id PK
    text code UK
    text kind
    text name
    text description
    bigint sort_order
    bigint created_at
  }
  skills {
    bigint id PK
    text code UK
    text name
    bigint competency_id FK
    text domain
    bigint grade_min
    bigint grade_max
    text description
    bigint created_at
  }
  skill_prereq {
    bigint skill_id PK,FK
    bigint prereq_skill_id PK,FK
    double weight
  }
  user_skills {
    bigint id PK
    bigint user_id FK
    bigint skill_id FK
    text domain
    bigint earned_at
    text source_type
    text source_id
    bigint score
  }
  competencies ||--o{ skills : "gồm"
  skills ||--o{ skill_prereq : "cần tiên quyết"
  skills ||--o{ skill_prereq : "là tiên quyết của"
  users ||--o{ user_skills : "đạt kỹ năng"
  skills ||--o{ user_skills : "được cấp"
```

## 4a · Nội dung học & thẻ ghi nhớ (SRS)

Giáo trình/quiz nằm trong DB (curriculum_content, content_datasets), bài giảng cộng đồng, nội dung AI sinh, bộ thẻ SRS.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  curriculum_content {
    text id PK
    text subject
    bigint year_level
    bigint semester
    bigint week
    text kind
    text title
    text body
    text source
    bigint active
    bigint updated_at
    text domain
    bigint grade
  }
  content_datasets {
    text collection PK
    text item_key PK
    text body
    bigint ord
    text source
    bigint active
    bigint updated_at
  }
  campus_layouts {
    text domain PK
    text layout
    bigint updated_at
  }
  ai_lesson_content {
    bigint id PK
    text week_id
    text subject
    text topic
    text kind
    text stem
    text payload
    text student
    bigint upvotes
    bigint flagged
    bigint created_at
  }
  lessons {
    bigint id PK
    text slug UK
    text title
    text description
    text author
    text grade
    text subject
    text blocks_json
    bigint published
    bigint views
    bigint likes
    bigint created_at
    bigint updated_at
  }
  lesson_comments {
    bigint id PK
    text slug FK
    text author
    text text
    bigint created_at
  }
  lesson_likes {
    text slug PK,FK
    text user_key PK
    bigint created_at
  }
  srs_decks {
    bigint id PK
    bigint creator_id FK
    text name
    text description
    text subject_tag
    text grade_tag
    bigint is_public
    bigint created_at
  }
  srs_card_content {
    text card_key PK
    bigint deck_id FK
    text front
    text back
    text hint
    text media_url
    bigint created_at
  }
  srs_cards {
    bigint id PK
    bigint user_id FK
    text card_key FK
    double ease
    double interval_d
    bigint reps
    bigint lapses
    bigint total_reviews
    bigint due_at
    bigint last_correct
    bigint last_seen
  }
  users ||--o{ srs_decks : "tạo bộ thẻ"
  srs_decks ||--o{ srs_card_content : "chứa thẻ"
  users ||--o{ srs_cards : "ôn thẻ"
  srs_card_content ||..o{ srs_cards : "nội dung thẻ"
  lessons ||..o{ lesson_comments : "bình luận"
  lessons ||..o{ lesson_likes : "lượt thích"
```

## 4b · Quest do người dùng tạo (UGC) & phòng live

Quest UGC kèm lượt chơi/thích/báo cáo; phòng thi đấu live theo mã PIN.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  ugc_quests {
    bigint id PK
    bigint creator_id FK
    text title
    text description
    text subject_tag
    text grade_tag
    text questions
    bigint plays
    bigint likes
    bigint flags
    text status
    bigint created_at
    bigint updated_at
  }
  ugc_plays {
    bigint user_id PK,FK
    bigint quest_id PK,FK
    bigint score
    bigint played_at PK
  }
  ugc_likes {
    bigint user_id PK,FK
    bigint quest_id PK,FK
  }
  ugc_flags {
    bigint user_id PK,FK
    bigint quest_id PK,FK
    text reason
    bigint flagged_at
  }
  live_rooms {
    text pin PK
    bigint host_id FK
    text title
    text questions
    text status
    bigint created_at
    bigint ended_at
  }
  users ||--o{ ugc_quests : "tạo"
  ugc_quests ||--o{ ugc_plays : "lượt chơi"
  users ||--o{ ugc_plays : "chơi"
  ugc_quests ||--o{ ugc_likes : "được thích"
  users ||--o{ ugc_likes : "thích"
  ugc_quests ||--o{ ugc_flags : "bị báo cáo"
  users ||--o{ ugc_flags : "báo cáo"
  users ||..o{ live_rooms : "chủ phòng"
```

## 4c · Lượt làm bài & học thích ứng (IRT/BKT), Codelab

Lượt làm bài, câu hỏi qua ScoreUp, độ khó IRT, năng lực θ, BKT theo kỹ năng, sự kiện học, kịch bản, bài nộp Codelab.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  classes {
    bigint id PK
  }
  attempts {
    bigint id PK
    text version
    text player_name FK
    bigint score
    bigint correct
    bigint total
    bigint duration_ms
    text details
    bigint created_at
    text class_code FK
    bigint level_n
  }
  question_attempts {
    bigint id PK
    bigint user_id FK
    text scoreup_question_id
    text question_external_id
    text subject_id
    text chapter_id
    text answers_json
    bigint correct
    double score
    bigint duration_ms
    bigint created_at
  }
  question_irt {
    text question_id PK
    text subject_id
    double b
    double a
    bigint n_attempts
    bigint n_correct
    bigint updated_at
  }
  user_theta {
    bigint user_id PK,FK
    text subject_id PK
    double theta
    bigint n_attempts
    bigint updated_at
  }
  adaptive_state {
    text learner PK,FK
    text skill PK
    double p_known
    bigint attempts
    bigint correct_streak
    bigint fail_streak
    bigint last_at
  }
  learning_events {
    bigint id PK
    text learner FK
    text skill
    text question_id
    bigint correct
    bigint duration_ms
    bigint created_at
    text domain
    text context
  }
  scenario_runs {
    bigint user_id PK,FK
    text family_id PK
    bigint runs
    bigint best_stars
    bigint best_score
    bigint last_ts
  }
  codelab_submissions {
    text submission_id PK
    text status PK
    text problem_slug
    text external_user_ref
    bigint user_id FK
    double score
    bigint passed_cases
    bigint total_cases
    bigint language_id
    bigint completed_at
    bigint processed_at
  }
  users ||--o{ question_attempts : "làm câu hỏi"
  users ||--o{ user_theta : "năng lực θ"
  users ||--o{ scenario_runs : "chạy kịch bản"
  users ||..o{ codelab_submissions : "nộp bài code"
  users ||..o{ attempts : "lượt làm bài (display_name)"
  users ||..o{ adaptive_state : "BKT theo kỹ năng"
  users ||..o{ learning_events : "sự kiện học"
  classes ||..o{ attempts : "lớp"
```

## 5a · Nền tảng — Portal App/Agent, yêu cầu SV, thông báo

App & Agent cài lên Tizia, hộp thư yêu cầu của SV + hội thoại + quyết định của Ban điều hành AI, thông báo và đăng ký push.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  portal_apps {
    bigint id PK
    bigint owner_id FK
    text alias
    text name
    text description
    text icon
    text version
    text manifest_json
    bigint is_public
    bigint size_bytes
    bigint installed_at
    bigint updated_at
    text kind
    text target_url
    text category
    text domain
  }
  portal_agents {
    bigint id PK
    bigint owner_id FK
    text alias
    text name
    text icon
    text base_url
    text description
    text config_json
    bigint is_public
    bigint is_active
    bigint installed_at
    bigint updated_at
  }
  requests {
    bigint id PK
    text domain
    text type
    text title
    text detail
    text student FK
    text status
    bigint votes
    text admin_note
    bigint created_at
    bigint updated_at
    text attachments
  }
  request_messages {
    bigint id PK
    bigint request_id FK
    text role
    text author_name
    text body
    text attachments
    bigint created_at
  }
  ai_decisions {
    bigint id PK
    bigint request_id FK
    text decided_by
    text model
    text action
    text status_applied
    text reason
    text public_note
    bigint priority_score
    double confidence
    text input_snapshot
    text raw_output
    bigint created_at
  }
  notifications {
    bigint id PK
    text user_display_name FK
    bigint request_id FK
    text kind
    text title
    text body
    text url
    bigint read_at
    bigint created_at
  }
  notif_config {
    text k PK
    text v
  }
  notif_subscriptions {
    bigint user_id PK,FK
    text endpoint
    text p256dh
    text auth
    bigint enabled
    bigint updated_at
    bigint last_push_at
  }
  users ||--o{ portal_apps : "cài app"
  users ||--o{ notif_subscriptions : "đăng ký push"
  users ||..o{ portal_agents : "cài agent"
  users ||..o{ requests : "gửi yêu cầu (display_name)"
  users ||..o{ notifications : "nhận thông báo"
  requests ||..o{ request_messages : "hội thoại"
  requests ||..o{ ai_decisions : "quyết định AI"
  requests ||..o{ notifications : "sinh thông báo"
```

## 5b · Nền tảng — vận hành (flag, A/B, analytics, AI quota, webhook)

Feature flag, thí nghiệm A/B, analytics, log prompt + token AI, outbox/webhook ra ngoài, audit SQL của admin.

```mermaid
erDiagram
  users {
    bigint id PK
  }
  feature_flags {
    text key PK
    bigint enabled
    double rollout_pct
    text description
    bigint updated_at
  }
  experiments {
    text key PK
    text status
    text variants
    text description
    bigint started_at
    bigint ended_at
  }
  exposures {
    bigint user_id PK,FK
    text exp_key PK,FK
    text variant
    bigint first_seen_at
    bigint seen_count
  }
  event_registry {
    text name PK
    text description
    text schema_json
    bigint deprecated
    bigint added_at
  }
  analytics_events {
    bigint id PK
    bigint user_id FK
    text anon_id
    text name
    text props
    text session_id
    text path
    bigint ts
  }
  ai_prompt_log {
    bigint id PK
    bigint user_id FK
    text role
    text endpoint
    text prompt_text
    bigint blocked
    text block_reason
    text block_category
    bigint created_at
  }
  ai_token_usage {
    bigint id PK
    bigint user_id FK
    text provider
    text model
    text endpoint
    bigint prompt_tokens
    bigint completion_tokens
    bigint cost_usd_micros
    bigint duration_ms
    text status
    bigint created_at
  }
  outbox_events {
    bigint id PK
    text event_type
    text payload
    text endpoint_url
    text endpoint_secret
    text status
    bigint attempts
    bigint max_attempts
    bigint next_attempt_at
    text last_error
    bigint created_at
    bigint updated_at
  }
  webhook_endpoints {
    bigint id PK
    text url
    text secret
    text event_types
    bigint active
    bigint created_at
  }
  scoreup_webhook_events_seen {
    text event_id PK
    text event_type
    bigint occurred_at
    bigint processed_at
  }
  admin_db_audit {
    bigint id PK
    bigint user_id FK
    text username
    text sql
    bigint changes
    bigint last_id
    text error
    bigint created_at
  }
  users ||..o{ analytics_events : "sự kiện"
  users ||..o{ ai_token_usage : "dùng token"
  users ||..o{ ai_prompt_log : "prompt"
  users ||..o{ admin_db_audit : "admin chạy SQL"
  users ||..o{ exposures : "A/B"
  experiments ||..o{ exposures : "thí nghiệm"
```

## 6 · Nhà thuốc 3D (PharmaComm)

Phiên thực hành, hội thoại, thao tác 3D, điểm A1..E5; hồ sơ SV và tài khoản giảng viên. Độc lập với users.

```mermaid
erDiagram
  pharmacy_student {
    text student_code PK
    text student_name
    text class_name
    bigint first_seen_at
    bigint last_seen_at
    bigint session_count
  }
  pharmacy_practice_session {
    text session_id PK
    text student_code FK
    text student_name
    text class_name
    text scenario_code
    text scenario_name
    text scenario_version
    text rubric_version
    text ai_model_version
    bigint started_at
    bigint completed_at
    bigint duration_ms
    text status
    double total_score
    text chat_session_id
    text user_ref
    bigint created_at
    bigint updated_at
  }
  pharmacy_practice_message {
    bigint message_id PK
    text session_id FK
    text speaker
    text content
    integer message_order
    bigint created_at
  }
  pharmacy_practice_action {
    bigint action_id PK
    text session_id FK
    text action_type
    text object_id
    text object_name
    integer quantity
    text action_result
    text action_details
    text description_vi
    integer action_order
    bigint created_at
  }
  pharmacy_practice_score {
    bigint score_id PK
    text session_id FK
    text criterion_code
    text criterion_name
    text criterion_group
    double score
    double max_score
    text evidence_source
    text evidence
    text comment
    text improvement_feedback
    bigint scored_at
  }
  pharmacy_teacher {
    text username PK
    text password_hash
    text display_name
    text role
    boolean must_change_pw
    bigint created_at
    bigint updated_at
  }
  pharmacy_teacher_session {
    text token PK
    text username FK
    bigint created_at
    bigint expires_at
  }
  pharmacy_teacher_log {
    bigserial id PK
    text username
    text action
    text detail
    text ip
    bigint created_at
  }
  pharmacy_teacher ||--o{ pharmacy_teacher_session : "phiên GV"
  pharmacy_student ||..o{ pharmacy_practice_session : "thực hành"
  pharmacy_practice_session ||..o{ pharmacy_practice_message : "hội thoại"
  pharmacy_practice_session ||..o{ pharmacy_practice_action : "thao tác 3D"
  pharmacy_practice_session ||..o{ pharmacy_practice_score : "điểm A1..E5"
```

## 7 · Module GPP 2D (nghiên cứu)

Thực hành nghiệp vụ nhà thuốc GPP: người tham gia, phiên, nhật ký, kết quả cấp, pre/post test, khảo sát ARCS/CLT/SUS. Độc lập với users.

```mermaid
erDiagram
  gpp_participant {
    bigint id PK
    text student_code
    text full_name
    text class_name
    smallint year_level
    text study_group
    text user_ref
    bigint created_at
    bigint updated_at
  }
  gpp_session {
    text id PK
    bigint participant_id FK
    bigint started_at
    bigint ended_at
    text meta
  }
  gpp_event {
    bigint id PK
    text session_id FK
    bigint participant_id FK
    smallint level
    text step_key
    text action
    smallint correct
    smallint attempts
    bigint time_ms
    text detail
    bigint created_at
  }
  gpp_level_result {
    bigint id PK
    text session_id FK
    bigint participant_id FK
    smallint level
    smallint passed
    double score
    smallint steps_total
    smallint steps_passed
    bigint duration_ms
    smallint attempts_total
    text detail
    bigint created_at
  }
  gpp_test_result {
    bigint id PK
    bigint participant_id FK
    text session_id FK
    text phase
    text form_variant
    smallint year_level
    smallint n_questions
    smallint n_correct
    double score10
    text answers
    bigint created_at
  }
  gpp_survey {
    bigint id PK
    bigint participant_id FK
    text session_id FK
    text kind
    text items
    text summary
    bigint created_at
  }
  gpp_participant ||..o{ gpp_session : "phiên"
  gpp_participant ||..o{ gpp_event : "sự kiện"
  gpp_participant ||..o{ gpp_level_result : "kết quả cấp"
  gpp_participant ||..o{ gpp_test_result : "trắc nghiệm"
  gpp_participant ||..o{ gpp_survey : "khảo sát"
  gpp_session ||..o{ gpp_event : "nhật ký"
  gpp_session ||..o{ gpp_level_result : "kết quả"
  gpp_session ||..o{ gpp_test_result : "bài test"
  gpp_session ||..o{ gpp_survey : "khảo sát"
```

## Bảng độc lập (không quan hệ với bảng khác)

- `ai_lesson_content`
- `campus_layouts`
- `content_datasets`
- `curriculum_content`
- `event_registry`
- `feature_flags`
- `notif_config`
- `outbox_events`
- `question_irt`
- `scoreup_webhook_events_seen`
- `user_activity`
- `webhook_endpoints`
- `pharmacy_teacher_log`

## Ghi chú thiết kế

- **Không multi-tenant**: "trường" là `domain` (mầm non, tiểu học, THCS, THPT, đại học…), lưu dạng text ở `user_wallets.domain`, `user_skills.domain`, `curriculum_content.domain`, `portal_apps.domain`… chứ không có bảng `schools`.
- **Hai kiểu định danh**: phần lõi dùng `users.id` (FK thật); các bảng cũ/độc lập dùng chuỗi — `player_name`/`learner`/`student` (= `users.display_name`), hoặc `student_code` ở `pharmacy_*` và `gpp_*`.
- **Nội dung nằm ở DB**: `curriculum_content` (mỗi dòng = môn × tuần, `body` chứa cả câu hỏi + bài giảng) và `content_datasets` (collection/item_key) — không hardcode trong code.
- **Module có thể gỡ độc lập**: `pharmacy_*` và `gpp_*` không FK tới `users`; xoá module = drop các bảng cùng prefix.
