import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Renders the VCRo Hub logo as the browser tab favicon.
// Next.js renders this at build time and auto-injects <link rel="icon"> into <head>.

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  // Read the logo from the public directory and encode it as base64
  // so it can be used as an <img> src inside ImageResponse.
  const logoData = await readFile(join(process.cwd(), "public", "logo.jpg"));
  const base64 = logoData.toString("base64");
  const logoSrc = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <img
          src={logoSrc}
          width={32}
          height={32}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    { ...size },
  );
}
