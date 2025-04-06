export async function isValidPassword(
  password: string,
  hashedPassword: string
) {
  console.log(await hashPassword(password));
  return (await hashPassword(password)) === hashedPassword;
}

async function hashPassword(password: string) {
  //https://youtu.be/iqrgggs0Qk0?t=6326
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  //console.log(arrayBuffer);

  return Buffer.from(arrayBuffer).toString("base64");
}
