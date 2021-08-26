import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import Header from '../../components/Header';
import getNotes from '../../utils/getNotes';
import getAllAccounts from '../../utils/getAllAccounts';
import PerfumeList from './components/PerfumeList';
import PerfumeSearchBar from './components/PerfumeSearchBar';
import { Row, Col, Divider, Empty, Button } from 'antd';
import styled from 'styled-components';
import getPerfumesByName from '../../utils/getPerfumesByName';
import NotesSearchBar from './components/NotesSearchBar';
import getPerfumesByNotes from '../../utils/getPerfumesByNotes';

function HomePage() {

    const logout = () => { localStorage.clear() };
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    const [notes, setNotes] = useState({});
    const [perfumes, setPerfumes] = useState([]);
    const [perfumesGroups, setPerfumesGroups] = useState([]);
    const [numberToShow, setNumberToShow] = useState(20);

    function onSearchByName(name) {
        setNumberToShow(20);
        let result = [];
        getPerfumesByName(name)
            .then(res => {
                setPerfumes(res);
                for (let i = 0; i < Math.min(20, res.length); i += 4) {
                    result.push(res.slice(i, i + 4));
                }
                setPerfumesGroups(result);
            })
    }

    function onSearchByNotes(includingValue, excludingValue) {
        setNumberToShow(20);
        let submitObject = {
            "includingNoteName": [],
            "excludingNoteName": []
        };
        for (let i = 0; i < includingValue.length; i++) {
            submitObject.includingNoteName.push(includingValue[i].label);
        }
        for (let i = 0; i < excludingValue.length; i++) {
            submitObject.excludingNoteName.push(excludingValue[i].label);
        }
        console.log(includingValue);
        console.log(excludingValue);
        console.log(submitObject);
        let result = [];
        getPerfumesByNotes(submitObject)
            .then(res => {
                setPerfumes(res);
                for (let i = 0; i < Math.min(20, res.length); i += 4) {
                    result.push(res.slice(i, i + 4));
                }
                setPerfumesGroups(result);
            })
    }

    function showMore() {
        let currentNumberToShow = numberToShow;
        console.log(perfumes.length);
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
            <Row justify='center'>
                {/* <h1>{localStorage.username}</h1> */}
                <Col span={16}>
                    <PerfumeSearchBar onSearch={onSearchByName} />
                </Col>
            </Row>
            <Divider orientation="center">Or search by including and excluding notes</Divider>
            <Row justify='center' gutter={12}>
                <NotesSearchBar onSearch={onSearchByNotes} />
            </Row>
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

export default HomePage;
