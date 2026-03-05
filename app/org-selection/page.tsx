import { OrganizationList } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="h-svh flex items-center justify-center bg-background">
      <OrganizationList
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        hidePersonal
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}

export default page;
