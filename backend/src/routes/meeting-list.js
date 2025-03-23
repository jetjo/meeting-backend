const items = [
    {
        id: 1,
        name: '茶话会',
        deviceInfo: { name: '投影仪/画布/麦克风/饮水机' },
        image: '',
        location: {
            buildName: '逸夫楼',
            floorName: '5层',
            parkName: '昌平园区',
        },
        personNum: 13,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '13:30', end: '17:57' },
            { start: '17:58', end: '23:55' },
        ],
    },
    {
        id: 222,
        name: '918会议室',
        deviceInfo: { name: '投影仪' },
        image: '',
        location: {
            buildName: '空天B座',
            floorName: '9层',
            parkName: '新学术院区',
        },
        personNum: 23,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '11:30', end: '12:57' },
            { start: '14:58', end: '15:55' },
        ],
    },
    {
        id: 3,
        name: '茶话会',
        deviceInfo: { name: '投影仪/画布/麦克风/饮水机' },
        image: '',
        location: {
            buildName: '逸夫楼',
            floorName: '5层',
            parkName: '昌平园区',
        },
        personNum: 13,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            {
                start: '09:31',
                end: '09:59',
            },
            { start: '13:30', end: '17:57' },
            { start: '17:58', end: '23:55' },
        ],
    },
    {
        id: 4,
        name: '918会议室',
        deviceInfo: { name: '投影仪' },
        image: '',
        location: {
            buildName: '空天B座',
            floorName: '9层',
            parkName: '新学术院区',
        },
        personNum: 23,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '11:30', end: '12:57' },
            { start: '14:58', end: '15:55' },
        ],
    },
    {
        id: 5,
        name: '茶话会',
        deviceInfo: { name: '投影仪/画布/麦克风/饮水机' },
        image: '',
        location: {
            buildName: '逸夫楼',
            floorName: '5层',
            parkName: '昌平园区',
        },
        personNum: 13,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '13:30', end: '17:57' },
            { start: '17:58', end: '23:55' },
        ],
    },
    {
        id: 6,
        name: '918会议室',
        deviceInfo: { name: '投影仪' },
        image: '',
        location: {
            buildName: '空天B座',
            floorName: '9层',
            parkName: '新学术院区',
        },
        personNum: 23,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '11:30', end: '12:57' },
            { start: '14:58', end: '15:55' },
        ],
    },
    {
        id: 7,
        name: '茶话会',
        deviceInfo: { name: '投影仪/画布/麦克风/饮水机' },
        image: '',
        location: {
            buildName: '逸夫楼',
            floorName: '5层',
            parkName: '昌平园区',
        },
        personNum: 13,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '13:30', end: '17:57' },
            { start: '17:58', end: '23:55' },
        ],
    },
    {
        id: 8,
        name: '918会议室',
        deviceInfo: { name: '投影仪' },
        image: '',
        location: {
            buildName: '空天B座',
            floorName: '9层',
            parkName: '新学术院区',
        },
        personNum: 23,
        rangeList: [
            { start: '07:31', end: '08:09' },
            { start: '08:31', end: '09:09' },
            { start: '09:15', end: '09:30' },
            { start: '09:31', end: '09:59' },
            { start: '11:30', end: '12:57' },
            { start: '14:58', end: '15:55' },
        ],
    },
];

const db = require('../persistence');

module.exports = async (req, res) => {
    // const items = await db.getItems();
    res.send(items);
};
