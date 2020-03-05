import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: black;
  padding-top: 35px;
`;
export const RepositoryContainer = styled.ScrollView`
  flex: 1;
  color: #fff;
`;
export const OwnersContainer = styled.View`
  flex-direction: row;
`;
export const Owner = styled.TouchableOpacity`
  align-items: center;
  padding: 0 10px;
`;
export const ProfilePhoto = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  resize-mode: contain;
`;
export const Login = styled.Text`
  color: #fff;
  margin-top: 5px;
`;