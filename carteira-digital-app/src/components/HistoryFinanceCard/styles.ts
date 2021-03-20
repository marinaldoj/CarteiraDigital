import styled from 'styled-components'

interface ITagProps{
    color: string;
}

export const Container = styled.li`
    background-color: ${ props => props.theme.colors.tertiary};
    list-style: none;
    border-radius: 6px;
    margin: 10px 0px;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    
    position: relative;

    :hover{
        opacity: 0.7;
        transform: translateX(10px);
    }

    > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }
`;

export const Tag = styled.div<ITagProps>`
    position:absolute;
    width: 8px;
    height: 70%;
    background-color: ${ props => props.color};
    left: 8px;

    border-radius: 20px;
    
`;
