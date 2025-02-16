import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "72px",
            fontWeight: "bold",
          }}
        >
          TodoList
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
