import React, {useEffect, useState} from 'react';
import {Linking, Dimensions} from "react-native";
import {PieChart} from 'react-native-chart-kit';
import * as S from './styled/RepositoryOverview';
import watch from '../assets/watch.png';
import star from '../assets/star.png';
import fork from '../assets/fork.png';
import home from '../assets/home.png';
import code from '../assets/code.png';
import pushed from '../assets/push.png';
import updated from '../assets/update.png';
import created from '../assets/create.png';
import {getRandomColor} from "../constrants/Colors";

export default ({repository}) => {
    const {
        name, description, forks_count, homepage, language,
        stargazers_count, watchers_count, created_at,
        updated_at, pushed_at, lastFourCommits, repositoryLanguages
    } = repository;
    const handleHomepagePress = () => homepage ? Linking.openURL(homepage) : false;
    const screenWidth = Dimensions.get('screen').width;
    const chartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };
    const [pieData, setPieData] = useState(undefined);
    const [lastCommits, setLastCommits] = useState(undefined);
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(true);
    const loadLanguages = async () => {
        const languages = Object.keys(repositoryLanguages);
        const bytes = Object.values(repositoryLanguages);
        const totalBytes = bytes.reduce((acc, byte) => acc + byte, 0);
        const languagesPercent = bytes.map(byte => byte * 100 / totalBytes);
        setPieData(languages.map((language, index) => ({
            name: language,
            population: parseFloat(languagesPercent[index].toFixed(2)),
            color: getRandomColor(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        })));
        setLastCommits(lastFourCommits);
        setIsPerformingAnyAction(false);
    };
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleString().replace('/' + d.getFullYear(), '')
            .replace(':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()), '');
    };
    useEffect(() => {
        loadLanguages().then();
    }, []);
    return (
        <S.Container>
            <S.TitleContainer>
                <S.Title>{name.split('-').reduce((s, w) => s + ' ' +  w.charAt(0).toUpperCase() + w.slice(1), '')}</S.Title>
                <S.Description>{description}</S.Description>
            </S.TitleContainer>
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
            <S.LanguagesContainer>
                {isPerformingAnyAction ? (<S.Login />) : (
                    <PieChart
                        data={pieData}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                )}
            </S.LanguagesContainer>
            <S.DatesContainer>
                <S.Date>
                    <S.Icon source={pushed}/>
                    <S.Value>{formatDate(pushed_at)}</S.Value>
                </S.Date>
                <S.Date>
                    <S.Icon source={updated}/>
                    <S.Value>{formatDate(updated_at)}</S.Value>
                </S.Date>
                <S.Date>
                    <S.Icon source={created}/>
                    <S.Value>{formatDate(created_at).split(' ')[0]}</S.Value>
                </S.Date>
            </S.DatesContainer>
            <S.LastCommitsContainer>
                <S.Commit>
                    <S.CommitTitle>Last 4 commits messages</S.CommitTitle>
                </S.Commit>
                {isPerformingAnyAction ? <S.Login/> : lastCommits.map(commit => (
                    <S.Commit key={commit.sha}>
                        <S.Message>{commit.commit.message}</S.Message>
                    </S.Commit>
                ))}
            </S.LastCommitsContainer>
        </S.Container>
    );
};