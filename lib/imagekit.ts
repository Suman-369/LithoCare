import ImageKit from "imagekit";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  console.warn("Missing ImageKit environment variables.");
}

const safePubKey = publicKey && publicKey.trim().length > 0 ? publicKey.trim() : "placeholder-public-key";
const safePrivKey = privateKey && privateKey.trim().length > 0 ? privateKey.trim() : "placeholder-private-key";
const safeEndpoint = urlEndpoint && urlEndpoint.trim().length > 0 ? urlEndpoint.trim() : "https://ik.imagekit.io/placeholder";

export const imagekit = new ImageKit({
  publicKey: safePubKey,
  privateKey: safePrivKey,
  urlEndpoint: safeEndpoint,
});
