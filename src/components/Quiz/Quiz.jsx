import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../../Assets/data";
export const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result ,setResult] = useState(false ) ; 


  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    // si el bloqueo es falso seleccionar la opccione que hay ... luego
    // haremos que el bloqueo sea verdadero
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    // si el bloque es verdadero significa que hemos seleccionado cualquier opccion
    if (lock === true) {
        if(index === data.length - 1 ){
            setResult(true) ; 
            return 0 ; 
        }
      // si el indice establñecido aumetaremos en 1
      setIndex(index + 1);
      setQuestion(data[index]);
      setLock(false) ; 
      option_array.map((Option)=>{
        Option.current.classList.remove("wrong")
        Option.current.classList.remove("correct")
        return 
      })
    }
  };

  const reset = () => {
    setIndex(0) ; 
    setQuestion(data[0])  ;
    setScore(0)  ; 
    setLock(false) ; 
    setResult(false) ; 

  }
  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {
            result ? <></>  : 
            <>
                 <h2>
          {index + 1} .{question.question}
        </h2>
        {/* lista desordenada */}
        <ul>
          <li
            ref={option1}
            onClick={(e) => {
              checkAns(e, 1);
            }}
          >
            {question.option1}
          </li>
          <li
            ref={option2}
            onClick={(e) => {
              checkAns(e, 2);
            }}
          >
            {question.option2}
          </li>
          <li
            ref={option3}
            onClick={(e) => {
              checkAns(e, 3);
            }}
          >
            {question.option3}
          </li>
          <li
            ref={option4}
            onClick={(e) => {
              checkAns(e, 4);
            }}
          >
            {question.option4}
          </li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">
          {index + 1}of {data.length} questions
        </div>
            </>

        }
        {
            result ? <><h2>You Scored {score} out of { data.length}</h2>
        <button  onClick={reset}>Reset </button></> : <></>
        }
        
   
      </div>
    </>
  );
};
