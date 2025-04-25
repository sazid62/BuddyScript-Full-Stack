
import { useState } from 'react'
import { Post } from '../../interfaces/user_interface'
import PerNewsFeed from './PerNewsFeed'

export default function PernewsAndRecentComment(props:Post, key:number) {
const [show,setShow] = useState<boolean>(false)
function handleShowCmnt()
{
    setShow(!show)
}
  return (
    <div>
        <PerNewsFeed  show={show} handleShowCmnt={handleShowCmnt} {...props} key={key} />
    </div>
  )
}
