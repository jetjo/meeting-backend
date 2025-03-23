const items = [
    { id: 1, _terms: '性能', name: '性能楼' },
    { id: 2, _terms: '飞船', name: '飞船楼' },
    { id: 3, _terms: '分析', name: '分析楼' },
    { id: 4, _terms: '网络化', name: '网络化楼' },
    { id: 5, _terms: '支持', name: '支持楼' },
    { id: 6, _terms: '培训', name: '培训楼' },
    { id: 7, _terms: '控制', name: '控制楼' },
    { id: 8, _terms: '探测', name: '探测楼' },
    { id: 9, _terms: '姿态', name: '姿态楼' },
    { id: 10, _terms: '制造', name: '制造楼' },
];

const db = require('../persistence');

module.exports = async (req, res) => {
    // const items = await db.getItems();
    res.send(items);
};
