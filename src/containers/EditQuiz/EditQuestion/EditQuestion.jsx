import React from 'react'
import classes from './EditQuestion.module.scss'
import acceptImage from '../../../assets/images/accept-icon.png'
import { ReactComponent as DeleteIcon} from '../../../assets/images/svg/delete.svg'

const initialState = {
    index: '1',
    content: 'Salam',
    options: [
        {content: 'aaaaa', iscorrect: false}
    ]
}

const loadQuestionsAction = (state, action) => {
    return action.question
}

const editContentAction = (state, action) => {
    return {...state, content: action.content}
}

const indexPattern = /^\d{0,3}$/
const editIndexAction = (state, action) => {
    if (indexPattern.test(action.index))
        return {...state, index: action.index}
    return state
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOAD_QUESTION': return loadQuestionsAction(state, action);
        case 'EDIT_CONTENT': return editContentAction(state, action);
        case 'EDIT_INDEX': return editIndexAction(state, action)
    }
}

function EditQuestion(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        dispatch({
            type: 'LOAD_QUESTION',
            question: props.question
        })
    }, props.question)

    const contentChangeHandler = React.useCallback((e) => {
        dispatch({
            type: 'EDIT_CONTENT',
            content: e.target.value
        })
    }, [])

    const indexChangeHandler = React.useCallback((e) => {
        dispatch({
            type: 'EDIT_INDEX',
            index: e.target.value
        })
    }, [])


  return (
    <div className={classes.EditQuestion}>
        <div className={classes.Index}>
            <div className={classes.IndexValue}><input className={classes.IndexInput} type="text" value={state.index} onChange={indexChangeHandler}/></div>
        </div>
        <img className={classes.Accept} src={acceptImage} alt="accept"/>
        <DeleteIcon className={classes.Delete} />
        <div className={classes.Content}><textarea className={classes.ContentInput} value={state.content} onChange={contentChangeHandler}></textarea></div>
        <div className={classes.Options}>
            {state.options.map((option) => {
                return (
                    <div 
                        key={option}
                        // key={option.id} 
                        className={classes.Option}
                        // onClick={() => (selectOption(option.id))}
                    >
                        {/* {option.content} */}

                        <div className={classes.OptionText}><input className={classes.OptionTextInput} type="text" value={option.content}/></div>
                        <div className={classes.OptionCheckDiv}><input className={classes.OptionCheck} type="checkbox" checked={option.iscorrect}/></div>
                        <DeleteIcon className={classes.DeleteOption} />
                </div>
            );
            })}
            <div className={classes.AddOption}>Add Option</div>
        </div>
    </div>
  )
}

export default EditQuestion