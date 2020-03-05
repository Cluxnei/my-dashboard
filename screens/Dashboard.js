import React from 'react';
import * as S from '../components/styled/Dashboard';
import RepositoryOverView from "../components/RepositoryOverView";
import {Linking} from "react-native";

export default ({repositories, owners}) => {
    const handleOwnerPress = (url) => Linking.openURL(url);
    return (
        <S.Container>
            <S.OwnersContainer>
                {owners.map(({id, login, avatar_url, html_url}) => (
                    <S.Owner onPress={() => handleOwnerPress(html_url)} key={id}>
                        <S.ProfilePhoto source={{uri: avatar_url}} />
                        <S.Login>{login}</S.Login>
                    </S.Owner>
                ))}
            </S.OwnersContainer>
            <S.RepositoryContainer>
                {repositories.map(repository =>
                    (<RepositoryOverView key={repository.id} repository={repository}/>)
                )}
            </S.RepositoryContainer>
        </S.Container>
    );
};