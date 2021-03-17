import React from 'react';
import { FaArrowDown, FaArrowUp, FaSignOutAlt} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import { 
    Container,
    Header,
    Logo,
    Title,
    MenuContainer,
    MenuItemLink
} from './styles'
import logoImg from '../../assets/logo.svg';

const Aside: React.FC = () =>{
    return(
        <Container>
            <Header>
                <Logo src={logoImg} alt="Minha Carteira"/>
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='#'>
                    <MdDashboard/>
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href='#'>
                    <FaArrowUp/>
                    Entradas
                </MenuItemLink>
                <MenuItemLink href='#'>
                    <FaArrowDown/>
                    Saídas
                </MenuItemLink>
                <MenuItemLink href='#'>
                    <FaSignOutAlt/>
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}

export default Aside;