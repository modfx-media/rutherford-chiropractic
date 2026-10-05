"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { getServerURL } from "./url";

export function LivePreviewListener() {
  const router = useRouter();
  return (
    <RefreshRouteOnSave refresh={router.refresh} serverURL={getServerURL()} />
  );
}
