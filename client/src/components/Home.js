function Home() {
  return (
    <>
      <h1 className="absolute sm:top-1/2 left-1/2 text-7xl text-white dark:text-white">
        WELCOME TO SCHOOL DATABASE
      </h1>
      <div>
        <img
          className="bg-indigo-500"
          src={require('../assets/school-photo.jpg')}
          alt="School"
        ></img>
      </div>
    </>
  );
}

export default Home;
