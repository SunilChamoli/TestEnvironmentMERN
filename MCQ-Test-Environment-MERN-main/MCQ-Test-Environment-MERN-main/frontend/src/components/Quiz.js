import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuizHeader from "./QuizHeader";

const Loading = () => (
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
    <p className="text-xl text-gray-500">Loading...</p>
  </div>
);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60 * 10); 
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [status, setStatus] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable to track submission
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz data:", error));

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : prevTimer);
    }, 1000);

    setTimerIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
      if (timer <= 0) {
        setShowResult(true);
      }
    };
  }, [timer]);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setTimeout(() => {
            videoRef.current.play().catch(error => console.error("Error playing video:", error));
          }, 100);
        }
      } catch (error) {
        console.error("Error accessing user media:", error);
      }
    };

    getUserMedia();
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      // If the quiz has already been submitted, do nothing
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);

    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setStatus(newStatus);

      setShowResult(true);
      setIsSubmitted(true); // Mark as submitted
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = questions.map((question) => question.answer);
    let score = 0;
    for (const questionId in userAnswers) {
      if (userAnswers[questionId] === correctAnswers[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60 * 10); 
    setCurrentQuestionIndex(0); 
    setIsSubmitted(false); // Reset submission status
    navigate("/quiz");
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handleQuestionButtonClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const isAnswered = (index) => answers.hasOwnProperty(questions[index].id);

  // Calculate elapsed time based on the initial timer value
  const elapsedTime = 60 * 10 - timer; // Total time minus remaining time

  return (
    <section className="relative">
      <QuizHeader timer={timer} />
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto mt-10">
        <div className="md:w-[70%] w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Online Test</h2>
          <div className="border border-gray-200 p-4 rounded-lg mb-4">
            {questions.length > 0 && (
              <div>
                <div className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded">
                  <h3 className="text-xl font-medium mb-2">
                    Question {currentQuestionIndex + 1}
                  </h3>
                  <p className="text-gray-700 mb-4">{questions[currentQuestionIndex].question}</p>
                  <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div
                        className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                          answers[questions[currentQuestionIndex].id] === option ? "bg-gray-300" : ""
                        }`}
                        key={option}
                        onClick={() => handleAnswerSelect(questions[currentQuestionIndex].id, option)}
                      >
                        <input
                          type="radio"
                          name={`question-${questions[currentQuestionIndex].id}`}
                          value={option}
                          checked={answers[questions[currentQuestionIndex].id] === option}
                          onChange={() => handleAnswerSelect(questions[currentQuestionIndex].id, option)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`question-${questions[currentQuestionIndex].id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <span className="mr-2">{String.fromCharCode(65 + index)}</span>
                          <span>{option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={handlePrevQuestion}
                      className="bg-[#FCC822] px-6 py-2 text-white rounded"
                    >
                      Previous
                    </button>
                  )}
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-[#FCC822] px-6 py-2 text-white rounded"
                    >
                      Next
                    </button>
                  ) : (
                    currentQuestionIndex === questions.length - 1 && (
                      <button onClick={handleSubmit} className="bg-[#6dc8f6] px-6 py-2 text-white rounded mt-4">
                        Submit Test
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-[30%] w-full p-4 md:ml-4">
          <div className="border border-gray-200 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-medium mb-2">All The Best</h3>
            <div className="flex justify-between items-center text-sm">
              <span></span>
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-medium mb-2">Questions</h3>
            <div className="grid grid-cols-6 gap-2">
              {questions.slice(0, 20).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleQuestionButtonClick(i)}
                  className={`text-white font-bold py-2 px-4 rounded-full ${
                    isAnswered(i) ? "bg-green-500" : "bg-blue-500"
                  } ${currentQuestionIndex === i ? "bg-[#FFC107]" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Your Score:</h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
                <h3 className={`text-xl ${status === "Passed" ? "text-green-800" : "text-red-500"}`}>
                  {status}
                </h3>
                <h1 className="text-3xl font-bold my-2">
                  {score * 10}
                  <span className="text-slate-800">/60</span>
                </h1>
                <p className="text-sm flex justify-center items-center gap-2">
                  Total Time:{" "}
                  <span className="text-xl text-orange-500">
                    {formatTime(elapsedTime)}
                    <span className="text-xs">min</span>
                  </span>
                </p>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-[#4ebad2] text-white w-full py-2 rounded mt-16"
              >
                Restart
              </button>
            </div>
          )}

          {loading && <Loading />}
        </div>
      </div>

      <div className="fixed top-4 right-4 z-[2]">
        <video
          ref={videoRef}
          className="w-[160px] h-[120px] border border-gray-300 rounded"
          autoPlay
          muted
        ></video>
      </div>
    </section>
  );
};

export default Quiz;
