'use client';


import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ClockIcon, BookmarkIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import gaQuestions from '@/data/ga-questions.json';
import mathQuestions from '@/data/math-questions.json';
import dlQuestions from '@/data/dl-questions.json';
import coaQuestions from '@/data/coa-questions.json';
import dsQuestions from '@/data/ds-questions.json';
import algoQuestions from '@/data/algo-questions.json';
import tocQuestions from '@/data/toc-questions.json';
import cdQuestions from '@/data/cd-questions.json';
import osQuestions from '@/data/os-questions.json';
import dbmsQuestions from '@/data/dbms-questions.json';
import cnQuestions from '@/data/cn-questions.json';

import { auth, db } from '@/lib/firebaseClient';
import { User, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup, linkWithCredential } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type Question = {
  id: number;
  subject?: string;
  topic: string;
  question: string;
  options: { [key: string]: string | undefined };
  answer: string;
  explanation?: string;
};
type AnswerStatus = 'answered' | 'notAnswered' | 'markedForReview' | 'answeredAndMarked';
type Answer = { selectedOption?: string; status: AnswerStatus };

const allQuestions = [
    ...gaQuestions, ...mathQuestions, ...dlQuestions, ...coaQuestions, ...dsQuestions,
    ...algoQuestions, ...tocQuestions, ...cdQuestions, ...osQuestions, ...dbmsQuestions, ...cnQuestions
];

