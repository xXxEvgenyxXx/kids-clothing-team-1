import s from './admin.module.scss'
import { StatCard } from '@/widgets/StatCard';
import { stats } from '@/constants';

const AdminPage = () => {
    
    return (
        <div className={s.adminPageWrapper}>
            <aside>

            </aside>
            <div>
                <h1>Общая статистика</h1>
                <div>
                    {stats.map((stat) => (
                        <StatCard 
                            icon={stat.icon}
                            title={stat.name}
                            count={100}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;