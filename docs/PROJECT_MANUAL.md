# VNR Travel AI - PROJECT MANUAL

Version: 1.0

---

# PURPOSE

Đây là tài liệu gốc (Master Document) của dự án VNR Travel AI.

Mọi AI Agent (Gemini, ChatGPT, Claude...) phải đọc file này trước khi sửa code.

File này không chứa toàn bộ chi tiết mà đóng vai trò điều hướng đến các tài liệu thành phần.

---

# PROJECT INFORMATION

Project Name

VNR Travel AI

Status

Production

Frontend

React + Vite

Backend

Railway

Database

Firebase Firestore

Authentication

Firebase Authentication

AI

Google Gemini

---

# IMPORTANT DOCUMENTS

Đọc theo đúng thứ tự sau:

1.
PROJECT_STATE.md

↓

2.
ARCHITECTURE.md

↓

3.
CHANGELOG.md

↓

4.
AI_RULES.md

↓

5.
AFFILIATE.md

↓

6.
API_REFERENCE.md

↓

7.
DEPLOYMENT.md

↓

8.
GEMINI_SYSTEM_PROMPT.md

Không được bỏ qua bất kỳ tài liệu nào.

---

# DEVELOPMENT RULE

Mỗi lần người dùng yêu cầu sửa tính năng:

1.

Đọc PROJECT_MANUAL.md

↓

2.

Đọc toàn bộ các file được liệt kê phía trên.

↓

3.

Phân tích yêu cầu.

↓

4.

Liệt kê file sẽ sửa.

↓

5.

Đánh giá rủi ro.

↓

6.

Chờ người dùng xác nhận.

↓

7.

Mới được viết code.

---

# NEVER

Không refactor.

Không đổi cấu trúc.

Không đổi Firebase.

Không đổi Railway.

Không đổi Firestore Rules.

Không đổi API.

Không đổi Authentication.

Không đổi Affiliate.

Không đổi Planner nếu không được yêu cầu.

---

# GIT

Golden Backup

baseline-v1.0

Stable

main

Development

develop

---

# END