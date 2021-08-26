import React from 'react';

const AddFavourite = (props) => {
	const {userid, perfumeid, heartColor} = props;

	const axios = require('axios');
	function add(){
		const axios = require('axios');
    axios.post(`http://Comp9900fightbackend2-env-1.eba-hmyvi3ug.ap-southeast-2.elasticbeanstalk.com/addBookmark?accountId=${userid}&perfumeId=${perfumeid}`, {},
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }).then(
				(ADDRES)=>{
					alert("You have bookmarked this perfume :)");
					window.location.reload();
				}
				)
      .catch(err => console.log(err))

	}

  function delclick() {
    const axios = require('axios');
    axios.delete(`http://Comp9900fightbackend2-env-1.eba-hmyvi3ug.ap-southeast-2.elasticbeanstalk.com/deleteBookmark?accountId=${userid}&perfumeId=${perfumeid}`, {},
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }).then(
        (delres)=>{
          // console.log(delres);
					alert("You have removed this perfume from bookmark:)");
					window.location.reload();
        },
				
        )
      .catch(err => console.log(err))

  }


	return (
		<>
		<div onClick={()=>{heartColor==="red" ? delclick() : add()}}>
			{heartColor==='red'&& <span className='mr-1 text-white bg-dark'>Remove From Bookmark</span>}
			{heartColor==='grey'&& <span className='ml-4 mr-2 text-white bg-dark'>  Add To Bookmark</span>}
			<svg
				width='1.5em'
				height='1.5em'
				viewBox='0 0 16 16'
				className='bi bi-heart-fill'
				fill={heartColor}
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</svg>
		</div>
		</>
	);
};

export default AddFavourite;


