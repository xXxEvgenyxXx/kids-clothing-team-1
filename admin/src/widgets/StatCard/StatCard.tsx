import s from './StatCard.module.scss';
import React from 'react';

interface StatCardProps {
    icon: React.ComponentType<{}>;
    count: number;
    title: string;
}

export const StatCard = (props: StatCardProps) => {
    const Icon = props.icon; 
    return (
        <div className={s.statCard}>
            <Icon />
            <p>{props.count}</p>
            <p>{props.title}</p>
        </div>
    );
};