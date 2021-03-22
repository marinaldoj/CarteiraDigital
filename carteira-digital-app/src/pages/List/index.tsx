import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content, Filters } from './styles';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

interface IRouteParams{
    match: {
        params:{
            type: string;
        }
    }
}

interface IData {
    id: number;
    description: string;
    amountFormatted: string;
    frequency: string;
    dataFomatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) =>{
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

    const { type } = match.params
    const title = useMemo(() => {
       return type === 'entry-balance' ? {
           title:"Entradas",
           lineColor: '#F7931B'
        } : {
            title:"Saídas",
            lineColor: '#E44C4E'
         }
    },[type]);

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    },[type]);

    const months = [
        {value: 1 , label: 'Janeiro' },
        {value: 2 , label: 'Fevereiro' },
        {value: 3 , label: 'Março' },
        {value: 4 , label: 'Abril' },
        {value: 5 , label: 'Maio' },
        {value: 6 , label: 'Junho' },
        {value: 7 , label: 'Julho' },
        {value: 8 , label: 'Agosto' },
        {value: 9 , label: 'Setembro' },
        {value: 10 , label: 'Outrubro'},
        {value: 11 , label: 'Novembro'},
        {value: 12 , label: 'Dezembro'},
    ];

    const years = [
        {value: 2021 , label: 2021 },
        {value: 2020 , label: 2020 },
        {value: 2019 , label: 2019 },
        {value: 2018 , label: 2018 },
        {value: 2017 , label: 2017 },
    ];

    useEffect(() => {
        const filteredDate = listData.filter( item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected

        });

        const response = filteredDate.map((item , index:number) => {
            return {
                id: index,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFomatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E' 
            }
        })
        setData(response);
    },[type, listData, monthSelected, yearSelected]);

    return(
        <Container>
            <ContentHeader title={title.title} lineColor={title.lineColor}>
                <SelectInput options={months} onChange={(event) => setMonthSelected(event.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(event) => setYearSelected(event.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type="button"
                    className="tag-filter tag-filter-recurrent"    
                >Recorrentes</button>
                <button 
                    type="button"
                    className="tag-filter tag-filter-eventual"    
                >Eventuais</button>
            </Filters>

            <Content>
                { 
                    data.map(item => {
                        return(
                            <HistoryFinanceCard 
                                key={item.id}
                                tagColor={item.tagColor}
                                title={item.description}
                                subtitle={item.dataFomatted}
                                amount={item.amountFormatted}
                            />
                        )                    
                    })
                }              
            </Content>
        </Container>
    )
}

export default List;