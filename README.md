# ZenSpace

## About

**ZenSpace** is a powerful tool designed to help you monitor, analyze, and improve your emotional well-being. With an intuitive interface and features tailored for mindfulness and self-care, this app empowers users to gain better insights into their emotions and adopt healthier habits.

## Features

### 1. Mood Tracking

Log your daily moods effortlessly and keep track of your emotional health over time.

### 2. Mood Visualization

View your mood trends and distributions through vibrant and interactive charts.

### 3. Mood Analysis

Identify patterns in your emotional state and uncover insights to improve your mental well-being.

### 4. Video Recommendations

Access curated videos designed to uplift your mood and provide mental health support.

## Services

The app offers the following services:

-   **Mood Tracking**: Log and track your emotions daily.  
    _Icon: 😊_
-   **Mood Visualization**: See your mood trends with detailed charts.  
    _Icon: 📊_
-   **Mood Analysis**: Gain insights into patterns and emotional triggers.  
    _Icon: 📈_
-   **Video Recommendations**: Watch curated videos to improve your mental health.  
    _Icon: 🎥_

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/zenspace.git
    ```

2. Navigate to the project directory:

    ```bash
    cd zenspace
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open the app in your browser at `http://localhost:3000`.

## Tech Stack

-   **Frontend**: React, Tailwind CSS
-   **State Management**: Zustand
-   **Backend Services**: YouTube API, Google Cloud Functions
-   **Charts**: Chart.js
-   **UI Components**: Custom and third-party libraries

## Usage

1. Log in to access the app.
2. Start tracking your daily mood using the "Mood Tracking" feature.
3. View your emotional trends in the "Mood Visualization" section.
4. Analyze your mood patterns through "Mood Analysis."
5. Watch recommended videos in the "Video Recommendations" section to uplift your spirit.

## Development

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
```

### File Structure

```bash
zenspace/
├── components/      # Reusable UI components
├── pages/           # Next.js pages
├── store/           # Zustand store for state management
├── actions/         # API calls and server actions
├── styles/          # Global and component-specific styles
└── utils/           # Utility functions
```

### Running Tests

Run tests using:

```bash
npm run test
```

## Contributing

We welcome contributions! Feel free to submit issues or pull requests. Make sure to follow the guidelines in `CONTRIBUTING.md`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
