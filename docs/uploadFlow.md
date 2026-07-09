-- Upload Resource Flow --


User selects file
↓
React Dropzone gives back a file object
↓
Store that object in selectedFile state
↓
User clicks upload button
↓
handleUpload function runs
↓
Supabase storage stores file
↓
Supabase returns a public URL
↓
Firestore saves metadata + URL (received from supabase storage)