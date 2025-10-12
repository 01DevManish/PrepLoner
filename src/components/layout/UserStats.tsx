'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { auth, db } from '@/lib/firebaseClient';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  increment, 
  serverTimestamp, 
  Timestamp // Import Timestamp for typing
} from 'firebase/firestore';
import { Award, Flame, Gem} from 'lucide-react';
import { useIdle } from 'react-use';

// --- CONFIGURATION ---
const IDLE_TIMEOUT_MS = 1 * 60 * 1000;
const XP_UPDATE_INTERVAL_MS = 1 * 60 * 1000;

// --- Type Definition for our Firestore User Document ---
interface UserDocData {
  xp: number;
  streak: number;
  lastLogin: Timestamp;
  createdAt: Timestamp;
}

const getLevelConfig = (streak: number) => {
  if (streak >= 30) return { level: 5, xpPer30Min: 30 };
  if (streak >= 20) return { level: 4, xpPer30Min: 25 };
  if (streak >= 10) return { level: 3, xpPer30Min: 20 };
  if (streak >= 5) return { level: 2, xpPer30Min: 15 };
  return { level: 1, xpPer30Min: 10 };
};

const UserStats = () => {
  const [stats, setStats] = useState({ xp: 0, streak: 0, level: 1, loading: true });
  const [showLevel, setShowLevel] = useState(false);
  const user = auth.currentUser;
  const isIdle = useIdle(IDLE_TIMEOUT_MS);
  const statsRef = useRef<HTMLDivElement>(null);

  const grantActiveTimeXp = useCallback(async () => {
    if (!user) return;
    const { xpPer30Min } = getLevelConfig(stats.streak);
    const xpToAdd = Math.round(xpPer30Min / 30);
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { xp: increment(xpToAdd) }, { merge: true });
  }, [user, stats.streak]);

  // The 'any' type is now replaced with our specific UserDocData interface
  const updateUserStreak = useCallback(async (currentData: UserDocData) => {
    if (!user) return;
    const today = new Date();
    const lastLogin = currentData?.lastLogin?.toDate(); // .toDate() is available on Timestamp
    if (!lastLogin || lastLogin.toDateString() !== today.toDateString()) {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const userDocRef = doc(db, 'users', user.uid);
      let newStreak = 1;
      if (lastLogin && lastLogin.toDateString() === yesterday.toDateString()) {
        newStreak = (currentData.streak || 0) + 1;
      }
      await setDoc(userDocRef, { streak: newStreak, lastLogin: serverTimestamp() }, { merge: true });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setStats(prev => ({ ...prev, loading: false }));
      return;
    }
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        // Use type assertion to tell TypeScript the shape of our data
        const data = doc.data() as UserDocData;
        const currentStreak = data.streak || 0;
        const { level } = getLevelConfig(currentStreak);
        setStats({ xp: data.xp || 0, streak: currentStreak, level: level, loading: false });
        updateUserStreak(data);
      } else {
        setDoc(userDocRef, { xp: 0, streak: 0, lastLogin: serverTimestamp(), createdAt: serverTimestamp() });
      }
    });
    return () => unsubscribe();
  }, [user, updateUserStreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (user && !isIdle && !stats.loading) {
      interval = setInterval(() => { grantActiveTimeXp(); }, XP_UPDATE_INTERVAL_MS);
    }
    return () => clearInterval(interval);
  }, [user, isIdle, stats.loading, grantActiveTimeXp]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statsRef.current && !statsRef.current.contains(event.target as Node)) {
        setShowLevel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (stats.loading || !user) return null;

  return (
    <div className="flex items-center gap-3" ref={statsRef}>
      <div className="relative">
        <div
          className="flex items-center gap-2 bg-orange-100 dark:bg-orange-800/50 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => setShowLevel(!showLevel)}
        >
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-sm text-orange-600 dark:text-orange-300">{stats.streak}</span>
        </div>

        {showLevel && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max flex items-center gap-2 bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full shadow-lg">
            <Award className="h-5 w-5 text-purple-500" />
            <span className="font-bold text-sm text-purple-600 dark:text-purple-300">
              Level {stats.level}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-800/50 px-3 py-1 rounded-full">
        <Gem className="h-5 w-5 text-yellow-500" />
        <span className="font-bold text-sm text-yellow-600 dark:text-yellow-300">{stats.xp}</span>
      </div>
    </div>
  );
};

export default UserStats;