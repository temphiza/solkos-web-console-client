import React from "react";
import {Modal} from "antd";

export default function ({visible, onClose}){
    const [nextVisible, setNextVisible] = React.useState(visible);

    React.useEffect(() => setNextVisible(visible),[visible]);

    function handleClose(){
        setNextVisible(false);

        if (onClose) {
            onClose();
        }
    }

    return (
        <Modal
            title={'Tableros'}
            visible={nextVisible}
            cancelText={'Cancelar'}
            okText={'Abrir'}
            onOk={handleClose}
            onCancel={handleClose}>

        </Modal>
    );
}
