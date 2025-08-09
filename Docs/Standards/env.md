# Environment configuration

## Frontend (Vite)
- Use `.env.local` for local dev, `.env` for shared defaults, `.env.production` for prod builds.
- All variables must be prefixed with `VITE_`.
- Recommended keys:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=fireforge2-1d8f2
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_USE_EMULATORS=true
VITE_EMULATORS_HOST=localhost
VITE_EMULATORS_AUTH_PORT=9099
VITE_EMULATORS_FIRESTORE_PORT=8080
VITE_EMULATORS_STORAGE_PORT=9199
```

## Backend (Functions v2)
- Non-secrets: use `params` (`defineString`, `defineBoolean`, etc.).
- Secrets: use `defineSecret` with Secret Manager.
- Local dev: `.env.local` under `functions/` for params only.
- Example usage:
```ts
import { setGlobalOptions } from 'firebase-functions/v2';
import { defineString, defineSecret } from 'firebase-functions/params';
setGlobalOptions({ region: 'europe-west2' });
export const ALLOWLIST_ORIGINS = defineString('ALLOWLIST_ORIGINS', { default: 'http://localhost:5173' });
export const OPENAI_API_KEY = defineSecret('OPENAI_API_KEY');
```

## Git ignore policy
- `.env`, `.env.*`, `functions/.env*` ignored; `*.example` files are committed.
