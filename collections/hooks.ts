import type { FieldHook } from "payload";
import { emptyToNull } from "@/lib/cms/path";

export const emptyStringToNull: FieldHook = ({ value }) => emptyToNull(value);
