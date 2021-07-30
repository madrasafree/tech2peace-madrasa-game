import React, { useState } from "react";
import '../../style.css'
import { Question } from "../Question";
import storyData from '../../rawData.json'
import { Player } from "../../hooks/use-audio";
// story = paragrapsh + questions



const storyDataOld = [
    {"type": "paragraph", "url": "text1", "text": "שלום! אני הפיסקה הראשונה בסיפור"},
    {"type": "paragraph", "url": "text1", "text": "נעים מאוד, אני משה ואני אוהב לאכול פיצה"},
    {"type": "paragraph", "text": "אני לא אוהב לאכול סושי אבל מאוד רוצה שאנשים ילמדו ערבית :) זה יעזור לנו להכיר אחד את השני!"},
    {
        "type:": "question",
        "question": "מהו שמי ומה אני אוהב לאכול?",
        "answerTemplate": "שלום שמי %s ואני אוהב לאכול %s מאוד.",
        "wordOptions": ["משה", "אברהם", "יעקב", "פיצה", "סושי"],
        "correctAnswer":["משה", "פיצה"]
    },
    {"type": "paragraph", "text": "ממשיכים בסיפור. מעת לעת אני מטייל ואוהב לשחות"},
    {"type": "paragraph", "text": "המשכנו!"},
    {"type": "paragraph", "text": "נעים מאוד, אני משה ואני אוהב לאכול פיצה"},
    {"type": "paragraph", "text": "אני לא אוהב לאכול סושי אבל מאוד רוצה שאנשים ילמדו ערבית :) זה יעזור לנו להכיר אחד את השני!"},
    {
        "type:": "question",
        "question": "מהו שמי ומה אני אוהב לאכול?",
        "answerTemplate": "",
        "wordOptions": ["אני", "אוהב", "לאכול", "פיצה"],
        "correctAnswer": ["אני", "אוהב", "לאכול", "פיצה"]
    },
    {"type": "paragraph", "text": "ממשיכים בסיפור. מעת לעת אני מטייל ואוהב לשחות"},
];

export const Story = () => {
    // const scrollBottom = () => {window.scrollTo(0,document.body.scrollHeight)});
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const onNextStory = () => { setCurrentStoryIndex(currentStoryIndex + 1); /* scrollBottom(); */ };


    console.log(storyData)
    return (
        <div className="paragraph-container">
            {
                storyData.map(({ type, ...rest }, index) => {

                    
                    return (
                        index <= currentStoryIndex && (
                            type === 'paragraph' ? (
                                <Paragraph url={rest.url} text={rest.text} index={index} currentStoryIndex={currentStoryIndex} onNextStory={onNextStory} />
                    ) : (
                        <Question
                            dummydymmt={console.log({rest})}
                            question={rest.question}
                            answerTemplate={rest.answerTemplate}
                            wordOptions={rest.wordOptions.split(',')}
                            correctAnswer={rest.correctAnswer.split(',')}
                            done={index === currentStoryIndex && onNextStory}
                            url={rest.url}
                        />
                    )
                ))}
                
                )
            }
        </div>

    );
}

function Paragraph({ text, url, index, currentStoryIndex, onNextStory }) {
    return (
        <div className="paragraph-card">
            <Player url={url} />
            <div className="paragraph-text">{text}</div>
            {index === currentStoryIndex && index !== (storyData.length - 1) && (
            <div onClick={onNextStory} className="next-button" />)}
        </div>

    );
}

