import React from 'react'
import ContentContainer from '../../HOC/ContentContainer/ContentContainer'
import classes from './Results.module.scss'
import useQuizService from '../../hooks/useQuizService'
import { ReactComponent as DeleteIcon} from '../../assets/images/svg/delete.svg'

function Results() {
    const { results, loadResults, deleteResult } = useQuizService()


    React.useEffect(() => {
        loadResults();
    }, [])



  return (
    <ContentContainer color="rgba(0, 255, 255, 0.342)">
        <table className={classes.Table}>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Student</th>
                    <th>Total</th>
                    <th>Correct</th>
                    <th>Wrong</th>
                    <th>Empty</th>
                    <th>Date</th>
                    <th>Silmek</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                    <tr key={result.id}>
                        <td>{index + 1}</td>
                        <td>{result.student_name}</td>
                        <td>{result.total_question}</td>
                        <td>{result.right_answers}</td>
                        <td>{result.wrong_answers}</td>
                        <td>{result.total_question - (result.wrong_answers + result.right_answers)}</td>
                        <td>{result.created}</td>
                        <td>
                            <DeleteIcon onClick={() => deleteResult(result.id)} className={classes.DeleteButton}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </ContentContainer>
  )
}

export default Results