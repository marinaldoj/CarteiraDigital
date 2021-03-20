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
                <MenuItemLink to='/dashboard'>
                    <MdDashboard/>
                    Dashboard
                </MenuItemLink>
                <MenuItemLink to='/list/entry-balance'>
                    <FaArrowUp/>
                    Entradas
                </MenuItemLink>
                <MenuItemLink to='/list/exit-balance'>
                    <FaArrowDown/>
                    Saídas
                </MenuItemLink>
                <MenuItemLink to='#'>
                    <FaSignOutAlt/>
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}

export default Aside;