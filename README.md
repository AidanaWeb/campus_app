<p align='center'>
    <img src='https://img.shields.io/badge/React%20Native-Expo-61DAFB?style=for-the-badge&logo=react' />
    <img src='https://img.shields.io/badge/NestJS-Backend-E0234E?style=for-the-badge&logo=nestjs' />
    <img src='https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql' />
</p>

Mobile application for publishing and viewing internal university announcements, news, and events for students and staff.

## Table of contents

- [Preview](#preview)
- [Tech stack](#tech-stack)
- [Screens](#screens)
- [Features](#features)
  - [Home](#home)
  - [Post](#post)
  - [Settings](#settings)
- [Future Improvements](#future-improvements)

## Preview

<!-- ![main screen filter](./assets/main_screen_buttons.gif) -->
<img src="./assets/main_screen_buttons.gif" width="500" />

## Tech stack

- TypeScript

Frontend

- React Native (Expo)
- Redux toolkit, RTK Query
- expo router
- i18next

Backend

- Nest.js
- PostgreSQL
- Prisma ORM

## Screens

- Home (Feed)
- Create post
- Post details
- Profile
- Settings
- Signup / Login

## Features

- 🔐 Authentication (JWT)
- 📝 Post CRUD (create, read, delete)
- 🔍 Search & filtering
- 👤 User profiles
- 🌙 Dark / Light theme
- 🌐 Multi-language support (i18next)
- 📤 Share posts
- 🖼 Image upload (Expo ImagePicker)

### Home

<!-- ![search](./assets/search.gif) -->
<!-- ![open profile](./assets/open_profile.gif) -->

<p>
    <img src='./assets/search.gif' width=500 />
    <img src='./assets/open_profile.gif' width=500 />
</p>

### Post

<!-- ![open post](./assets/open_post.gif) -->
<!-- ![create post](./assets/create_post.gif) -->

<p>
    <img src='./assets/open_post.gif' width=500 />
    <img src='./assets/create_post.gif' width=500 />
</p>

### Settings

<!-- ![settings](./assets/settings.gif) -->

<img src='./assets/settings.gif' width=500 />

## Future Improvements

- Edit posts functionality
- Likes and comments system
- Push notifications
