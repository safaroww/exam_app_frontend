import React from "react";
import classes from "./StartQuiz.module.scss";
import ContentContainer from "../../HOC/ContentContainer/ContentContainer";
import Question from "../../components/Question/Question";
import useQuizService from "../../hooks/useQuizService";
import { loadingContext } from "../../App";

function StartQuiz() {
  const { questions, loadQuestions, sendResult } = useQuizService();
  const [answers, setAnswers] = React.useState([]);
  const nameRef = React.useRef()
  const {startLoading, stopLoading} = React.useContext(loadingContext)

    React.useEffect(() => {
      startLoading();
          (async () => {
            await loadQuestions()
            stopLoading()
          })()
      }, [])

  const submitHandler = React.useCallback(async (event) => {
    event.preventDefault()
    const name = nameRef.current.value
    const data = {
      student_name: name,
      answers: answers
    }
    await sendResult(data)
    nameRef.current.value = ''
    setAnswers([])
  }, [answers])

  const addAnswer = React.useCallback((question, optionId) => {
    setAnswers(prevState => {
      const answer = prevState.find(a => a.question == question)
      if (answer) return prevState
      const asnwerData = {question: question, selected_options: [optionId]}
      return [...prevState, asnwerData]
    })

  }, [])

  return (
    <ContentContainer color="rgba(255, 192, 203, 0.777)">
      <div className={classes.StartQuiz}>
        <form className={classes.Form} onSubmit={submitHandler}>
          <input ref={nameRef} type="text" className={classes.Input} />
          <button type="submit" className={classes.Button}>Submit</button>
        </form>
        {questions.map((question) => {
          const selectedOption = answers.find(answer => answer.question === question.id)?.selected_options[0]
          return (
            <Question
              key={question.id}
              id={question.id}
              addAnswer={addAnswer}
              selectedOption={selectedOption}
              index={question.index}
              content={question.content}
              options={question.options}
            />
          );
        })}
      </div>
    </ContentContainer>
  );
}

export default StartQuiz;
