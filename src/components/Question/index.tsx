import { ReactNode } from 'react';
// import cx from 'classnames';

import './styles.scss'


type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswered?: boolean;
    isHightLighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHightLighted = false,
}: QuestionProps) {
    return (
        <div 
            className={`question ${isAnswered ? 'answered' : ''} ${isHightLighted && !isAnswered ? 'highlighted' : ''}`}
         
            // className={cx(
            //     'question',
            //     { answered: isAnswered },
            //     { highlighted: isHightLighted && !isAnswered},
            // )}
        >
            
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );



}