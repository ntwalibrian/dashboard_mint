import { useUser } from "../context/UserContext"


function Navbar() {
    const {user} = useUser()
  return (
    <div className="h-full w-full px-2 py-3 flex flex-row bg-sky-950 items-center">
        {/* here goes the rest of the navstuff */}
        {/* this thing grow and fills space only nibiguter ubwoba */}
      <div className="flex grow"></div>
      {/* this it that stuff of user name do it a component  */}
      <div className="text-white">{user.username}</div>
    </div>
  )
}

export default Navbar
