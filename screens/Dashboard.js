import React, {useState, useCallback, useEffect} from 'react';
import * as S from '../components/styled/Dashboard';
import RepositoryOverView from "../components/RepositoryOverView";
import {Linking, RefreshControl, Alert} from "react-native";
import add from '../assets/plus.png';
import Prompt from 'react-native-input-prompt';

export default ({repositories, owners, refresh}) => {
    const [promptVisible, setPromptVisible] = useState(false);
    const [user, setUser] = useState('');
    const handleOwnerPress = (url) => Linking.openURL(url);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh().then(() => {
            setRefreshing(false);
        });
    }, [refreshing]);
    const handleAddOwnerPress = () => {
        setPromptVisible(true);
    };
    const handleSubmitUserPress = () => {
        refresh().then(() => {
            setRefreshing(false);
        });
    };
    return (
        <S.Container>
            <S.UserInput visible={promptVisible} onChangeText={(text) => setUser(text)} onSubmitEditing={handleSubmitUserPress}/>
            <S.OwnersContainer>
                <S.Scroll horizontal>
                    {owners.map(({id, login, avatar_url, html_url}) => (
                        <S.Owner onPress={() => handleOwnerPress(html_url)} key={id}>
                            <S.ProfilePhoto source={{uri: avatar_url}}/>
                            <S.Login>{login}</S.Login>
                        </S.Owner>
                    ))}
                    <S.Owner onPress={handleAddOwnerPress}>
                        <S.ProfilePhoto source={add} icon/>
                        <S.Login>adicionar</S.Login>
                    </S.Owner>
                </S.Scroll>
            </S.OwnersContainer>
            <S.RepositoryContainer
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                    tintColor="#fff" colors={['#fff']} title="loading"
                                    titleColor="#fff"/>
                }
            >
                {repositories.map(repository =>
                    (<RepositoryOverView key={repository.id} repository={repository}/>)
                )}
            </S.RepositoryContainer>
        </S.Container>
    );
};