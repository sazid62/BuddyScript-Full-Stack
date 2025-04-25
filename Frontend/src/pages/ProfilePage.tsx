import { useSelector } from 'react-redux';
import ProfileTop from '../components/ProfileTop'
import { Post, stateStruct } from '../interfaces/user_interface';
import PernewsAndRecentComment from '../components/middleComponents/PernewsAndRecentComment';
import PostFromHere from '../components/PostFromHere';

export default function ProfilePage() {
  const post = useSelector((state: stateStruct) => state.AllUserPost).filter((elem)=>elem.post_id !== '');
  post.reverse();
  const current_user = useSelector((state:stateStruct)=>state.currentuser)
  
    

    if(current_user.id === '')
    {
      return <>not user found</>
    }
  return (
    <div className="container">
      <div className='m-auto'>
      <ProfileTop/>
      <PostFromHere/>
      {post.map((elem:Post, index) => (
            (elem.user_id === current_user.id) && <PernewsAndRecentComment key={index} {...elem} />
          ))}
    </div>
    </div>
  )
}
