"use client";

import dynamic from "next/dynamic";
import { AVATAR_URL } from "@/config/site";
import AvatarPlaceholder from "./AvatarPlaceholder";

const Avatar3D = dynamic(() => import("./Avatar3D"), { ssr: false });

type Framing = "head" | "bust" | "full";

export default function Avatar({
  framing = "bust",
  width = 420,
  height = 520,
  placeholderSize,
}: {
  framing?: Framing;
  width?: number;
  height?: number;
  placeholderSize?: number;
}) {
  if (AVATAR_URL) {
    return (
      <div
        className="relative"
        style={{ width, height }}
      >
        <div className="absolute inset-[-15%] rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_40%,rgba(45,212,168,0.35),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(255,107,181,0.3),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0">
          <Avatar3D
            url={AVATAR_URL}
            framing={framing}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }
  return <AvatarPlaceholder size={placeholderSize ?? Math.min(width, height)} />;
}
