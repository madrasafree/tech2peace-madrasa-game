import React, { useState } from "react";
import * as utils from "../utils";
import '../style.css'

const ANSWER_TEMPLATE = "<div class='answer-template'>%s</div>";
const ANSWER_EMPTY = "<div class='answer-empty'>_____</div>";
const ANSWER_WORD = "<div class='answer-word'>%s</div>";
const OPTION_WORD = "<div class='option-word'>%s</div>";
const isTemplate = (word) => word === '%s';

let answer_template = "hello my %s is %s.";
let answers = [];
let initialOptions = ["hello", "my", "name", "is", "bob"];

let max_answers = (answer_template.match(/%s/g) || []).length;

export const Game = () => {
    const [answers, setAnswers] = useState([]);
    const [options, setOptions] = useState(initialOptions);

    const fullAnswers = [];
    const templates = utils.split_template(answer_template);
    let answer_index = 0;
    for (const template of templates) {
        if (template === "%s") {
            var answer = answers[answer_index++];
            if (answer === undefined) {
                fullAnswers.push({ text: '_____', className: 'answer-empty' });
            } else {
                fullAnswers.push({ text: answer, className: 'answer-word' });
            }
        } else {
            fullAnswers.push({ text: template, className: 'answer-template' });
        }
    }

    const onAnswerClick = function(word, index) {
        let realIndex = index;
        console.log({fullAnswers})
        fullAnswers.forEach(({ className }, fullAnswerIndex) => {
            if(fullAnswerIndex <= index && className !== "answer-word") {
                realIndex--;
            }
        });

        console.table({ realIndex, word })
        const newAnswers = [...answers];
        newAnswers.splice(realIndex, 1)
        setAnswers(newAnswers);
        setOptions([...options, word]);
    }

    const onOptionClick = function(option, index) {
        if(answers.length === max_answers) {
            return null;
        }

        const newOptions = [...options];
        newOptions.splice(index, 1)
        setOptions(newOptions);
        setAnswers([...answers, option]);
    }

    return (
        <>
            <div className='answer-container'>
                {
                        fullAnswers.map(({ text, className }, index) => (
                            <div onClick={() => onAnswerClick(text, index)} className={className}>
                                {text}
                            </div>
                        ))
                }


            </div>
            <div className='option-container'>
                {
                    options.map((option, index) => (
                        <div onClick={() => onOptionClick(option, index)} className='option-word'>{option}</div>
                    ))
                }
            </div>
        </>
    );
}
