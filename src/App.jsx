import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MailSlurp } from 'mailslurp-client'
import axios from 'axios'
import { AuthContext } from './authProvider/AuthProvider'
import Mail from './Components/Mail'
import { useLoaderData, useParams } from 'react-router-dom'

function App() {
  const [clicked, setClicked] = useState()
  const [emails, setEmails] = useState([]);
  const [userInboxId, setInboxId] = useState([])
  const { user } = useContext(AuthContext)
  const loader = useLoaderData();
  const { email } = useParams()
  const { emailAddress, inboxId } = loader;
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${email}`)
      .then(res => {
        setInboxId(res.data)
      })
  }, [email])

  useEffect(() => {
    axios.get(`http://localhost:5000/get-emails/${inboxId}`)
      .then(res => {
        console.log(res.data)
        setEmails(res.data)
      })
  }, [inboxId])

  const userEmail = user?.email
  const creatInbox = async () => {
    setClicked(true)
    axios.post('http://localhost:5000/create-inbox', { userEmail })
      .then(() => {
      })
  }
  return (
    <>
      <div>


      </div>
      <h1>{ }</h1>
      <div className="card">
        <p>
          {
            emailAddress ? (
              emailAddress
            ):(
              <p>Creat your inbox</p>
            )
          }
        </p>
        {
          inboxId ? (
            <button disabled onClick={() => creatInbox()}>
              Creat Inbox
            </button>
          ) : clicked ? (
            <button disabled onClick={() => creatInbox()}>
              Creat Inbox
            </button>

          ) : (
            <button onClick={() => creatInbox()}>
              Creat Inbox
            </button>
          )
        }

        {
          emails?.map((mails, index) => <Mail key={index} mails={mails}></Mail>)
        }

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
