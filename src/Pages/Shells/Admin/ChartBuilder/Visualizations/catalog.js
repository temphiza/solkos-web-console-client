export default {
    statistic: {
        label: 'Estadística',
        fields: {
            variable: {
                label: 'Variable',
                type: 'NUMERIC'
            }
        }
    },
    lines: {
        label: 'Líneas',
        fields: {
            axis: {
                label: 'Eje X',
                type: 'NUMERIC',
            },
            values: {
                label: 'Eje Y',
                type: 'ARRAY'
            },
            legend: {
                label: 'Leyenda',
                type: 'STRING'
            }
        }
    },
    bars: {
        label: 'Barras',
        fields: {
            axis: {
                label: 'Eje X',
                type: 'NUMERIC',
            },
            values: {
                label: 'Eje Y',
                type: 'ARRAY'
            },
            legend: {
                label: 'Leyenda',
                type: 'STRING'
            }
        }
    },
    pie: {
        label: 'Pie',
        fields: {
            details: {
                label: 'Detalle',
                type: 'STRING'
            },
            value: {
                label: 'Valor',
                type: 'NUMERIC'
            }
        }
    },
}
