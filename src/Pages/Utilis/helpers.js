/**
 * Created by temphiza on 10/12/16.
 */
import dayjs from 'dayjs';
import numeral from 'numeral';
import React from 'react';
import { Avatar } from 'antd';



export default {
    attachment(value) {
        return <Avatar src={value} size={36}/>
    },
    getRawValue(value) {
        return (value)? value: '';
    },
    strong(value) {
        return <strong >{value}</strong>;
    },
    capitalize(value) {
        return this.getRawValue(value).capitalize();
    },
    currentYear() {
        return dayjs().format('YYYY');
    },
    percentage(value) {
        return numeral(value).format('0.00%');
    },
    percentageInt(value) {
        return numeral(value).format('0%');
    },
    formattedLocaleDate(value, { format }) {
        return dayjs(new Date(value)).format(format);
    },
    formattedDate(value, { format }) {
        return dayjs(new Date(value)).format(format);
    },
    formattedLLDate(value) {
        return dayjs(new Date(value)).format('LL');
    },
    booleanWord(value) {
        return (value === true)? 'Sí': 'No';
    },
    currency(value) {
        return numeral(value).format('$0,0');
    },
    currencyMillions(value) {
        return numeral(value).format('($0 a)');
    },
    mailTo(value) {
        return (<a href={`mailto:${value}`} style={ { textDecoration: 'none', color: '#757575' } }>{value}</a>);
    },
    linkTo(value, { href }) {
        return <a href={href}>{value}</a>;
    },
    linkButton(value, { href=undefined, onClick=undefined }) {
        let props = {};

        if (!!href) {
            props = {...props, href}
        }

        if (onClick instanceof Function) {
            props = {...props, onClick}
        }

        return <a {...props}>{value}</a>;
    },
    avatar(value) {
        return (<Avatar src={value} />);
    },
    toWords(value) {
        let result = '';

        if (value.length > 0) {
            result = this.getRawValue(value).capitalize().match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
        }

        return result;
    },
    userInfo(user) {
        return (
            user.firstName
        );
    },
    contactName(contact) {
        return `${contact.firstName} ${contact.lastName}`;
    },
    userName(user) {
        return `${user.firstName} ${user.lastName}`;
    },
    bankName(bank) {
        return `${bank.shortName} (${bank.id})`
    },
    getBase64(fileList) {
        return fileList.length === 1 &&
            new Promise(resolve => {
                const reader = new FileReader();
                reader.addEventListener('load', () => resolve(reader.result));
                reader.readAsDataURL(fileList[0].originFileObj);
            });
    },
    numeral_0_0(v) {
        return numeral(v).format('0,0');
    },
    mathFloor(v) {
        return Math.floor(v);
    },
    mathCeil(v) {
        return Math.ceil(v);
    },
    mathRound(v) {
        return Math.round(v);
    },
    suffix_days(v) {
        return `${v} días`
    }
}
