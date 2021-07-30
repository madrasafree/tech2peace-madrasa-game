import React, { useState } from "react";
import * as utils from "../utils";
import '../style.css'

export const Question = ({question, answerTemplate, wordOptions, correctAnswer}) => {
    const [answers, setAnswers] = useState([]);
    const [options, setOptions] = useState(wordOptions);
    const [isAnswered, setIsAnswered] = useState(false);
    
    const is_orderable = (answerTemplate === "");
    const max_answers = (answerTemplate.match(/%s/g) || []).length;



    function makeFullAnswers() {
        let fullAnswers = [];
        if (is_orderable) {
            answers.forEach((answer) => {fullAnswers.push({ text: answer, className: 'answer-word' })})
            return fullAnswers;
        }
        const templates = utils.split_template(answerTemplate);
        let answer_index = 0;
        for (const template of templates) {
            if (template === "%s") {
                let answer = answers[answer_index++];
                if (answer === undefined) {
                    fullAnswers.push({ text: '_____', className: 'answer-empty' });
                } else {
                    fullAnswers.push({ text: answer, className: 'answer-word' });
                }
            } else {
                fullAnswers.push({ text: template, className: 'answer-template' });
            }
        }
        return fullAnswers
    }
    const fullAnswers = makeFullAnswers();
    

    const onAnswerClick = function(word, index) {
        if (isAnswered) {
            return
        }

        let realIndex = index;
        fullAnswers.forEach(({ className }, fullAnswerIndex) => {
            if(fullAnswerIndex <= index && className === "answer-template") {
                realIndex--;
            }
        });

        const newAnswers = [...answers];
        if (!is_orderable) {
            newAnswers.splice(realIndex, 1, undefined)
        }
        else {
            newAnswers.splice(realIndex, 1)
        }
        setAnswers(newAnswers);
        setOptions([...options, word]);
    }

    const onOptionClick = function(option, index) {
        if(!is_orderable && answers.filter((a) => a !== undefined).length === max_answers) {
            return null;
        }
        const newOptions = [...options];
        newOptions.splice(index, 1)
        const newAnswers = [...answers]
        const undefined_index = newAnswers.indexOf(undefined)
        if (undefined_index !== -1) {
            newAnswers[undefined_index] = option;
        }
        else {
            newAnswers.push(option)
        }

        setOptions(newOptions);
        setAnswers(newAnswers);

        console.log(newAnswers)
        console.log(correctAnswer)
        if (utils.arraysEqual(newAnswers, correctAnswer)) {
            setIsAnswered(true);
        }
    }

    return (
        <>
            <div className='question-container'>{question}</div>
            <div className='answer-container'>
                {
                        fullAnswers.map(({ text, className }, index) => (
                            <div onClick={className === "answer-word" ? () => onAnswerClick(text, index) : () => {} } className={className}>
                                {text}
                            </div>
                        ))
                }


            </div>
            <div className='option-container'>
                {
                    !isAnswered ? options.map((option, index) => (
                        <div onClick={() => onOptionClick(option, index)} className='option-word'>{option}</div>
                    )) : <div className='answer-correct-text'></div>
                }
            </div>
        </>
    );
}
