
# Proposal: Adding User-Specific & Interactive Features

This document outlines the plan for adding the following features to the Sanatana Peethams Portal:

*   **Video Watched Status:** A system to track which videos a user has watched.
*   **Audio Player:** A way to listen to the audio from the video pravachanas.
*   **Personal User Notebook:** A private space for users to take and save notes.
*   **Kids Corner:** A creative and fun section for young children.
*   **Quiz & Game Section:** Interactive quizzes to test knowledge about the Peethams.

These are excellent features that will greatly enhance the user experience. To implement them, we will evolve the website from a static portal into a dynamic web application with user accounts and a database where necessary.

---

## The Plan

Here is a high-level overview of the plan to implement these features:

### 1. User Authentication (For Personalized Features)

We need a way for users to create accounts and log in. This will allow us to store user-specific data (like notes and quiz scores) securely.

*   **Technology:** We will use a service like **Firebase Authentication** to handle user sign-up, login, and session management. It's a secure, industry-standard solution.
*   **Changes to the Website:**
    *   Add "Login" and "Sign Up" buttons to the website header.
    *   Create dedicated pages for login and sign-up.
    *   Create a user profile page where users can manage their account details.

### 2. Database (For Personalized Features)

We need a database to store the data for each user.

*   **Technology:** We will use **Firebase Firestore**, a modern NoSQL database that works perfectly with Firebase Authentication.
*   **Data to be Stored:**
    *   **User Profiles:** Basic user information.
    *   **Watched Videos:** A list of video IDs that a user has marked as watched.
    *   **User Notes:** The notes that users create in their personal notebook.
    *   **Quiz Scores:** User scores from the quiz section to track their progress.

### 3. Feature Implementation

#### a. Video Watched Status & Audio Player

*   **Watched Status:** When a logged-in user watches a video, we will save that information to their account in the database. The website will then display a visual indicator (e.g., a checkmark) next to the videos the user has already seen.
*   **Audio Player:** We will create a dedicated audio player on the page. We will begin by using manually uploaded audio files for a few key pravachanas.

#### b. User Notebook

*   We will create a new "My Notebook" page, accessible only to logged-in users.
*   On this page, users will have a simple text editor to create, edit, and delete their private notes.

#### c. Kids Corner

A dedicated section for children to engage with the spiritual figures in a fun and creative way.

*   **Target Audience:** Children aged 1-8.
*   **Features:**
    *   **Digital Coloring/Scratching:** We will create an interface where children can select an image (e.g., of an Acharya) and either color it in or "scratch" away a top layer to reveal the image.
    *   **Image Gallery:** A curated gallery of images of the Shankaracharyas, both past and present, presented in a child-friendly way.
*   **Technology:** We will use a simple HTML5 canvas library for the coloring and scratching functionality. This does **not** require user login.

#### d. Quiz & Game Section

A fun and educational section to test users' knowledge.

*   **Features:**
    *   **Peetham Quizzes:** We will create a quiz for each Peetham, with questions about their history, philosophy, and associated Acharyas.
    *   **Scoring:** The quizzes will be scored, and users will see their results at the end.
    *   **Saved Progress:** If the user is logged in, their quiz scores can be saved to their profile, allowing them to track their progress over time.
*   **Technology:** We will create a simple quiz engine using React. The quiz questions and answers will be stored in a separate data file, making it easy to add new quizzes.

---

## Summary & Next Steps

This is a significant but exciting project that will transform the website into a personalized spiritual resource for every user.

Before I proceed with these changes, I would like to get your approval on this updated plan. Please let me know if you have any questions or if you would like to make any adjustments.
