
import { useParams } from 'react-router-dom'

function DashBoard() {
  const { id } = useParams()
  return (
    <div>
      <div>jnscjnedjcnejcnejcncjnrc {id}</div>
    </div>
  )
}

export default DashBoard
