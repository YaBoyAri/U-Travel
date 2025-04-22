import Login from "../components/Login";

const HomePage = () => {
    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
          <div className="w-full">
            <Login />
          </div>
        </main>
      );
};

export default HomePage;