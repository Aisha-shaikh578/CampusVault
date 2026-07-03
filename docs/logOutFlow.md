-- Log out Flow --

User clicks LogOut
↓
signOut function runs
↓
Firebase removes session
↓
onAuthStateChanged fires
↓
current user now became 'null'
↓
setUser(null)
↓
Context updates
↓
Components re-render