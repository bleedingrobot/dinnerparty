# Google Sheets Integration Setup Guide

## Step 1: Set Up Google Apps Script

1. **Open your Google Sheet**
   - Go to: https://docs.google.com/spreadsheets/d/1n9dmKtioZurbXMqh_WWyybrOj4GqHue6BM2SxB09Qfc/edit

2. **Open Apps Script Editor**
   - Click **Extensions** > **Apps Script**

3. **Add the Script**
   - Delete any existing code in the editor
   - Open `google-apps-script.js` from this folder
   - Copy ALL the code
   - Paste it into the Apps Script editor

4. **Save the Script**
   - Click the **Save** icon (disk) or press `Ctrl+S`
   - Name it "Dinner Map API" when prompted

5. **Test the Script (Optional)**
   - Select the `testScript` function from the dropdown
   - Click **Run**
   - Grant permissions when prompted
   - Check the logs to ensure it works

6. **Deploy as Web App**
   - Click **Deploy** > **New deployment**
   - Click the **gear icon** next to "Select type"
   - Choose **Web app**
   - Configure:
     - **Description**: "Dinner Map API v1"
     - **Execute as**: "Me" (your account)
     - **Who has access**: "Anyone"
   - Click **Deploy**

7. **Authorize Access**
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** > "Go to Dinner Map API (unsafe)"
   - Click **Allow**

8. **Copy the Web App URL**
   - You'll see a URL like: `https://script.google.com/macros/s/ABC123.../exec`
   - **COPY THIS URL** - you'll need it in Step 2

## Step 2: Update Your Website

1. **Open index.html**

2. **Find this line** (around line 615):
   ```javascript
   const SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
   ```

3. **Replace** `YOUR_SCRIPT_URL_HERE` with the URL you copied in Step 1

4. **Save the file**

5. **Commit and push to GitHub**:
   ```bash
   git add index.html google-apps-script.js GOOGLE_SHEETS_SETUP.md
   git commit -m "Add Google Sheets integration"
   git push
   ```

## Step 3: Test Your Website

1. Open your website: https://bleedingrobot.github.io/dinnerparty/

2. Try adding a country - it should now save to Google Sheets!

3. Check your Google Sheet to see the data appear

## Data Structure

The script will create a sheet named "DinnerData" with these columns:

| Country | Family | Notes | Cuisine | Difficulty | DateAdded |
|---------|--------|-------|---------|------------|-----------|
| Italy | riley | Made pasta | Italian | easy | 2026-02-04 |
| Japan | murry | Sushi night | Asian | medium | 2026-02-03 |

## Troubleshooting

### "Script not found" error
- Make sure you deployed the script as a web app
- Check that "Who has access" is set to "Anyone"

### "Permission denied" error
- Re-authorize the script in Apps Script editor
- Make sure "Execute as" is set to "Me"

### Data not saving
- Check the Apps Script logs: View > Executions
- Verify the SCRIPT_URL in index.html is correct
- Make sure your Google Sheet ID matches in the script

### Changes not appearing
- Hard refresh your browser (Ctrl+F5)
- Wait a few seconds for GitHub Pages to update

## Security Notes

- The API is protected by your password prompts ("dinner" and "admin")
- Only people with the website URL can access it
- The Google Apps Script runs under YOUR Google account
- You can revoke access anytime in your Google Account settings

## Updating the Script

If you need to make changes:
1. Edit the script in Apps Script editor
2. Click **Deploy** > **Manage deployments**
3. Click the **pencil icon** to edit
4. Change **Version** to "New version"
5. Click **Deploy**
6. The URL stays the same, so no changes needed to your website!

## Dinner Photos (Cloudinary)

Photos are uploaded straight from the browser to Cloudinary (free tier) and
only the image URL is stored in the sheet.

### 1. Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com) (free)
2. **Settings → Upload → Upload presets → Add upload preset**
   - **Signing Mode:** Unsigned
   - **Folder:** `dinners` (keeps uploads tidy)
   - Under **Upload manipulations**, optionally add an incoming transformation
     like `c_limit,w_2000` and restrict **Allowed formats** to `jpg,png,webp`
   - Save and copy the **preset name**
3. Your **cloud name** is shown on the dashboard
4. In `index.html`, set:
   ```javascript
   const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
   const CLOUDINARY_UPLOAD_PRESET = 'your-preset-name';
   ```
   The photo field stays hidden until both are filled in.

### 2. Add the Photo column to the script

`google-apps-script.js` now writes a 7th column, **Photo**. Paste the updated
script into the Apps Script editor and **Deploy → Manage deployments → edit →
New version** (URL stays the same). The `Photo` header is added automatically
on the next save.

**Note:** unsigned uploads mean anyone with the site could upload to your
Cloudinary account. The free tier is generous, and the folder + format + size
limits on the preset keep it contained — tighten or rotate the preset if it is
ever abused.
