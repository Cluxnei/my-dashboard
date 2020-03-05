import React, {useState, useCallback} from 'react';
import * as S from '../components/styled/Dashboard';
import RepositoryOverView from "../components/RepositoryOverView";
import {Linking, RefreshControl} from "react-native";

export default ({repositories, owners}) => {
    const handleOwnerPress = (url) => Linking.openURL(url);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, [refreshing]);

    return (
        <S.Container>
            <S.OwnersContainer>
                {owners.map(({id, login, avatar_url, html_url}) => (
                    <S.Owner onPress={() => handleOwnerPress(html_url)} key={id}>
                        <S.ProfilePhoto source={{uri: avatar_url}}/>
                        <S.Login>{login}</S.Login>
                    </S.Owner>
                ))}
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