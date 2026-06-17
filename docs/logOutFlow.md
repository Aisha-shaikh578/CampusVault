-- Log out Flow --
User clicks LogOut
|
v
signOut function runs
|
v
Firebase removes session
|
v
onAuthStateChanged fires
|
v
current user now became 'null'
|
v
setUser(null)
|
v
Context updates
|
v
Components re-render