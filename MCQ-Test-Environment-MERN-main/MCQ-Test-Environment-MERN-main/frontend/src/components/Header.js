// import React from 'react'
// import { IoIosArrowDropdown } from "react-icons/io";
// import {useSelector} from "react-redux" 
// import { API_END_POINT } from '../utils/constant';
// import axios from "axios";


// const Header = () => { 
//     // const user = useSelector((store)=>store.app.user);
//     // const toggle = useSelector(store=>store.movie.toggle);
//     // const dispatch = useDispatch();
//     // const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {

//             const res= await axios.get(`${ API_END_POINT}/logout`)
            
//         } catch (error) {
//             console.log(error)
            
//         }

        
//     //   
//     }

//     // const toggleHandler = () => {
//     //     dispatch(setToggle());
//     // }
// const user= useSelector((store)=>store.app.user)

//    console.log(user)
//     return (
//         <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
//             <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
//           { user && (
//                     <div className='flex items-center'>
//                         <IoIosArrowDropdown size="24px" color='white' />
//                         <h1 className='text-lg font-medium text-white'></h1>
//                         <div className='ml-4'>
//                             <button onClick={handleLogout} className='bg-red-800 text-white px-4 py-2'>Logout</button>
//                             <button className='bg-red-800 text-white px-4 py-2 ml-2'>"Search Movie"</button>
//                         </div>
//                     </div>

//           )}
            
//         </div>
//     )
// }

// export default Header