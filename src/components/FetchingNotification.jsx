const FetchingNotification = () => {
  return (
    <div className="absolute w-full">
      <div className="text-4xl mt-[200px] flex justify-centerz-10 text-white flex-col gap-[50px]">
        <h2 className="text-slate-700 font-bold p-4 bg-white rounded-lg w-fit mx-auto animate-pulse ">
          Fetching data...
        </h2>
        <p className="text-slate-500 animation-none text-[17px] max-w-[600px] mx-auto w-fit text-center italic">
          Patience is waiting. Not passively waiting. That is laziness. But to
          keep going when the going is hard and slow — that is patience.
        </p>
      </div>
    </div>
  );
};

export default FetchingNotification;
