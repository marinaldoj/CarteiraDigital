import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content, Filters } from './styles';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months'

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
    const [frequencySelected, setFrequecySelected] = useState(['recorrente', 'eventual']);

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

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index,
                label: month
            }
        })
    },[]);


    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })

    },[listData]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencySelected.findIndex(item => item === frequency)

        if(alreadySelected >= 0){
            const filtered = frequencySelected.filter(item => item !== frequency)
            setFrequecySelected(filtered);
        }else{
            setFrequecySelected((prev) => [...prev, frequency]);
        }


    }

    useEffect(() => {
        const filteredDate = listData.filter( item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelected && year === yearSelected && frequencySelected.includes(item.frequency);

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
    },[type, listData, monthSelected, yearSelected, frequencySelected]);

    return(
        <Container>
            <ContentHeader title={title.title} lineColor={title.lineColor}>
                <SelectInput options={months} onChange={(event) => setMonthSelected(event.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(event) => setYearSelected(event.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequencySelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}   
                >Recorrentes</button>
                <button 
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequencySelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')} 
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