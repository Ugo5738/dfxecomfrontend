const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-[#3E3FCD] border-t-0"></div>
    </div>
  );
};

export default LoadingSpinner;
