import React from "react";
import { Layout } from "antd";
import dayjs from "dayjs";


const { Footer } = Layout;


export default function () {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Solkos Web Console ©{dayjs().get('year')} Created by Imbera
        </Footer>
    );
}
