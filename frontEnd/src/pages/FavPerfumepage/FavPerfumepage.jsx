import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import PerfumeList from './PerfumeList';
import { Row, Col, Divider, Empty, Button } from 'antd';
import getPerfumesById from '../../utils/getPerfumesById';


function FavPerfumepage() {

    const logout = () => { localStorage.clear() };
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    const [perfumes, setPerfumes] = useState([]);
    const [perfumesGroups, setPerfumesGroups] = useState([]);
    const [numberToShow, setNumberToShow] = useState(20);
    const userid = localStorage.getItem("userId");
    const axios = require('axios');


    function showFavp(userid) {
        let listallperf = [];
        axios.get(`http://Comp9900fightbackend2-env-1.eba-hmyvi3ug.ap-southeast-2.elasticbeanstalk.com/getBookmark/${userid}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => {
            console.log("res", res);
            listallperf = res.data.data;
            console.log("list",listallperf);
            getP(listallperf);
        }
        )
            .catch(err => console.log(err))
    }

    async function getP(perfumesidlist) {
        console.log("check", perfumesidlist);
        const tempList = [];
        for (let i = 0; i < perfumesidlist.length; i++) {
            await getPerfumesById(perfumesidlist[i]).then((ff) => { tempList.push(ff) })

        }
        console.log("templistforloop", tempList);
        setPerfumes(tempList);
        console.log('perfume', perfumes);
        // return tempList;
        const result = [];
        for (let i = 0; i < Math.min(20, tempList.length); i += 4) {
            console.log("ssvsv", tempList);
            result.push(tempList.slice(i, i + 4));        
        }
        setPerfumesGroups(result);
        // console.log(result)
    }

    useEffect(() => {
        showFavp(userid);
        // console.log("gaoxiao",perfumesGroups);
    }, []);// via useeffect to get user's fav perfumesidlis


    function showMore() {
        let currentNumberToShow = numberToShow;  //number to show is 20
        // console.log(perfumes.length);
        setNumberToShow(currentNumberToShow + 20);
        let result = [];
        for (let i = 0; i < Math.min(currentNumberToShow + 20, perfumes.length); i += 4) {
            result.push(perfumes.slice(i, i + 4));
        }
        setPerfumesGroups(result);
    }

    const renderPerfumes = perfumesGroups.map((value, index) =>
    (
        <Row key={`${index} ${value}`} justify='center' gutter={[24, 24]}>
            <PerfumeList
                key={`${value}`}
                perfumeList={value}
            >
            </PerfumeList>

        </Row>
    )
    );

    return (
        <React.Fragment>
            <div className="col">
                <h1>My bookmarked perfumes</h1>
                <p>welcome to bookmarked perfume shelving :)</p>
                {/* {perfumesGroups[0].map(home => <div>{home.perfumeName}</div>)} */}
            </div>

            <Divider orientation="center"></Divider>
            {perfumes.length === 0 &&
                <Row justify='center'>
                    <Col span={12}>
                        <Empty></Empty>
                    </Col>
                </Row>
            }

            {renderPerfumes}

            {perfumes.length > numberToShow &&
                <Row justify='center'>
                    <Col>
                        <Button size='large' onClick={showMore}>More</Button>
                    </Col>
                </Row>
            }
        </React.Fragment>
    );
}

export default FavPerfumepage;
