import React from 'react';
import {Linking} from "react-native";
// import {PieChart} from 'react-native-chart-kit';
import * as S from './styled/RepositoryOverview';
import watch from '../assets/watch.png';
import star from '../assets/star.png';
import fork from '../assets/fork.png';
import home from '../assets/home.png';
import code from '../assets/code.png';

export default ({repository}) => {
    const {name, description, forks_count, homepage, language, stargazers_count, watchers_count} = repository;
    const handleHomepagePress = () => Linking.openURL(homepage);
    return (
        <S.Container>
            <S.Title>{name}</S.Title>
            <S.Description>{description}</S.Description>
            <S.QuickNumbersContainer>
                <S.Number>
                    <S.Icon source={fork}/>
                    <S.Value>{forks_count}</S.Value>
                </S.Number>
                <S.Number>
                    <S.Icon source={star}/>
                    <S.Value>{stargazers_count}</S.Value>
                </S.Number>
                <S.Number>
                    <S.Icon source={watch}/>
                    <S.Value>{watchers_count}</S.Value>
                </S.Number>
            </S.QuickNumbersContainer>
            <S.RowContainer>
                <S.Homepage onPress={handleHomepagePress}>
                    <S.RowContainer>
                        <S.Language>{language}</S.Language>
                        <S.Icon source={code} />
                    </S.RowContainer>
                    <S.Icon source={home} />
                </S.Homepage>
            </S.RowContainer>
        </S.Container>
    );
};