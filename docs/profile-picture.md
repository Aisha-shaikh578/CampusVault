-- Update Profile Picture --


User selects image
↓
Supabase uploads image
↓
Supabase gives public URL
↓
Firebase stores URL
↓
setProfilePic(profileImgUrl)
↓
AuthContext state changes
↓
Every component using profilePic re-renders
↓
ProfilePicture displays new image