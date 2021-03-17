import React from 'react';

import {
    Container,
    TitleContainer,
    Controllers
} from './styles'

const ContentHeader: React.FC = () => {
    return(
        <Container>
            <TitleContainer>
                <h2>DashBoasr</h2>
            </TitleContainer>
            <Controllers>
                <button type="button">Button A</button>
                <button type="button">Button B</button>

            </Controllers>
        </Container>
    )
}

export default ContentHeader