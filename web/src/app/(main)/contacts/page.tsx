import s from './contacts.module.scss'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import clsx from 'clsx';

const ContactsPage = () => {
    
    return (
        <div className={s.contactsPageWrapper}>
            <div className={clsx(s.contactsInfo, s.contactsBlock)}>
                <div className={s.contactsInfoSection}>
                    <div className={s.contactsInfoSectionTitle}>
                        <div className={s.contactsInfoSectionIcon}>
                            <PhoneOutlined />
                        </div>
                        <h2 className={s.contactsInfoSectionHeader}>Звоните нам</h2>
                    </div>
                    <p>Мы доступны 24/7. Ждём вашего звонка!</p>
                    <p>Телефон: +7 965 111 11-11</p>
                </div>
                <div className={s.contactsInfoSection}>
                    <div className={s.contactsInfoSectionTitle}>
                        <div className={s.contactsInfoSectionIcon}>
                            <MailOutlined />
                        </div>
                        <h2 className={s.contactsInfoSectionHeader}>Напишите нам</h2>
                    </div>
                    <p>eksklyuziv@gmail.com</p>
                </div>
            </div>
            <form className={clsx(s.contactsMessage, s.contactsBlock)}>

            </form>
        </div>
    );
};

export default ContactsPage;