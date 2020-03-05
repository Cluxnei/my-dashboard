import React, {useState, useEffect} from 'react';
import {repositories} from "./api";
import Dashboard from './screens/Dashboard';
import * as S from './components/styled/App';

export default () => {
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(true);
    const [gitRepositories, setGitRepositories] = useState([]);
    const [owners, setOwners] = useState([]);
    const loadRepositories = async () => {
        const repos = await (await fetch(repositories)).json();
        const uniqueOwners = [];
        repos.forEach(({owner}) => {
            const {id, login, avatar_url, html_url} = owner;
            if (!uniqueOwners.find(({id}) => id === owner.id)) {
                uniqueOwners.push({id, login, avatar_url, html_url});
            }
        });
        setOwners(uniqueOwners);
        setGitRepositories(repos.sort(({id}, b) => b.id - id));
        setIsPerformingAnyAction(false);
        console.log(repos);
    };
    useEffect(() => {
        loadRepositories().then();
    }, []);

    return (isPerformingAnyAction ? <S.Loader size="large" /> : <Dashboard repositories={gitRepositories} owners={owners} />);
};