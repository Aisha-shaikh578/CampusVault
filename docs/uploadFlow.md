-- Upload Resource Flow --

User clicks upload button
↓
handleUpload function runs
↓
Supabase storage stores file
↓
Gets public file URL
↓
Firestore saves metadata + URL (received from supabase storage)