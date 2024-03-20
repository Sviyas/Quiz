const getQuizQuestionsData = async () => {
  try {
    const data = await fetch('http://localhost:4000/questions');

    return await data.json();
  } catch (error) {
    console.log('failed to fetching the data :', error);
    throw new Error(error.message);
  }
};

export default getQuizQuestionsData;
