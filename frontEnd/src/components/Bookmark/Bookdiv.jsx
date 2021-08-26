import React, { useState, useEffect } from 'react';
import AddFavourite from './AddFavourite'
import getPerfumesById from '../../utils/getPerfumesById';


function Bookdiv(props) {
  const { perfumeid } = props;
  const axios = require('axios');
  const [perfumes, setPerfumes] = useState([]);

  const [perfumesidlist, setPerfumesidlist] = useState([]);
  const [perfumesGroups, setPerfumesGroups] = useState([]);
  const [numberToShow, setNumberToShow] = useState(20);
  const [heartColor, setheartColor] = React.useState('grey');
  const userid = localStorage.getItem("userId");

  function showFavp() {
    let listallperf = [];
    axios.get(`http://Comp9900fightbackend2-env-1.eba-hmyvi3ug.ap-southeast-2.elasticbeanstalk.com/getBookmark/${userid}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }).then(res => {
      listallperf = res.data.data;
      setPerfumesidlist(listallperf);
    }
    )
      .catch(err => console.log(err))
  }

  function setPlist(listallperf) {
    setPerfumesidlist(listallperf)
  }

  useEffect(() => {
    showFavp();
  }, []);// via useeffect to get user's fav perfumesidlis

  useEffect(() => {
    if (perfumesidlist.includes(parseInt(perfumeid))) {
      setheartColor('red')
    }
  }, [perfumesidlist]);


  function RedOrN(listallperf) {
    if (listallperf.includes(parseInt(perfumeid))) {
      console.log("dacsd");
      setheartColor('red')
    }
  }


  return (
    <>
      <div className='row'>
        <AddFavourite
          userid={userid}
          perfumeid={perfumeid}
          heartColor={heartColor}
        />
      </div>
    </>
  )
}
export default Bookdiv;