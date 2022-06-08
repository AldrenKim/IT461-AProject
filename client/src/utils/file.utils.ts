export function downloadBlob(blobFile: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blobFile);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.click();
}
