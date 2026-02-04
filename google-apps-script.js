/**
 * GOOGLE APPS SCRIPT FOR DINNER MAP TRACKER
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1n9dmKtioZurbXMqh_WWyybrOj4GqHue6BM2SxB09Qfc/edit
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Save (disk icon)
 * 5. Click Deploy > New deployment
 * 6. Click "Select type" (gear icon) > Web app
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click Deploy
 * 10. Copy the "Web app URL" and paste it into index.html (SCRIPT_URL variable)
 * 11. Click "Authorize access" and grant permissions
 * 
 * SHEET STRUCTURE:
 * The script expects these columns in your sheet (will auto-create if needed):
 * A: Country | B: Family | C: Notes | D: Cuisine | E: Difficulty | F: DateAdded
 */

// Your Google Sheet ID (from the URL)
const SHEET_ID = '1n9dmKtioZurbXMqh_WWyybrOj4GqHue6BM2SxB09Qfc';
const SHEET_NAME = 'DinnerData'; // Change this if you want a different sheet name

/**
 * Handle GET requests - Read all data
 */
function doGet(e) {
  try {
    const data = getAllData();
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests - Save/Update/Delete data
 */
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    
    let result;
    switch (action) {
      case 'save':
        result = saveCountry(params.country, params.data);
        break;
      case 'delete':
        result = deleteCountry(params.country);
        break;
      case 'reset':
        result = resetAll();
        break;
      default:
        throw new Error('Invalid action');
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, result: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get or create the sheet
 */
function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 6).setValues([
      ['Country', 'Family', 'Notes', 'Cuisine', 'Difficulty', 'DateAdded']
    ]);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }
  
  return sheet;
}

/**
 * Get all data from the sheet
 */
function getAllData() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return {}; // No data, just headers
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  const result = {};
  
  data.forEach(row => {
    const country = row[0];
    if (country) {
      result[country] = {
        family: row[1] || '',
        notes: row[2] || '',
        cuisine: row[3] || '',
        difficulty: row[4] || '',
        dateAdded: row[5] ? new Date(row[5]).toISOString() : ''
      };
    }
  });
  
  return result;
}

/**
 * Save or update a country
 */
function saveCountry(country, data) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  // Find if country already exists
  let rowIndex = -1;
  if (lastRow > 1) {
    const countries = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i][0] === country) {
        rowIndex = i + 2; // +2 because array is 0-indexed and row 1 is headers
        break;
      }
    }
  }
  
  // Prepare data
  const rowData = [
    country,
    data.family || '',
    data.notes || '',
    data.cuisine || '',
    data.difficulty || '',
    data.dateAdded ? new Date(data.dateAdded) : new Date()
  ];
  
  if (rowIndex > -1) {
    // Update existing row
    sheet.getRange(rowIndex, 1, 1, 6).setValues([rowData]);
  } else {
    // Add new row
    sheet.appendRow(rowData);
  }
  
  return { country: country, action: 'saved' };
}

/**
 * Delete a country
 */
function deleteCountry(country) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return { country: country, action: 'not_found' };
  }
  
  const countries = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < countries.length; i++) {
    if (countries[i][0] === country) {
      sheet.deleteRow(i + 2); // +2 because array is 0-indexed and row 1 is headers
      return { country: country, action: 'deleted' };
    }
  }
  
  return { country: country, action: 'not_found' };
}

/**
 * Reset all data (delete all rows except headers)
 */
function resetAll() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  
  return { action: 'reset', rowsDeleted: lastRow - 1 };
}

/**
 * Test function - run this to verify the script works
 */
function testScript() {
  Logger.log('Testing getAllData:');
  const data = getAllData();
  Logger.log(data);
  
  Logger.log('\nTesting saveCountry:');
  const saveResult = saveCountry('Test Country', {
    family: 'riley',
    notes: 'Test notes',
    cuisine: 'Test cuisine',
    difficulty: 'easy',
    dateAdded: new Date().toISOString()
  });
  Logger.log(saveResult);
  
  Logger.log('\nTesting deleteCountry:');
  const deleteResult = deleteCountry('Test Country');
  Logger.log(deleteResult);
  
  Logger.log('\nTest complete!');
}
