# 🌍 World Dinner Map Tracker

A simple static website for tracking themed dinners from countries around the world, hosted by Riley and Murry families.

## ✨ Features

- **Interactive World Map** - Click any country to add/edit dinner entries
- **Family Tracking** - Simple code system to track which family hosted each dinner
- **Color-Coded Countries** - Blue for Riley, Orange for Murry
- **Persistent Storage** - All data saved in browser's localStorage
- **Add/Edit/Delete** - Full CRUD operations for dinner entries
- **Statistics Dashboard** - See counts for each family
- **Notes Support** - Add details about dishes, dates, themes, etc.
- **Mobile Responsive** - Works on desktop and mobile devices

## 🚀 How to Use

1. **Open the website** - Simply open `index.html` in any modern web browser
2. **Click a country** on the map to add a dinner entry
3. **Enter family code**:
   - Type `riley` for Riley family
   - Type `murry` for Murry family
4. **Add notes** (optional) - Details about the dish, date, theme, etc.
5. **Save** - Your data is automatically saved in your browser

## 📁 File Structure

```
dinner-map-tracker/
├── index.html          # Complete single-file application
└── README.md           # This file
```

## 🌐 Deploying to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload `index.html` to the repository
3. Go to repository Settings → Pages
4. Under "Source", select the main branch
5. Click Save
6. Your site will be available at: `https://yourusername.github.io/repository-name/`

### Method 2: Using Git Command Line

```bash
# Initialize git repository
cd dinner-map-tracker
git init

# Add files
git add index.html README.md
git commit -m "Initial commit: World Dinner Map Tracker"

# Create repository on GitHub, then push
git remote add origin https://github.com/yourusername/dinner-map-tracker.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 💾 Data Storage

All dinner data is stored locally in your browser's `localStorage` under the key `dinnerCountries`.

**Data Format:**
```json
{
  "Italy": {
    "family": "riley",
    "notes": "Made authentic carbonara, March 2024"
  },
  "Japan": {
    "family": "murry",
    "notes": "Sushi night, April 2024"
  }
}
```

**Important Notes:**
- Data is stored per browser/device
- Clearing browser data will delete all entries
- No data is sent to any server
- Export/backup feature can be added if needed

## 🛠️ Technical Details

- **No Dependencies** - Single HTML file with embedded CSS and JavaScript
- **External Libraries** (loaded from CDN):
  - Leaflet.js 1.9.4 - Interactive map library
  - OpenStreetMap tiles - Free map data
- **Browser Compatibility** - Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- **No Server Required** - 100% client-side application

## 🎨 Customization

You can easily customize the website by editing `index.html`:

### Change Colors
Look for these CSS variables in the `<style>` section:
- Riley color: `#1976d2` (blue)
- Murry color: `#f57c00` (orange)
- Gradient: `#667eea` to `#764ba2` (purple gradient)

### Change Family Names
Search for "Riley" and "Murry" in the HTML and replace with your family names.

### Add More Families
Modify the JavaScript validation in the `saveCountry()` function to accept more codes.

## 🔒 Privacy & Security

- No user authentication (by design)
- Family codes are not passwords - they're lightweight identifiers
- All data stays on your device
- No cookies or tracking
- No data sent to external servers (except map tiles from OpenStreetMap)

## 📱 Mobile Support

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

**Map doesn't load:**
- Check your internet connection (map tiles require internet)
- Try refreshing the page
- Check browser console for errors

**Data disappeared:**
- Check if browser data was cleared
- Make sure you're using the same browser and device
- localStorage is per-domain, so file:// URLs may have issues

**Country not clickable:**
- Some smaller countries/islands may be hard to click - try zooming in
- Disputed territories may not be in the GeoJSON data

## 📄 License

This is a personal project. Feel free to use and modify as needed.

## 🙏 Credits

- **Leaflet.js** - Interactive map library
- **OpenStreetMap** - Map tiles and data
- **johan/world.geo.json** - Country boundary GeoJSON data

---

**Enjoy tracking your themed dinners! 🍽️🌍**
