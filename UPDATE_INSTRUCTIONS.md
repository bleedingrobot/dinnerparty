# Google Sheets Integration - Manual Update Instructions

Since the file is complex, here are the specific changes you need to make to index.html:

## Step 1: Add the Script URL Configuration

Find this line (around line 805):
```javascript
        /**
         * DATA STORAGE
```

Replace it with:
```javascript
        /**
         * GOOGLE SHEETS INTEGRATION
         * Replace YOUR_SCRIPT_URL_HERE with your Google Apps Script web app URL
         * See GOOGLE_SHEETS_SETUP.md for instructions
         */
        const SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
        const USE_GOOGLE_SHEETS = SCRIPT_URL !== 'YOUR_SCRIPT_URL_HERE';

        /**
         * DATA STORAGE
         * Data is now stored in Google Sheets via Apps Script API
         * localStorage is used as a cache for faster loading
```

## Step 2: OR Use The Pre-configured Version

I can create a completely new version of the index.html file with Google Sheets integration built-in.

Would you like me to:
A) Create a new index-google-sheets.html file with everything configured
B) Provide the step-by-step manual instructions to update the current file

Let me know and I'll proceed!
