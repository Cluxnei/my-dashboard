import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const TitleContainer = styled.View`
  background-color: #1f232a;
  margin-top: 30px;
  border-top-color: red;
  border-top-width: 1px;
`;
export const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 15px 0;
`;
export const Description = styled.Text`
  color: #fff;
  font-size: 26px;
  padding-left: 7px;
`;
export const QuickNumbersContainer = styled.View`
  flex-direction: row;
  width: 100%;
  background-color: #272c35;
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
  tint-color: #fff;
`;
export const Value = styled.Text`
  font-size: 20px;
  margin: 0 10px;
  color: #fff;
  ${({bold}) => bold ? 'font-weight: bold;' : ''}
`;
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const Language = styled.Text`
  color: #fff;
  margin-right: 5px;
`;
export const Homepage = styled.TouchableOpacity`
  background-color: #1f232a;
  flex-direction: row;
  width: 100%;
  padding: 0 10px 5px 0;
  justify-content: space-around;
`;
export const LanguagesContainer = styled.View`

`;
export const Login = styled.ActivityIndicator`
`;
export const DatesContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const Date = styled.View`
  flex-direction: row;
`;
export const LastCommitsContainer = styled.View`
  align-items: flex-start;
  padding: 20px 0;
`;
export const Commit = styled.View`
  background-color: rgba(35, 0, 255, 0.3);
  width: 100%;
  border-bottom-width: 0.2px;
  border-bottom-color: #f1f;
`;
export const Message = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
  padding: 10px 0;
`;
export const CommitTitle = styled(Value)`
  font-weight: bold;
  padding: 15px 0;
`;