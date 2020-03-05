import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const Title = styled.Text`

`;
export const Description = styled.Text`

`;
export const QuickNumbersContainer = styled.View`
  flex-direction: row;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 0;
`;
export const Number = styled.TouchableOpacity`
  flex-direction: row;
`;
export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;
export const Value = styled.Text`
  font-size: 20px;
  margin: 0 10px;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const Language = styled.Text`
  color: black;
  margin-right: 5px;
`;
export const Homepage = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  width: 100%;
  padding: 0 10px 5px 0;
  justify-content: space-around;
`;