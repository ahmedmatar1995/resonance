import { prisma } from "@/lib/db";
import React from "react";

async function page() {
  const voices = await prisma.voice.findMany();
  return (
    <div>
      <p>home page</p>
      <p>{JSON.stringify(voices, null, 2)}</p>
    </div>
  );
}

export default page;
