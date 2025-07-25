
# Sanatana Peethams Portal: Website Architecture & Philosophy

This document provides a comprehensive "map" of the Sanatana Peethams Portal, outlining the purpose and philosophy behind every section. It is intended to guide future development and to serve as a blueprint for any AI or developer tasked with understanding, recreating, or improving the platform.

---

## 1. Core Philosophy: "Shivbodh - The Journey from Shunya to Purna"

The entire portal is built upon this guiding principle.

-   **Shunya (The Void - '0'):** Represents the state of the modern seeker – overwhelmed by scattered, unverified information, leading to confusion and a spiritual void.
-   **Purna (The Fullness - '1'):** Represents the goal – a state of clarity, completeness, and non-dual understanding (Advaita). It's the realization of the Self.
-   **The Portal's Role:** Our platform acts as the bridge (Setu) in this journey. We take the '0' of fragmented data and curate it into the '1' of a single, trusted, and unified source of wisdom, helping the user move from confusion to clarity.

---

## 2. Primary Mission

Our mission is to build a trusted, unified, and authoritative digital home for the four cardinal Peethams established by Jagadguru Adi Shankaracharya. We aim to:

-   **Preserve & Propagate:** To act as a living archive of the teachings, events, and history of the four Amnaya Peethams.
-   **Connect Devotees:** To provide a secure, private, and Dharma-centric platform for the global Sanatani community to connect.
-   **Empower Sādhanā:** To offer digital tools that support and enhance a devotee's daily spiritual practice.

---

## 3. Website Map: A Tour of Every Section

### 3.1 Main Navigation Menu

The header navigation is designed to guide the user through the primary pillars of the portal.

#### 1. **Peethams**
-   **Why we built it:** This is the foundational pillar of the portal. Its purpose is to be the most structured and authoritative online encyclopedia for the four cardinal Maṭhas.
-   **Details:**
    -   **Main Page (`/peethams`):** Introduces the concept of the four Peethams, their establishment by Adi Shankaracharya, and a quick overview of the current pontiffs.
    -   **Individual Peetham Pages (`/peethams/sringeri`, etc.):** Each page is a deep dive into that specific Maṭha. It includes:
        -   **About the Acharya(s):** Detailed, well-researched information on the current pontiffs.
        -   **Teachings & Activities:** The core philosophy of that Peetham (e.g., "Aham Brahmāsmi" for Sringeri) and recent activities.
        -   **Lineage (Guru Parampara):** Tracing the sacred lineage of masters.
        -   **Media Hub (Events, Photos, Videos):** A filtered view of the Bodha Calendar, showing content only from that Peetham. This creates a dedicated space for each Maṭha.
        -   **Seva:** Information on how to serve that specific Peetham.

#### 2. **Social**
-   **Why we built it:** To solve the problem of Sanatanis being scattered across mainstream social media platforms that are often noisy and not conducive to dharmic discourse. We provide a private, secure, and focused alternative.
-   **Details (`/social`):** This is the user's personal hub.
    -   **Landing Page (for non-logged-in users):** Highlights the features and benefits to encourage sign-ups.
    -   **Feed Tab:** The community wall. Users can share public or personal posts.
    -   **My Profile Tab:** The user's dashboard. Shows their details, achievements (badges, quiz scores), and links to other personal tools. This is their "home".
    -   **Dainandini Tab (Now Bodha Calendar):** The original concept of a private diary has been integrated into the "My Bodha Calendar" for a unified experience.
    -   **Campaigns Tab:** A unique feature allowing users to create and support dharmic causes, moving beyond just discussion into action.
    -   **Notifications Tab:** Manages interactions like Mitra (friend) requests.

#### 3. **Bodha (Knowledge & Practice)**
-   **Why we built it:** To provide a complete suite of tools and resources that support a user's daily Sādhanā (spiritual practice) and learning. It's the practical application of the portal's wisdom.
-   **Details:**
    -   **Bodha Calendar (`/events`):** The unified heart of our content. It's a living archive of all media (photos, videos, events) from all four Peethams, filterable by date and Peetham.
    -   **Reading Room (`/reading`):** A digital library of core Advaita Vedanta texts, starting with "Bhaja Govindam". Designed for immersive reading.
    -   **Panchanga (`/panchanga`):** A service providing daily astrological details, a crucial part of daily life for many devotees.
    -   **Sādhanā Suite (`/sadhana`):** A collection of practical tools:
        -   **Japa Counter:** For mantra recitation.
        -   **Meditation Timer:** For silent practice.
        -   **Daily Wisdom:** A contemplative quote to start the day.
        -   **Vedic Name Finder:** A tool rooted in tradition for a significant life event.

#### 4. **About**
-   **Why we built it:** To establish trust and transparency with the user. This section explains our identity, our mission, and our philosophy.
-   **Details:**
    -   **Our Mission (`/mission`):** Explains the "why" behind the portal's existence.
    -   **Our Philosophy (`/philosophy`):** Details the "Shivbodh" concept.
    -   **Contact Us (`/contact`):** Provides a way for users to connect with the volunteer team.

### 3.2 Other Key Corners

-   **Seva Hub (`/seva`):** This is a unique feature designed to connect volunteers with service opportunities at the Peethams. The interactive 3D map is a modern, engaging way to explore the sacred geography and inspire a desire to serve.
-   **Knowledge Quiz (`/quiz`):** A gamified way for users to learn about the Peethams. It's an interactive educational tool that makes learning fun and rewards users with points on their profile.
-   **Login Page (`/login`):** The gateway to all personal and community features. We use Google Sign-In for simplicity and security.

---

## 4. Technical Blueprint

-   **Frontend:** Next.js (with React) for a modern, fast, and SEO-friendly user experience. Server Components are used for performance.
-   **UI:** ShadCN UI and Tailwind CSS for a clean, professional, and easily maintainable design system.
-   **Backend & Database:** Firebase (Authentication, Firestore, App Hosting). Chosen for its seamless integration, scalability, and robust security.
-   **Generative AI:** Genkit (with Google's Gemini models) for features like the Panchanga generator and Daily Wisdom. This allows us to create dynamic, intelligent content.

By documenting this structure, we hope to provide a clear path for building upon this foundation, ensuring that every new feature aligns with our core mission of serving Dharma.
