import { useHistory, useParams } from 'react-router-dom'

import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'




type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();

    const { title, questions } = useRoom(roomId)
    
    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
       if( window.confirm('Tem certeza que voçê deseja excluir esta pergunta?')){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }
    }

    async function handleCheckQuestionAsAnswered(questionId : string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });

    }
    async function handleHighlightQuestion(questionId : string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHightLighted: true,
        });
        
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                    <RoomCode code={params.id}/>
                    <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question =>{
                        return(
                            <Question
                                key={question.id}
                                content= {question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHightLighted={question.isHightLighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                    <img src={checkImg} alt="Marcar pergunta como respondida"></img>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                    <img src={answerImg} alt="Dar destaque á pergunta"></img>
                                    </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remove pergunta"></img>
                                </button>
                            </Question>

                        );
                    })}
                </div>
            </main>
        </div>
    )
}