import React, {useState, useEffect} from 'react';
import {repositories} from "./api";
import Dashboard from './screens/Dashboard';
import * as S from './components/styled/App';

export default () => {
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(true);
    const [gitRepositories, setGitRepositories] = useState([]);
    const loadRepositories = async () => {
        const repos = await (await fetch(repositories)).json();
        console.log(repos);
        setGitRepositories(repos);
        setIsPerformingAnyAction(false);
    };
    useEffect(() => {
        loadRepositories().then();
    }, []);

    return (isPerformingAnyAction ? <S.Loader size="large" /> : <Dashboard repositories={gitRepositories} />);
};