import React, { useEffect, useState, useRef } from "react";
import FlashcardList from "./FlashcardList";
import './app.css'
//import axios from 'axios'
import { biologyQuestions } from "./biology";
import { chemistryQuestions } from "./chemistry";
import { physicsQuestions } from "./physics";

const questionCategories = [{ id: 1, name: "Biology"}, {id:2, name: "Chemistry"}, {id:3, name: "Physics"}]
const questionsByCategory = {
  "Biology": biologyQuestions,
  "Chemistry": chemistryQuestions,
  "Physics" : physicsQuestions
}

function App() {
  const [flashcards, setFlashcards]=useState([])
  const [categories, setCategories] =useState([])

  const categoryEl= useRef()
  const amountEl = useRef()

  useEffect(()=>{
    setCategories(questionCategories);
    // axios
    //   .get('https://opentdb.com/api_category.php')
    //   .then(res =>{
    //     setCategories(res.data.trivia_categories)
    //   })
  }, [])

  useEffect(() => {
     
  },[])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    let selectedQuestions = questionsByCategory[categoryEl.current.value];
    setFlashcards(selectedQuestions.map((questionItem, index) => {
      const answer = questionItem.correct_answer
      const options = [...questionItem.incorrect_answers, answer]
      return {
        id:`${index}-${Date.now()}`,
        question: questionItem.question,
        answer: decodeString(answer),
        options: options.sort(() => Math.random()- .5)
      }
    }))
    // axios
    //   .get('https://opentdb.com/api.php', {
    //     params: {
    //       amount: amountEl.current.value,
    //       category: categoryEl.current.value
    //     }
    //   })
    //   .then(res => {
    //     setFlashcards(res.data.results.map((questionItem, index)=> {
    //       const answer = decodeString(questionItem.correct_answer)
    //       const options = [
    //         ...questionItem.incorrect_answers.map(a => decodeString(a)), 
    //         answer
    //       ]
    //       return{
    //         id:`${index}-${Date.now()}`,
    //         question: decodeString(questionItem.question),
    //         answer: answer,
    //         options: options.sort(() => Math.random()- .5)
    //       }
    //     }))
    //   })
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.name} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of questions <sub>hello there</sub></label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
