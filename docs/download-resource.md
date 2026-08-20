-- Download Resource --


User clicks Download
↓
handleDownload()
↓
fetchResourceById(resourceId)
↓
Get resource information from your database
↓
Get resource.fileUrl
↓
fetch(resource.fileUrl)
↓
Browser requests the actual file
↓
Server/storage sends file data back
↓
response.blob()
↓
File data becomes a Blob object
↓
URL.createObjectURL(blob)
↓
Temporary browser URL is created
↓
Create <a> element
↓
Set href = temporary URL
↓
Set download = filename
↓
link.click()
↓
Browser starts download
↓
Remove <a>
↓
Revoke temporary URL