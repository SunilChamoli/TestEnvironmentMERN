import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import banner from "../assets/banner.png";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = () => {
    setLoading(true);
    navigate("/loading"); // Navigate to the loading page

    // After 2 seconds, navigate to the test environment page
    setTimeout(() => {
      navigate("/test-environment"); // Navigate to the camera component
    }, 2000);
  };

  const handleKnowMore = () => {
    window.open("https://github.com/AbhishekRana78", "_blank");
  };

  return (
    <section className="lg:w-9/12 md:w-[90%] w-[95%] mx-auto mt-12 flex flex-col md:flex-row-reverse justify-between items-center" id="rulesContainer">
      {loading && <Loading />}

      <div className="md:w-1/2 w-full">
        <img src={banner} alt="banner" style={{ width: '400px', height: '400px' }} />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="my-8 lg:text-4xl text-3xl md:w-4/6 font-medium text-[#333] lg:leading-normal leading-normal mb-3">
          Learn new concepts with each question
        </h1>
        <p className="border-l-4 pl-2 py-2 mb-6 text-gray-500">
          Everyone loves a quiz.
        </p>
        <div className="flex items-center">
          <button
            onClick={handleStartQuiz}
            className={`bg-[#8ab5f6] px-6 py-2 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            id="startQuiz"
            type="button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Start Quiz"}
          </button>

          <button
          onClick={handleKnowMore}
            className=" px-6 py-2 text-[#FCC822] hover:bg-[#FCC822] hover:text-white rounded inline-flex ml-3 transition-all duration-300"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            Know more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
