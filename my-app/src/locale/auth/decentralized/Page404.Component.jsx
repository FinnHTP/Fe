import React from 'react';


const NotFoundPage = () => {


  // const goToHome = () => {
  //   history.push('/'); 
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <p className="text-sm text-gray-400 mb-8">Sorry, the page you are looking for does not exist.</p>
      {/* <button
        onClick={goToHome}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Back to Home
      </button> */}
    </div>
  );
};

export default NotFoundPage;
