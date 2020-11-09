const CARTESIAN = 'cartesian';
const VARIABLE = 'variable';
export const STATISTIC = 'statistic';
export const PIE = 'pie';
export const LINES = 'lines';
export const BARS = 'bars';
export const LIVE_TRACKING_MAP = 'liveTrackingMap';

export const CHART_TYPE = {
    [STATISTIC]: VARIABLE,
    [PIE]: PIE,
    [LINES]: CARTESIAN,
    [BARS]: CARTESIAN,
    [LIVE_TRACKING_MAP]: LIVE_TRACKING_MAP
};
