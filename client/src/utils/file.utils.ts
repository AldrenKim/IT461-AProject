export function downloadBlob(blobFile: Blob) {
  const blobUrl = URL.createObjectURL(blobFile);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'leaf.obj';
  link.click();
}
