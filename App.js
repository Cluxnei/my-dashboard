import React, {useState, useEffect} from 'react';
import {repositories, commits} from "./api";
import {initialUsers} from "./api";
import Dashboard from './screens/Dashboard';
import * as S from './components/styled/App';
import {getData, storeData} from "./storage";
import {Alert} from 'react-native';

export default () => {
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(true);
    const [gitRepositories, setGitRepositories] = useState([]);
    const [owners, setOwners] = useState([]);
    const [users, setUsers] = useState(initialUsers);
    const loadRepositories = async (previousRepositories) => {
        let repos = [];
        let reposWithCommits = [];
        if (previousRepositories) {
            console.log('nao fez fetch');
            reposWithCommits = previousRepositories;
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
        }
        await storeData('dr', JSON.stringify(reposWithCommits));
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
    const refresh = async (newUser = '') => {
        if (newUser && !owners.includes(newUser)) {
            const newUserRepositories = await (await fetch(repositories.replace('USER', newUser))).json();
            // TODO pegar os commits e o resto das coisas
            return loadRepositories([...gitRepositories, ...newUserRepositories]);
        }
        return loadRepositories(false);
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
    }, []);

    return (isPerformingAnyAction ? <S.Loader size="large" /> : <Dashboard setUsers={setUsers} users={users} refresh={refresh} repositories={gitRepositories} owners={owners} />);
};