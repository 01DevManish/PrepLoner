// src/components/test-taking/QuestionPalette.tsx

interface PaletteProps {
  totalQuestions: number;
  answers: { [key: number]: string };
  markedForReview: number[];
  currentQuestionIndex: number;
  onJumpToQuestion: (index: number) => void;
}

export default function QuestionPalette({ totalQuestions, answers, markedForReview, currentQuestionIndex, onJumpToQuestion }: PaletteProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Question Palette</h3>
      <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const question = { id: i + 1, index: i };
          const isAnswered = answers[question.id] !== undefined;
          const isMarked = markedForReview.includes(question.id);
          const isCurrent = currentQuestionIndex === question.index;

          let bgColor = 'bg-slate-200 hover:bg-slate-300'; // Unanswered
          if (isAnswered) bgColor = 'bg-green-500 hover:bg-green-600 text-white'; // Answered
          if (isMarked) bgColor = 'bg-purple-500 hover:bg-purple-600 text-white'; // Marked
          if (isCurrent) bgColor = 'bg-indigo-600 text-white ring-2 ring-offset-2 ring-indigo-500'; // Current

          return (
            <button
              key={question.index}
              onClick={() => onJumpToQuestion(question.index)}
              className={`w-10 h-10 flex items-center justify-center rounded-md font-bold text-sm transition-all ${bgColor}`}
            >
              {question.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}