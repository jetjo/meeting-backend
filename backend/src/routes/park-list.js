const items = [
    { id: 1, county: '秀英区', name: '秀英园区' },
    { id: 2, county: '云霄县', name: '云霄园区' },
    { id: 3, county: '浦北县', name: '浦北园区' },
    { id: 4, county: '林芝县', name: '林芝园区' },
    { id: 5, county: '卢氏县', name: '卢氏园区' },
    { id: 6, county: '皮山县', name: '皮山园区' },
    { id: 7, county: '麟洛乡', name: '麟洛园区' },
    { id: 8, county: '清河区', name: '清河园区' },
    { id: 9, county: '安国市', name: '安国园区' },
    { id: 10, county: '灵石县', name: '灵石园区' },
];

const db = require('../persistence');

module.exports = async (req, res) => {
    // const items = await db.getItems();
    res.send(items);
};
