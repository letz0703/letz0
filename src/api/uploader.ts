export async function uploadImage(file: File): Promise<string> {
  const data: FormData = new FormData()
  data.append("file", file)
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
  const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL

  if (!preset || !url) {
    throw new Error("Cloudinary 환경변수가 설정되지 않았습니다.")
  }

  data.append("upload_preset", preset)

  const res: Response = await fetch(url, {
    method: "POST",
    body: data
  })

  const result: {secure_url: string} = await res.json()
  return result.secure_url
}
