import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: black;
  padding-top: 35px;
`;
export const UserInput = styled.TextInput`
  opacity: ${({visible}) => visible ? '1' : '0'};
`;
export const RepositoryContainer = styled.ScrollView`
  flex: 1;
  color: #fff;
`;
export const OwnersContainer = styled.View`
  flex-direction: row;
`;
export const Scroll = styled.ScrollView`
  flex-direction: row;
`;
export const Owner = styled.TouchableOpacity`
  align-items: center;
  padding: 0 10px;
`;
export const ProfilePhoto = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 300px;
  resize-mode: contain;
  ${({icon}) => icon ? 'tint-color: #fff;' : ''}
`;
export const Login = styled.Text`
  color: #fff;
  margin-top: 5px;
`;