export default function TestPage() {
  const params = useParams();
  const topic = decodeURIComponent(params.topic as string);

  const topicQuestions: Question[] = useMemo(() => allQuestions.filter((q) => q.topic.trim() === topic.trim()), [topic]);

  const [user, setUser] = useState<User | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: Answer }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(topicQuestions.length > 0 ? topicQuestions.length * 60 : 60);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        signInAnonymously(auth).catch(error => console.error("Anonymous sign-in failed:", error));
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = useCallback(() => {
    let finalScore = 0;
    topicQuestions.forEach((q) => {
      if (userAnswers[q.id]?.selectedOption === q.answer) finalScore++;
    });
    setScore(finalScore);
    setIsSubmitted(true);
    setIsReviewMode(false);
  }, [topicQuestions, userAnswers]);

  const handleSaveResults = async () => {
    if (!user) return alert("An error occurred with your session. Please try again.");
    try {
      let finalUser = user;
      if (user.isAnonymous) {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) throw new Error("Could not get credential from Google sign-in.");
        await linkWithCredential(user, credential);
        finalUser = auth.currentUser!;
      }

      const correctQuestionIds: number[] = [];
      const incorrectQuestionIds: number[] = [];
      
      // FIX #1: Replaced the ternary operator with a standard if/else block
      for (const q of topicQuestions) {
        const userAnswer = userAnswers[q.id]?.selectedOption;
        if (userAnswer) {
          if (userAnswer === q.answer) {
            correctQuestionIds.push(q.id);
          } else {
            incorrectQuestionIds.push(q.id);
          }
        }
      }
      
      const attemptData = {
        userId: finalUser.uid,
        topic,
        subject: topicQuestions[0]?.subject || "Unknown",
        score,
        totalQuestions: topicQuestions.length,
        correctQuestionIds,
        incorrectQuestionIds,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "testAttempts"), attemptData);
      alert("Your results have been saved successfully!");
      window.location.assign('/dashboard');
    } catch (error: unknown) { // FIX #2: Use 'unknown' instead of 'any'
      console.error("Error saving results: ", error);
      if (error instanceof Error) {
        alert(`Failed to save results: ${error.message}`);
      } else {
        alert('An unknown error occurred while saving results.');
      }
    }
  };

  useEffect(() => {
    if (isSubmitted || isReviewMode || topicQuestions.length === 0) return;
    if (timeLeft <= 0) {
      alert("Time is up! Submitting your test automatically.");
      handleSubmit();
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isSubmitted, isReviewMode, handleSubmit, topicQuestions.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
  
  const handleAnswerSelect = (questionId: number, selectedOption: string) => {
    const currentStatus = userAnswers[questionId]?.status;
    const newStatus = currentStatus === 'markedForReview' || currentStatus === 'answeredAndMarked' ? 'answeredAndMarked' : 'answered';
    setUserAnswers({ ...userAnswers, [questionId]: { selectedOption, status: newStatus } });
  };

  const handleMarkForReview = () => {
    const qId = currentQuestion.id;
    const currentAnswer = userAnswers[qId];
    let newStatus: AnswerStatus = 'markedForReview';
    if (currentAnswer?.status === 'answered') newStatus = 'answeredAndMarked';
    if (currentAnswer?.status === 'answeredAndMarked') newStatus = 'answered';
    if (currentAnswer?.status === 'markedForReview') {
       newStatus = currentAnswer.selectedOption ? 'answered' : 'notAnswered';
    }
    setUserAnswers({ ...userAnswers, [qId]: { ...currentAnswer, status: newStatus } });
    goToNext();
  };

  const goToNext = () => { if (currentQuestionIndex < topicQuestions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1); };
  const goToPrevious = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1); };
  
  if (topicQuestions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h2 className="text-2xl font-bold mb-4">Loading Test...</h2>
            {/* FIX #3: Replaced ' with &apos; to fix the unescaped entity error. */}
            <p className="text-gray-600">If the test doesn&apos;t load, please go back and select another topic.</p>
            <Link href="/" className="mt-6"><button className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Back to Topics</button></Link>
        </div>
    );
  }
  
  const currentQuestion = topicQuestions[currentQuestionIndex];

  if (isSubmitted && !isReviewMode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="p-8 bg-white rounded-xl shadow-lg text-center max-w-lg w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Completed!</h2>
          <p className="text-xl text-gray-600">Your final score is:</p>
          <p className="text-6xl font-extrabold text-blue-600 my-4">{score} / {topicQuestions.length}</p>
          <div className="space-y-4 mt-8">
            {user && user.isAnonymous && (
              <button onClick={handleSaveResults} className="w-full px-6 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                Login with Google to Save Results
              </button>
            )}
            <button onClick={() => { setIsReviewMode(true); setCurrentQuestionIndex(0); }} className="w-full px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Review Answers
            </button>
            <Link href="/" className="block w-full"><button className="w-full px-6 py-3 font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">Back to Topics</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100">
       <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm shrink-0">
        <h1 className="text-xl font-bold text-gray-800">{isReviewMode ? `Reviewing: ${topic}` : topic}</h1>
        {!isReviewMode ? (
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 text-red-600 font-semibold"><ClockIcon className="h-6 w-6" /><span>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span></div>
            <button onClick={toggleFullscreen} className="text-gray-600 hover:text-gray-900 hidden sm:block">
              {isFullscreen ? <ArrowsPointingInIcon className="h-6 w-6" /> : <ArrowsPointingOutIcon className="h-6 w-6" />}
            </button>
            <button onClick={() => {if(window.confirm("Are you sure?")) handleSubmit()}} className="px-5 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Submit Test</button>
          </div>
        ) : (
          <button onClick={() => setIsReviewMode(false)} className="px-5 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Back to Score</button>
        )}
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-500 mb-2">Question {currentQuestionIndex + 1} of {topicQuestions.length}</p>
            <p className="text-xl font-medium text-gray-900 mb-6">{currentQuestion.question}</p>
            <div className="space-y-4">
              {Object.entries(currentQuestion.options).map(([key, value]) => {
                const isSelected = userAnswers[currentQuestion.id]?.selectedOption === key;
                const isCorrect = currentQuestion.answer === key;
                let reviewClass = '';
                if (isReviewMode) {
                  if (isCorrect) reviewClass = 'bg-green-100 border-green-500 text-green-900';
                  else if (isSelected) reviewClass = 'bg-red-100 border-red-500 text-red-900';
                }
                
                return (
                  <div key={key} className={`flex items-start p-4 border-2 rounded-lg transition-all ${isReviewMode ? '' : 'cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500'} ${reviewClass}`}>
                    {isReviewMode && isCorrect && <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3 shrink-0" />}
                    {isReviewMode && isSelected && !isCorrect && <XCircleIcon className="h-6 w-6 text-red-600 mr-3 shrink-0" />}
                    <input type="radio" name={`q_${currentQuestion.id}`} className={`h-5 w-5 mt-1 mr-4 shrink-0 ${isReviewMode ? 'hidden' : ''}`} checked={isSelected} onChange={() => handleAnswerSelect(currentQuestion.id, key)} disabled={isReviewMode} />
                    <span className="text-lg text-gray-800">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {isReviewMode && currentQuestion.explanation && (
            <div className="mt-4 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <h4 className="font-bold text-yellow-900">Explanation</h4>
              <p className="text-yellow-800 mt-2">{currentQuestion.explanation}</p>
            </div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            {!isReviewMode && 
              <button onClick={handleMarkForReview} className="px-6 py-3 font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center justify-center gap-2">
                <BookmarkIcon className="h-5 w-5" /> Mark for Review & Next
              </button>
            }
            <div className={`flex gap-4 ${isReviewMode ? 'w-full justify-between' : 'ml-auto'}`}>
                <button onClick={goToPrevious} disabled={currentQuestionIndex === 0} className="px-6 py-3 font-semibold bg-gray-200 text-gray-800 rounded-md disabled:opacity-50">Previous</button>
                <button onClick={goToNext} disabled={currentQuestionIndex === topicQuestions.length - 1} className="px-6 py-3 font-semibold bg-blue-600 text-white rounded-md disabled:opacity-50">Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

}

