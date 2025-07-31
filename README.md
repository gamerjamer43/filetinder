# FileTinder
An interface for file management that looks similar to Tinder, made to help you organize your cluttered folders, and built with Flask and vanilla JavaScript. I don't know why I like this stack so much compared to something like react, but we ball.

---

## Overview
FileTinder provides a swipeable card interface for managing files. Users can swipe right to approve (✅) or left to reject (❌) files in a visually engaging way. This will eventually be expanded to a full sorting application allowing you to declutter the sheer amount of files you may have on your computer.

## Stack
- Backend: Python (flask framework)
- Frontend: Vanilla JS
- Styling: CSS3
- Data Storage: JSON (switching to mongo in prod)

---

## Getting Started

### Prerequisites
- Python 3.x
- Flask

### Installation
1. Clone the repository
2. Install dependencies:
```sh
pip install flask
```

### Running the Application
Start the Flask server:
```sh
python app.py
```
Visit `http://localhost:5000` in your browser.

---

## Project Structure
```
filetinder/
├── app.py          # Flask application
├── file.py         # File dataclass definition
├── data/
│   └── info.json   # Sample profile data
├── static/
│   ├── app.js      # Frontend logic
│   ├── styles.css  # Styling
│   └── images/     # Image assets
└── templates/
    └── index.html  # Main template
```

## Contribution
This is a very much so work in progress. If a real human being actually would like to contribute to this, by all means reach out to me.