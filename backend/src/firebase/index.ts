import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import {resolve} from 'path';

const ADMIN_FIRE_CONFIG = readFileSync(resolve('./src/config/firebase-admin.config.js'), 'utf-8');

// Initialize Firebase
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(ADMIN_FIRE_CONFIG))
});

// Initialize Firebase Admin authentication reference
export const adminFireAuth = adminApp.auth();