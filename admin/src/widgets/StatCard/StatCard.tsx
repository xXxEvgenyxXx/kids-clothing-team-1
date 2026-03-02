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
            <p className={s.icon}><Icon /></p>
            <p>{props.count}</p>
            <p>{props.title}</p>
        </div>
    );
};