import React from 'react';
import * as S from '../components/styled/Dashboard';
import RepositoryOverView from "../components/RepositoryOverView";

export default ({repositories}) => {
    return (
        <S.Container>
            <S.RepositoryContainer>
                {repositories.map(repository =>
                    (<RepositoryOverView key={repository.id} repository={repository}/>)
                )}
            </S.RepositoryContainer>
        </S.Container>
    );
};