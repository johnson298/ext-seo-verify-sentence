const sentences = [
    [{"word": "1", "position": 442, "label": "TYPE_UNKNOWN"}, {"word": "vị", "position": 777, "label": "COMMON"}, {"word": "bơ", "position": 636, "label": "COMMON"}, {"word": "cấu trúc", "position": 682, "label": "COMMON"}, {"word": "cổ", "position": 806, "label": "COMMON"}, {"word": "foie gras", "position": 543, "label": "COMMON"}, {"word": "gan", "position": 718, "label": "COMMON"}, {"word": "kim cương", "position": 567, "label": "COMMON"}, {"word": "kỹ thuật chế biến", "position": 845, "label": "COMMON"}, {"word": "lớp", "position": 632, "label": "COMMON"}, {"word": "lợi ích", "position": 745, "label": "COMMON"}, {"word": "miệng", "position": 666, "label": "COMMON"}, {"word": "món", "position": 614, "label": "COMMON"}, {"word": "nghệ thuật", "position": 586, "label": "COMMON"}, {"word": "ngỗng vỗ béo", "position": 529, "label": "COMMON"}, {"word": "niềm tự hào", "position": 493, "label": "COMMON"}, {"word": "nâu", "position": 577, "label": "COMMON"}, {"word": "nền ẩm thực", "position": 509, "label": "COMMON"}, {"word": "sức khoẻ", "position": 768, "label": "COMMON"}, {"word": "vỗ béo", "position": 477, "label": "COMMON"}, {"word": "ẩm thực", "position": 455, "label": "COMMON"}],
    [{"word": "người ta", "position": 916, "label": "COMMON"}, {"word": "vị", "position": 777, "label": "COMMON"}, {"word": "chảo", "position": 935, "label": "COMMON"}, {"word": "cổ", "position": 806, "label": "COMMON"}, {"word": "gan", "position": 940, "label": "COMMON"}, {"word": "hương vị", "position": 907, "label": "COMMON"}, {"word": "kỹ thuật chế biến", "position": 845, "label": "COMMON"}, {"word": "món", "position": 891, "label": "COMMON"}, {"word": "ngỗng", "position": 944, "label": "COMMON"}, {"word": "ăn", "position": 895, "label": "COMMON"}],
    [{"word": "kinh nghiệm", "position": 3384, "label": "COMMON"}, {"word": "chất lượng", "position": 3342, "label": "COMMON"}, {"word": "thịt gà", "position": 3268, "label": "COMMON"}, {"word": "thịt heo", "position": 3314, "label": "COMMON"}, {"word": "vịt tươi", "position": 3277, "label": "COMMON"}],
    [{"word": "kinh nghiệm", "position": 3384, "label": "COMMON"}, {"word": "thực phẩm", "position": 3482, "label": "COMMON"}, {"word": "khoáng chất", "position": 3469, "label": "COMMON"}, {"word": "loại", "position": 3455, "label": "COMMON"}, {"word": "ngỗng", "position": 3417, "label": "COMMON"}, {"word": "vitamin", "position": 3460, "label": "COMMON"}],
    [{"word": "thực phẩm", "position": 3482, "label": "COMMON"}, {"word": "cách chế biến", "position": 3536, "label": "COMMON"}, {"word": "nghiên cứu", "position": 3579, "label": "COMMON"}]
]

const contents = [
    "1 vị bơ cấu trúc cổ foie gras gan kim cương kỹ thuật chế biến lớp lợi ích miệng món nghệ thuật ngỗng vỗ béo niềm tự hào nâu nền ẩm thực sức khoẻ vỗ béo ẩm thựcvì sao, người ta vị chảo cổ gan hương vị kỹ thuật chế biến món ngỗng ănkinh nghiệm chất lượng thịt gà thịt heo vịt tươikinh nghiệm thực phẩm khoáng chất loại ngỗng vitaminthực phẩm cách chế biến nghiên cứu",
    'người ta vị chảo cổ gan hương vị kỹ thuật chế biến món ngỗng ăn',
]

const isMatch = (sentence) => sentence.every(item => item?.count > 1)

// sentences.forEach((sentence, index) => {
//     sentence.forEach(item => {
//         item.count = item.count || 0
//         const {word} = item
//         contents.forEach((content, contentIndex) => {
//             const matches = content.match(new RegExp(word, 'g'));
//             item.count += matches ? matches.length : 0
//         })
//     })
// })

// contents.forEach(content => {
//     sentences.forEach(sentence => {
//         sentence.forEach(item => {
//             const {word} = item
//             item.count = item.count || 0
//             const matches = content.match(new RegExp(word, 'g'));
//             item.count += matches ? matches.length : 0
//         })
//     })
// })

// function getMatchedSentences(_sentences, _contents) {
//     const sentencesClone = JSON.parse(JSON.stringify(_sentences))
//     _contents.forEach(content => {
//         sentencesClone.forEach(sentence => {
//             sentence.forEach(item => {
//                 const {word} = item
//                 item.count = item.count || 0
//                 const matches = content.match(new RegExp(word, 'g'));
//                 item.count += matches ? matches.length : 0
//             })
//         })
//     })
//     return sentencesClone
// }

// console.log(getMatchedSentences(sentences, contents))