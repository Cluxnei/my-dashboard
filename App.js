import React, {useState, useEffect} from 'react';
import {PieChart} from 'react-native-svg-charts';
import {ActivityIndicator, Dimensions, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {repositories} from "./api";

export default () => {
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(true);
    const [repos, setRepos] = useState([]);
    const [totalBytes, setTotalBytes] = useState(0);
    useEffect(() => {
        fetch(repositories).then(r => r.json()).then(repos => {
            setRepos(repos);
            setIsPerformingAnyAction(false);
            console.log(repos);
        });
    }, []);
    const [selectedSlice, setSelectedSlice] = useState({label: '', value: 0});
    const [labelWidth, setLabelWidth] = useState(0);
    const {label, value} = selectedSlice;
    const [keys, setKeys] = useState(['teste']);
    const [values, setValues] = useState([15]);
    const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];
    const data = keys.map((key, index) => ({
        key,
        value: totalBytes === 0 ? 0 : ((values[index] * 100) / totalBytes),
        svg: {fill: colors[index]},
        arc: {outerRadius: (10 + (totalBytes === 0 ? 0 : ((values[index] * 100) / totalBytes))) + '%', padAngle: label === key ? 0.1 : 0},
        onPress: () => setSelectedSlice({label: key, value: totalBytes === 0 ? 0 : parseFloat(((values[index] * 100) / totalBytes).toFixed(2))})
    }));
    const deviceWidth = Dimensions.get('window').width;
    const handleRepositoryPress = (languages_url) => {
        setIsPerformingAnyAction(true);
        setSelectedSlice({label: '', value: 0});
        fetch(languages_url).then(r => r.json()).then(languages => {
            const bytes = Object.values(languages);
            console.log(bytes);
            setKeys(Object.keys(languages));
            setValues(bytes);
            setTotalBytes(bytes.reduce((acc, bytes) => acc + bytes, 0));
            setIsPerformingAnyAction(false);
        });
    };
    return isPerformingAnyAction ? <ActivityIndicator size="large" style={{flex: 1}}/> : (
        <View style={{justifyContent: 'center', flex: 1}}>
            <ScrollView style={{marginTop: 50}}>
                {repos.map(({id, name, languages_url}) => (
                    <TouchableOpacity style={{margin: 10}} key={id} onPress={() => handleRepositoryPress(languages_url)}>
                        <Text>{name}</Text>
                    </TouchableOpacity>
                ))}
                <View style={{justifyContent: 'center', flex: 1}}>
                    <PieChart
                        style={{height: 400}}
                        outerRadius={'80%'}
                        innerRadius={'45%'}
                        data={data}
                    />
                    <Text
                        onLayout={({nativeEvent: {layout: {width}}}) => {
                            setLabelWidth(width);
                        }}
                        style={{
                            position: 'absolute',
                            left: deviceWidth / 2 - labelWidth / 2,
                            textAlign: 'center'
                        }}>
                        {`${label} \n ${value}`}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
};