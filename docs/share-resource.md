-- Share Resource Flow --


User clicks Share button
↓
handleShare() runs
↓
fetchResourceById(resourceId)
↓
Resource data is returned
↓
Check if resource has fileUrl
↓
Check if browser supports navigator.share
↓
YES → navigator.share()
↓
Native share dialog opens
↓
User shares resource
↓
No → Copy resource link to clipboard [Back-up]
↓
Function ends