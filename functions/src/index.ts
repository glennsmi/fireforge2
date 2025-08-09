/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions/v2";
import { onCall, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineString } from "firebase-functions/params";
import cors from "cors";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ region: "europe-west2" });

export const ALLOWLIST_ORIGINS = defineString("ALLOWLIST_ORIGINS", {
  default: "http://localhost:5173",
});

const corsMiddleware = cors({
  origin: (origin, cb) => {
    const allowlist = (ALLOWLIST_ORIGINS.value() || "").split(",").map((s) => s.trim());
    if (!origin || allowlist.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
});

export const healthCheck = onCall({ invoker: "public" }, async () => ({ ok: true }));

export const exampleHttp = onRequest(async (req, res) => {
  await new Promise<void>((resolve) => corsMiddleware(req, res, () => resolve()));
  res.json({ ok: true });
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

