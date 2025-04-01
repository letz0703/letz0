export async function uploadImage(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

  const res = await fetch(NEXT_PUBLIC_CLOUDINARY_PRESET, {
    method: "POST",
    body: data
  });

  const result = await res.json();
  return result.secure_url;
}
