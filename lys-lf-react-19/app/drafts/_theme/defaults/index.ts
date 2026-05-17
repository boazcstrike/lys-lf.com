/**
 * Draft-default palettes barrel.
 *
 * Each dN.ts exports a PLACEHOLDER Scheme that draft-N coders should
 * overwrite with exact production hex values.
 *
 * To add a new draft default:
 *   1. Create dN.ts with id "dN-default"
 *   2. Add the id to SchemeId in ../schemes.ts
 *   3. Import and append to DRAFT_DEFAULTS below
 */

import type { Scheme } from "../schemes"
import { d1_DEFAULT } from "./d1"
import { d2_DEFAULT } from "./d2"
import { d3_DEFAULT } from "./d3"
import { d4_DEFAULT } from "./d4"
import { d5_DEFAULT } from "./d5"

export const DRAFT_DEFAULTS: readonly Scheme[] = [
  d1_DEFAULT,
  d2_DEFAULT,
  d3_DEFAULT,
  d4_DEFAULT,
  d5_DEFAULT,
]
