import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from './styles'


export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Project history</h1>
      <pre>
      </pre>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>{formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluded</Status>
                    )}

                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}

                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">In progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
