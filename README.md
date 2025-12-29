# VectorShift Frontend Technical Assessment

This repository contains my submission for the **VectorShift Frontend Technical Assessment**.  
The objective of this assignment was to design and implement a **scalable, well-structured visual pipeline builder** with clean UI, reusable architecture, and backend integration.

The focus of this work is not only correctness, but also **maintainability, extensibility, and thoughtful UI/UX decisions**.

---

## 🧠 Assignment Overview

The application allows users to:

- Create workflows using draggable nodes
- Connect nodes using input/output handles
- Define dynamic variables inside text nodes
- Submit the pipeline to a backend service
- Receive metadata about the pipeline structure

This mirrors the core interaction model of VectorShift’s workflow builder at a simplified level.

---

## 🛠️ Tech Stack

### Frontend
- React (JSX)
- React Flow
- Tailwind CSS
- Centralized state management (store-based)

### Backend
- Python
- FastAPI

---

## ✅ Assignment Phases & Completion Status

### Phase 1: Node Abstraction — **Completed**

**Objective:**  
Reduce duplicated logic across node components and enable faster creation of new nodes.

**Implementation:**
- Introduced a reusable `BaseNode` abstraction
- Centralized node layout, header styling, and handle positioning
- Refactored existing nodes (Input, Output, Text, LLM) to use the abstraction
- Added multiple new node types to demonstrate extensibility

**Result:**  
New nodes can be created with minimal code and without duplicating layout or styling logic.

---

### Phase 2: Styling — **Completed**

**Objective:**  
Create a clean, unified, and professional UI suitable for a dense workflow canvas.

**Implementation:**
- Applied Tailwind CSS for consistent, utility-based styling
- Designed compact node cards with clear visual hierarchy
- Ensured readability and spacing suitable for large workflows
- Styling inspired by modern workflow tools, without pixel-level copying

**Result:**  
The UI is visually consistent, scalable, and optimized for real-world usage.

---

### Phase 3: Text Node Logic — **Completed**

**Objective:**  
Improve usability and flexibility of the Text node.

**Implementation:**
- Automatic resizing of the Text node as content grows
- Dynamic parsing of variables using `{{variableName}}` syntax
- Automatic creation of input handles for detected variables
- Deduplication of variables to prevent redundant handles
- Visual indication of detected variables

**Result:**  
The Text node supports dynamic data injection and behaves similarly to production workflow editors.

---

### Phase 4: Backend Integration — **Completed**

**Objective:**  
Validate pipeline structure through backend analysis.

**Frontend:**
- Sends pipeline data (nodes and edges) to the backend on submit
- Displays backend response in a user-friendly alert

**Backend:**
- Calculates total number of nodes
- Calculates total number of edges
- Validates whether the pipeline forms a Directed Acyclic Graph (DAG)

**Response format:**
```json
{
  "num_nodes": 6,
  "num_edges": 5,
  "is_dag": true
}
