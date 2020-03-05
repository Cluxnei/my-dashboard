import React, {useState, useEffect} from 'react';
import {repositories, commits} from "./api";
import {users} from "./api";
import Dashboard from './screens/Dashboard';
import * as S from './components/styled/App';
import {getData, storeData} from "./storage";
import {Alert} from 'react-native';

export default () => {
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(true);
    const [gitRepositories, setGitRepositories] = useState([]);
    const [owners, setOwners] = useState([]);
    const loadRepositories = async (previusRepositories) => {
        let repos = [];
        let reposWithCommits = [];
        if (previusRepositories) {
            console.log('nao fez fetch');
            reposWithCommits = previusRepositories;
        } else {
            console.log('fez fetch na api');
            for (const user of users) {
                try {
                    repos = [
                        ...repos,
                        ...(await (await fetch(repositories.replace('USER', user))).json())
                    ];
                } catch (e) {
                    return Alert.alert('Limite de requisições na api excedido :(');
                }
            }
            await (async () => {
                for (const repo of repos) {
                    const {full_name, languages_url} = repo;
                    const lastFourCommits = (await (await fetch(commits.replace('USER/REPOSITORY', full_name))).json()).slice(0, 4);
                    const repositoryLanguages = await (await fetch(languages_url)).json();
                    reposWithCommits.push({
                        ...repo,
                        lastFourCommits,
                        repositoryLanguages
                    });
                }
            })();
            await storeData('dr', JSON.stringify(reposWithCommits));
        }
        const uniqueOwners = [];
        reposWithCommits.forEach(({owner}) => {
            const {id, login, avatar_url, html_url} = owner;
            if (!uniqueOwners.find(({id}) => id === owner.id)) {
                uniqueOwners.push({id, login, avatar_url, html_url});
            }
        });
        setOwners(uniqueOwners);
        setGitRepositories(reposWithCommits.sort(({id}, b) => b.id - id));
        setIsPerformingAnyAction(false);
    };
    const syncStorage = async () => {
        const storageRepositories = await getData('dr');
        if (storageRepositories) {
            return loadRepositories(storageRepositories);
        }
        return loadRepositories(null);
    };
    useEffect(() => {
        syncStorage().then();
        // loadRepositories().then();
    }, []);

    return (isPerformingAnyAction ? <S.Loader size="large" /> : <Dashboard repositories={gitRepositories} owners={owners} />);
};