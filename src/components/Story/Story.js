import React, { useState } from "react";
import '../../style.css'

const storyAndGameJson = [
    {"type": "story", "text": "Hello! I am the 1st paragrapsh of the story!"},
    {"type": "story", "text": "Now we already know each other :) By the way, my name is Elad"},
    {"type": "story", "text": "In my free time, I like helping people study Arabic."},
    {
        "type:": "question",
        "question": "???",
        "template": "shu ismack %s ya ...",
        "options": ["asdd", "asdasd", "bbb", "asdasd"],
        "answer": ["asdd", "bbb"]
    }
];

export const Story = () => {

    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const stories = storyAndGameJson.filter(({ type }) => type === 'story');
    const onNextStory = () => setCurrentStoryIndex(currentStoryIndex + 1);

    return (
        <div className="story-container">
            {
                stories.map(({ text }, index) => (
                    index <= currentStoryIndex && (
                    <div className="story-card">
                        <div className="story-text">{text}</div>
                        {index === currentStoryIndex && index !== (stories.length - 1) && (
                        <button onClick={onNextStory} className="story-next-button">next</button>)}
                    </div>
                    )
                ))
            }
        </div>

    );
}
