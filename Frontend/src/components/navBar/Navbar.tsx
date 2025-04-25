import { BellOutlined, HomeTwoTone, MessageOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import DropDown from './DropDown';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  function home() {
    navigate('/');
  }

  return (
    <div className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <Link to="/">
            <img src="logo.svg" alt="Logo" className="h-10" />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <input
            type="text"
            className="hidden md:block bg-gray-100 rounded-3xl h-12 w-32 sm:w-48 md:w-64 lg:w-80 px-5 border-3 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="🔍 Input Search Text"
          />
          <HomeTwoTone onClick={home} className="hover:bg-gray-200 p-3 rounded-full bg-gray-100 cursor-pointer" />
          <UsergroupAddOutlined className="hover:bg-gray-200 p-3 rounded-full bg-gray-100 cursor-pointer" />
          <BellOutlined className="hover:bg-gray-200 p-3 rounded-full bg-gray-100 cursor-pointer" />
          <MessageOutlined className="hover:bg-gray-200 p-3 rounded-full bg-gray-100 cursor-pointer" />
          <div className="md:block">
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  );
}