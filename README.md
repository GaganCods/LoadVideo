# LoadVideo

A fast, modern web application for loading, previewing, and downloading online videos.

## Overview

LoadVideo simplifies the process of saving online videos for offline viewing. Instead of dealing with complex workflows or unintuitive tools, users can paste a supported video URL to retrieve video details, preview the media, and download the file directly.

## Features

- **Video URL Input**: Easy URL input field with instant validation.
- **Video Information Loading**: Fast retrieval of video title, duration, author, thumbnail, and format options.
- **Video Preview**: Embedded preview player to confirm content before downloading.
- **Video Duration & Metadata**: Clear display of video duration, view counts, and available qualities.
- **Actual Video Downloading**: Direct downloading of full video (MP4) and audio (MP3/M4A) files.
- **Download Progress & Status**: Real-time status indicators during link generation and file processing.
- **Responsive Interface**: Modern layout optimized for desktop, tablet, and mobile screens.
- **Mobile and Desktop Support**: Full touch and mouse support across modern browsers.
- **Simple and Clean UI**: Dark-mode aesthetic designed for clarity and minimal clutter.
- **Error Handling**: Friendly error messages for invalid links, unsupported sources, or temporary network issues.

## How It Works

1. Enter a supported video URL in the input field.
2. Click the **Fetch Video** button.
3. The application retrieves the available video information.
4. The video preview, metadata, and format options are displayed.
5. Select a preferred quality or format and click **Download Video**.

## Usage

1. Open **LoadVideo** in any modern web browser.
2. Copy the video link from your browser address bar or share option.
3. Paste the URL into the input box on the LoadVideo homepage.
4. Review the loaded video preview and select your preferred quality (e.g., 1080p, 720p, MP3).
5. Click **Download** to save the media file to your local device.

## Supported URLs

LoadVideo works with supported public video URLs. Video availability and downloadable qualities depend on the original source and the video's permissions.

## Download

LoadVideo allows users to download the actual available video or audio file directly to their local device, rather than serving placeholder previews or restricted stream links.

## Interface

The user interface is built with desktop-first precision and mobile-first responsiveness. On smaller screens, the layout automatically adjusts controls and format selection cards for touch navigation, while desktop viewports take advantage of expanded preview panels and side-by-side metadata cards.

## Error Handling

LoadVideo handles common edge cases smoothly, providing clear notifications when:
- An **invalid or malformed URL** is entered.
- The URL belongs to an **unsupported source or private video**.
- The requested video is **unavailable or removed**.
- A **network or server error** occurs during retrieval.
- A **download request fails** or times out.

## Project Structure

```
├── public/              # Static public assets
├── src/
│   ├── components/      # React UI components
│   ├── data/            # Static data and blog guides
│   ├── lib/             # Utility functions and API helpers
│   ├── types/           # TypeScript interfaces and type definitions
│   ├── App.tsx          # Main application component & routing
│   └── main.tsx         # React DOM entry point
├── server.ts            # Node.js Express server
├── package.json         # Project dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Local Development

To run LoadVideo on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/loadvideo.git
   cd loadvideo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Start production server**:
   ```bash
   npm start
   ```

## Technologies

- **React 18**: Frontend UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast frontend build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Express**: Node.js backend server
- **Lucide React**: Vector icon suite

## Disclaimer

LoadVideo is intended for personal and educational use. Users should only download content that they own, hold the rights to, or have express permission from the copyright holder to download. Availability of media depends entirely on the source platform.

## License

This project is released under the [MIT License](LICENSE).
