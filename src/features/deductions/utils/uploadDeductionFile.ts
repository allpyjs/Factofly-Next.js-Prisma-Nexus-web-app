export default async function uploadDeductionFile(id: number, file: any) {
  if (!file) return;
  const fileUploadFormData = new FormData();
  fileUploadFormData.append('file', file);
  const result = await fetch(`/api/deduction-file/${id}`, {
    method: 'POST',
    body: fileUploadFormData
  });

  if (result.status !== 200) throw Error('File upload failed');
}
